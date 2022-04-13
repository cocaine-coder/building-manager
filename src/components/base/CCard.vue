<script lang="ts" setup>
defineProps<{
    title?:string
    closeable?:boolean
}>();

const emits = defineEmits<{
    (e:'close'):void
}>();

function onDelClick(){
    emits('close');
}
</script>

<template>
    <div class="card">
        <div class="title" v-if="title || closeable">
            <div class="title-text" v-if="title">{{title}}</div>
            <div class="title-close" v-if="closeable" @click="onDelClick">x</div>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    width: fit-content;
    padding: 1em;
    border-radius: 20px;
    background-color: rgb(24, 24, 28, 0.6);
    color:aliceblue;
}

.title{
    display: flex;
    justify-content: space-between;
}

.title-text{
    margin-right: 20px;
}

.title-close{
    cursor: pointer;
}
</style>