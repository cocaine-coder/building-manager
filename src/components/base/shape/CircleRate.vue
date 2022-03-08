<script lang="ts" setup>
import { computed } from 'vue';


const props = defineProps({
    rate: {
        default: 50
    },
    size: {
        default: 100
    },
    sink: {
        default: 0.5
    },
    processWidth: {
        default: 7
    },
    mainColor: {
        default: "#43464B"
    },
    processColor: {
        default: "#43D1A7"
    }
});

const center = props.size / 2;
const radius = center - props.processWidth / 2;
const reHeight = (1 - props.sink / 2) * props.size;

const dertAngle = Math.acos((reHeight - center) / radius);
const startAngle = dertAngle;
const endAngle = Math.PI * 2 - dertAngle;

const processAngle = computed(() => (Math.PI - dertAngle) * 2 * props.rate / 100 + dertAngle);
const processPathD = computed(() => getD(startAngle, processAngle.value))

function getD(start: number, end: number) {
    var dert = end - start;
    const [startX, startY] = getPosition(start);
    const [endX, endY] = getPosition(end);

    let parts = []
    parts.push('M' + startX)
    parts.push(startY)
    parts.push('A')
    parts.push(radius)
    parts.push(radius)
    parts.push(0)
    parts.push(dert > Math.PI ? 1 : 0)
    parts.push(1)
    parts.push(endX)
    parts.push(endY)
    return parts.join(' ')
}



function getPosition(angle: number) {
    angle += Math.PI / 2;
    return [center + radius * Math.cos(angle), center + radius * Math.sin(angle)];
}


</script>

<template>
    <svg
        :width="`${size}px`"
        :height="`${reHeight + processWidth}px`"
        :viewBox="`0 0 ${size} ${reHeight + processWidth}`"
    >
        <g fill="none">
            <path
                :stroke="mainColor"
                stroke-linecap="round"
                :stroke-width="processWidth"
                :d="getD(startAngle, endAngle)"
            />
            <path
                :stroke="processColor"
                stroke-linecap="round"
                :stroke-width="processWidth"
                :d="processPathD"
            />
        </g>
    </svg>
</template>

