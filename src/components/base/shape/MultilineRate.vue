<script lang="ts" setup>import { computed, StyleValue } from 'vue';

import { getRangeValue } from '../../../utils/Calculation';

const props = withDefaults(defineProps<{
    height?: number,
    width?: number,
    values: Array<{
        val: number,
        color: string
    }>
}>(), {
    height: 10,
    width: 200
})

const sum = props.values.map(x => x.val).reduce((pre, cur) => pre + cur);
const height = computed(() => getRangeValue(props.height, 7, 15));

function getStyle(index: number) {
    const value = props.values[index];

    let style: StyleValue = {
        height: `${height.value}px`,
        width: `${props.width * value.val / sum}px`
    }

    const radius = height.value / 2;

    if (index === 0) {
        style.borderTopLeftRadius = `${radius}px`;
        style.borderBottomLeftRadius = `${radius}px`;
        style.backgroundImage = `linear-gradient(-105deg, transparent ${radius}px, ${value.color} 0)`
    }
    else if (index === props.values.length - 1) {
        style.borderTopRightRadius = `${radius}px`;
        style.borderBottomRightRadius = `${radius}px`;
        style.backgroundImage = `linear-gradient(75deg, transparent ${radius}px, ${value.color} 0)`
    } else {
        style.backgroundColor = value.color;
        style.transform = "skewX(15deg)";

        if (index !== props.values.length - 2) {
            style.marginRight = `${1.5 * height.value * Math.tan(15 * Math.PI / 180)}px`;
        }
    }

    return style;
}

</script>

<template>
    <div id="parent">
        <div v-for="_, index in values" :key="index" :style="getStyle(index)"></div>
    </div>
</template>

<style scoped>
#parent {
    display: flex;
    justify-items: center;
}
</style>