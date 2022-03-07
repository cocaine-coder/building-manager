<script setup lang="ts">

import { ref, computed, onMounted } from 'vue';

const props = defineProps<{
    name: string,
    prefix?: string
    id?: string,
    size?: number,
    color?: string,
    onLoaded?: (svg: SVGSVGElement) => void,
}>();

const symbolId = `#${props.prefix || 'icon'}-${props.name}`;
const svg = ref<SVGSVGElement>();


const width = computed(() => {
    if (!svg.value) return undefined;
    const size = props.size || 1;
    return (svg.value.clientWidth - 150) * size;
})

const height = computed(() => {
    if (!svg.value) return undefined;
    const size = props.size || 1;
    return svg.value.clientHeight * size;
})

onMounted(() => {
    if (!svg.value) throw Error("load svg error!");
    props.onLoaded?.call(this, svg.value);
})

</script>

<template>
    <svg ref="svg" aria-hidden="true" :width="width" :height="height">
        <use :xlink:href="symbolId" :id="id" :fill="color || '#000000'" />
    </svg>
</template>