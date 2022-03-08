<script lang="ts" setup>

import { ref } from 'vue';
import { getRangeValue } from '../../../utils/Calculation'

const props = withDefaults(defineProps<{
    rate?: number,
    height?: number,
    mainColor?: string,
    rateColor?: string,
}>(), {
    rate: 0,
    height: 5,
    mainColor: '#000000',
    rateColor: '#455DDC',
})

const rate = getRangeValue(props.rate, 0, 100);
const height = getRangeValue(props.height, 3, 7);

const outdiv = ref<HTMLDivElement>();
</script>

<template>
    <div
        :style="{ borderRadius: `${height}px`, height: `${height}px`, width: '100%', backgroundColor: mainColor }"
        ref="outdiv"
    >
        <div
            :style="{ borderRadius: `${height}px`, height: `${height}px`, width: `${rate}%`, backgroundColor: rateColor }"
        ></div>
    </div>
</template>

