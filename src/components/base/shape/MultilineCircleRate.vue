<script lang="ts" setup>

const props = withDefaults(defineProps<{
    values: Array<{ color?: string, val: number }>,
    size?: number,
    text?: string,
    fontSize?:number,
    fontColor?:string,
    lineWidth?: number,
    empty?: number
}>(), {
    size: 100,
    fontSize:10,
    fontColor: "#ffffff",
    lineWidth: 7,
    empty: 0.08
})

const sum = props.values.map(v => v.val).reduce((pre, next) => pre + next);
const emptySum = props.values.length * props.empty * Math.PI;

const center = props.size / 2;
const radius = center - props.lineWidth / 2;

let endAngle = 0;

function getD(index: number): string {

    const val = props.values[index].val;
    const startAngle = endAngle;
    const dert = (Math.PI * 2 - emptySum) * val / sum;
    endAngle += dert;

    const [startX, startY] = getPosition(startAngle);
    const [endX, endY] = getPosition(endAngle);

    endAngle += props.empty * Math.PI;

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
    return [center + radius * Math.sin(angle), center - radius * Math.cos(angle)];
}


</script>

<template>
    <svg :width="`${size}px`" :height="`${size}px`" :viewBox="`0 0 ${size} ${size}`">
        <g>
            <path
                v-for="value, index in values"
                :key="value.val"
                fill="none"
                stroke-linecap="round"
                :stroke="value.color"
                :stroke-width="lineWidth"
                :d="getD(index)"
            />

            <text
                v-if="text"
                dominant-baseline="middle"
                text-anchor="middle"
                :font-size="fontSize"
                :fill="fontColor"
                :x="center"
                :y="center"
            >{{ text }}</text>
        </g>
    </svg>
</template>