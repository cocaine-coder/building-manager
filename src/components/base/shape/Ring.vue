<script lang="ts" setup>import { computed ,toRef} from '@vue/reactivity';

const props = withDefaults(defineProps<{
    radius?:number,
    stroke?:string,
    strokeWidth?:number,
}>(), {
    radius:10,
    stroke:'#F5003C',
    strokeWidth:2,
});

const size = computed(()=>(props.radius + props.strokeWidth)  * 2);
</script>

<template>
    <svg :width="`${size}px`" :height="`${size}px`" :viewBox="`0 0 ${size} ${size}`">
        <circle :cx="radius + strokeWidth" :cy="radius + strokeWidth" :r="radius" :stroke="stroke" :stroke-width="strokeWidth" fill="RGB(0,0,0,0)" />
    </svg>
</template>

<style>
</style>