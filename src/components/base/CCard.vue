<script lang="ts" setup>
defineProps<{
    title?:string
}>();
</script>

<template>
    <div id="card">
        <span v-if="title">{{title}}</span><br>
        <slot></slot>
    </div>
</template>

<style scoped>
#card {
    width: fit-content;
    padding: 1em;
    border-radius: 20px;
    background-color: rgb(24, 24, 28, 0.6);
    color:aliceblue;
}
</style>