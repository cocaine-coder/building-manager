<script lang="ts" setup>import { computed, ref } from 'vue';

import SvgIcon from './SvgIcon.vue';

withDefaults(defineProps<{
    color?: string,
    labelColor?: string,
    text?: string,
    icon?: string,
    iconSize?: number,
    radius?: number,
    onClick?: () => void,
}>(), {
    color: '#51FFCB',
    labelColor: '#FFFFFF',
    iconSize: 1,
    radius: 20,
})

</script>

<template>
    <div
        :style="{ backgroundColor: color, padding: '15px', borderRadius: `${radius}px`, cursor: onClick ? 'pointer' : 'default' ,width:'fit-content'}"
        @click="onClick"
    >
        <SvgIcon v-if="icon" :name="icon" :size="iconSize" :color="labelColor"></SvgIcon>
        <span v-if="!icon" :style="{ color: labelColor }">{{ text }}</span>
    </div>
</template>