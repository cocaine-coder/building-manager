<script setup lang="ts">
defineProps({
    width:{
        default:''
    },
    height:{
        default:''
    },
    alpha:{
        default: 0.5
    },
    radius:{
        default: '1px'
    }
})

const aaa =1;
</script>

<template>
    <div :style="{ width: width, height: height }" class="board">
        <slot></slot>
    </div>
</template>

<style scoped>
.board {
    background: rgba(29, 29, 31, v-bind(alpha));
    backdrop-filter: saturate(200%) blur(10px) brightness(50%);
    pointer-events:all;
    border-radius:v-bind(radius)
}
</style>