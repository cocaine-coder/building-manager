<script setup lang="ts">
const props = defineProps({
    alpha: {
        default: 0.8
    },
    radius: {
        default: 10
    }
})

const radiusValue = `${props.radius}px`;

</script>

<template>
    <div class="card">
        <slot name="title"></slot>
        <slot>

        </slot>
    </div>
</template>

<style scoped>
.card {
    padding: 10px 20px;
    background: rgba(34, 37, 43, v-bind(alpha));
    backdrop-filter: saturate(200%) blur(10px) brightness(50%);
    border-radius: v-bind(radiusValue);
}
</style>