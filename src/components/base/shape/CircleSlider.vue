<script lang="ts" setup>

import { computed, onMounted, ref, watch } from 'vue';

class CircleSliderState {
    private length: number;
    private currentStepIndex = 0;

    constructor(private steps: number[], initialValue: number, private offset: number = 0) {
        this.length = this.steps.length - 1;

        for (let index in this.steps) {
            if (this.steps[index] === initialValue) {
                this.currentStepIndex = Number.parseInt(index);
            }
        }
    }

    get angleUnit() {
        return (Math.PI * 2 - this.offset) / this.length;
    }

    get angleValue() {
        return (Math.min(
            this.offset + this.angleUnit * this.currentStepIndex,
            Math.PI * 2 - Number.EPSILON
        )) - 0.00001 // correct for 100% value
    }

    get currentStep() {
        return this.steps[this.currentStepIndex]
    }

    updateCurrentStepFromValue(value: number) {
        for (let i = 0; i < this.length; i++) {
            if (value <= this.steps[i]) {
                this.currentStepIndex = i
                return
            }
        }

        this.currentStepIndex = this.length
    }

    updateCurrentStepFromAngle(angle: number) {
        const stepIndex = Math.round((angle - this.offset) / this.angleUnit)
        this.currentStepIndex = Math.min(Math.max(stepIndex, 0), this.length)
    }
}

class TouchPosition {

    private center = 0;
    private relativeX = 0;
    private relativeY = 0;

    constructor(private svgElement: SVGElement, private sliderRadius: number, private sliderTolerance: number) {
        this.setNewPosition({ clientX: 0, clientY: 0 })
    }

    setNewPosition(e: { clientX: number, clientY: number }) {
        const dimensions = this.svgElement.getBoundingClientRect()
        const side = dimensions.width
        this.center = side / 2
        this.relativeX = e.clientX - dimensions.left
        this.relativeY = e.clientY - dimensions.top
    }

    get sliderAngle() {
        return (Math.atan2(this.relativeY - this.center, this.relativeX - this.center) + Math.PI * 3 / 2) % (Math.PI * 2)
    }

    get isTouchWithinSliderRange() {
        const touchOffset = Math.sqrt(Math.pow(Math.abs(this.relativeX - this.center), 2) + Math.pow(Math.abs(this.relativeY - this.center), 2))
        return Math.abs(touchOffset - this.sliderRadius) <= this.sliderTolerance
    }
}

//#region 变量

const props = defineProps({
    modelValue: {
        default: 0
    },

    size: {
        default: 100
    },

    angleOffset: {
        default: 0
    },

    min: {
        default: 0
    },
    max: {
        default: 100
    },
    step: {
        default: 1
    },

    mainColor: {
        default: "#334860"
    },
    progressColor: {
        default: "#00be7e"
    },
    knobColor: {
        default: "#00be7e"
    },

    mainStrokeWidth: {
        type: Number,
        require: false,
        default: null
    },
    mainStrokeWidthRel: {
        default: 20
    },
    progressStrokeWidth: {
        type: Number,
        required: false,
        default: null
    },
    progressStrokeWidthRel: {
        default: 10
    },
    knobRadius: {
        type: Number,
        require: false,
        default: null
    },
    knobRadiusRel: {
        default: 7
    },
});


const steps = Array.from({
    length: (props.max - props.min) / props.step + 1
}, (_, i) => props.min + i * props.step);

let mousePressed = false;
let mousemoveTicks = 0;

let touchPosition: TouchPosition;
const circleSliderState = new CircleSliderState(steps, props.modelValue, props.angleOffset);

const svg = ref<SVGElement>();
const angle = ref(circleSliderState.angleValue);

const csCenter = computed(() => props.size / 2);
const csAngle = computed(() => angle.value + Math.PI / 2);

const csMainStrokeWidth = computed(() => props.mainStrokeWidth || (props.size / 2) / props.mainStrokeWidthRel);
const csProgressStrokeWidth = computed(() => props.progressStrokeWidth || (props.size / 2) / props.progressStrokeWidthRel);
const csKnobRadius = computed(() => props.knobRadius || (props.size / 2) / props.knobRadiusRel);

const csRadius = computed(() => (props.size / 2) - Math.max(Math.max(csMainStrokeWidth.value, csProgressStrokeWidth.value), csKnobRadius.value * 2) / 2);

