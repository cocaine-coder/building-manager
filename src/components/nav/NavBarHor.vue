<script lang="ts" setup>
import CButton from '../base/CButton.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

const props = defineProps<{
    initPath: string;
    routes: { path: string, tag: string }[]
}>();

const route = useRoute();
const router = useRouter();
const currentPath = ref(props.initPath);

function onBtnClick(path: string) {
    router.push(path);
    currentPath.value = path;
}

watch(() => route.path, (current, old, _) => {
    props.routes.forEach(value => {
        if (current.indexOf(value.path) !== -1)
            currentPath.value = value.path;
    })
})
</script>

<template>
    <div id="container">
        <CButton
            v-for="route in routes"
            :text="route.tag"
            :radius="20"
            :height="40"
            :width="109"
            :is-active="currentPath === route.path"
            @click="onBtnClick(route.path)"
        ></CButton>
    </div>
</template>

<style scoped>
#container {
    border-radius: 24px;
    width: fit-content;
    height: 40px;
    background-color: #222631;
    display: flex;
    margin: 0 auto;
}
</style>