<script setup lang="ts">
import { computed } from 'vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(defineProps<{
    text: string,
    shape?: 'circle' | 'square',
    size?: number,
    height?: number,
    width?: number,
    radius?: number,
    icon?: string,
    iconScale?: number,
    isActive?: boolean,
    bgColor?: string,
    activeBgColor?: string,
    color?: string,
    activeColor?: string,
}>(), {
    shape: 'square',
    size: 1,
    iconScale: 0.5,
    activeBgColor: "#023AFF",
    activeColor: "#FFFFFF",
    color: '#737C93',
});

const length = props.size * 20;

const heightPX = (props.height ? props.height : length).toString() + 'px';
const widthPX = (props.width ? props.width : length).toString() + 'px';

const radiusPx = props.radius ? props.radius + 'px' : `${Math.min(length / 3, 20)}px`;
const iconSizePx = props.iconScale <= 0 || props.iconScale > 1 ?
    `${0.5 * length}px` : `${props.iconScale * length}px`;

const contentColor = computed(() => {
    return props.isActive ? props.activeColor : props.color;
})

</script>

<template>
    <div
        :style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: isActive ? activeBgColor : bgColor,
            height: heightPX,
            width: widthPX,
            borderRadius: shape === 'circle' ? '50%' : radiusPx,
            cursor: 'pointer',
        }"
    >
        <SvgIcon
            v-if="icon"
            :name="icon"
            :color="contentColor"
            :height="iconSizePx"
            :width="iconSizePx"
        ></SvgIcon>
        <span v-if="!icon" :style="{ color: contentColor }">{{ text }}</span>
    </div>
</template> 