const csPathX = computed(() => csCenter.value + csRadius.value * Math.cos(csAngle.value));
const csPathY = computed(() => csCenter.value + csRadius.value * Math.sin(csAngle.value));
const csPathDirection = computed(() => csAngle.value < 3 / 2 * Math.PI ? 0 : 1);
const csPathD = computed(() => {
    let parts = []
    parts.push('M' + csCenter.value)
    parts.push(csCenter.value + csRadius.value)
    parts.push('A')
    parts.push(csRadius.value)
    parts.push(csRadius.value)
    parts.push(0)
    parts.push(csPathDirection.value)
    parts.push(1)
    parts.push(csPathX.value)
    parts.push(csPathY.value)
    return parts.join(' ')
})

const emits = defineEmits<{
    (event: 'update', value: number): void
    (event: 'update:modelValue', modelValue: number): void
}>();

watch(() => props.modelValue, (current) => {
    updateFromPropValue(current)
})

//#endregion

onMounted(() => {
    if (!svg.value) throw Error("svg init error!");
    touchPosition = new TouchPosition(svg.value, csRadius.value, csRadius.value / 2)
})

function handleClick(e: MouseEvent) {
    touchPosition.setNewPosition(e);
    if (touchPosition.isTouchWithinSliderRange)
        animateSlider(angle.value, touchPosition.sliderAngle);
}

function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    mousePressed = true;
    window.addEventListener('mousemove', handleWindowMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
}

function handleMouseUp(e: MouseEvent) {
    e.preventDefault()
    mousePressed = false
    window.removeEventListener('mousemove', handleWindowMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    mousemoveTicks = 0
}

function handleTouchMove(e: TouchEvent) {
    // Do nothing if two or more fingers used
    if (e.targetTouches.length > 1 || e.changedTouches.length > 1 || e.touches.length > 1) {
        return true
    }

    const lastTouch = e.targetTouches.item(e.targetTouches.length - 1)
    touchPosition.setNewPosition(lastTouch!)

    if (touchPosition.isTouchWithinSliderRange) {
        e.preventDefault()
        updateSlider()
    }
}

function handleWindowMouseMove(e: MouseEvent) {
    e.preventDefault()
    if (mousemoveTicks < 5) {
        mousemoveTicks++
        return
    }

    touchPosition.setNewPosition(e)
    updateSlider()
}

function animateSlider(startAngle: number, endAngle: number) {
    const direction = startAngle < endAngle ? 1 : -1
    const curveAngleMovementUnit = direction * circleSliderState.angleUnit * 2

    const animate = () => {
        if (Math.abs(endAngle - startAngle) < Math.abs(2 * curveAngleMovementUnit)) {
            updateAngle(endAngle)
        } else {
            const newAngle = startAngle + curveAngleMovementUnit
            updateAngle(newAngle)
            animateSlider(newAngle, endAngle)
        }
    }

    window.requestAnimationFrame(animate)
}

function updateSlider() {
    const val = touchPosition.sliderAngle
    if (Math.abs(val - angle.value) < Math.PI) {
        updateAngle(val)
    }
}

function updateAngle(val: number) {
    circleSliderState.updateCurrentStepFromAngle(val)
    angle.value = circleSliderState.angleValue

    emits('update', circleSliderState.currentStep)
    emits('update:modelValue', circleSliderState.currentStep)
}

function updateFromPropValue(val: number) {
    let stepValue = Math.round(val / props.step) * props.step;

    circleSliderState.updateCurrentStepFromValue(stepValue)
    angle.value = circleSliderState.angleValue

    emits('update', circleSliderState.currentStep)
    emits('update:modelValue', circleSliderState.currentStep)
}

</script>

<template>
    <svg
        :width="`${size}px`"
        :height="`${size}px`"
        :viewBox="`0 0 ${size} ${size}`"
        ref="svg"
        @click="handleClick"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @touchmove="handleTouchMove"
    >
        <g>
            <circle
                :stroke="mainColor"
                fill="none"
                :stroke-width="csMainStrokeWidth"
                :cx="csCenter"
                :cy="csCenter"
                :r="csRadius"
            />
            <path
                :stroke="progressColor"
                fill="none"
                :stroke-width="csProgressStrokeWidth"
                :d="csPathD"
            />
            <circle
                :fill="knobColor"
                :r="csKnobRadius"
                :cx="csPathX"
                :cy="csPathY"
                cursor="pointer"
            />
        </g>
    </svg>
</template>