<script lang="ts" setup>
import SceneManager from '../manager/SceneManager';
import IconMaker from '../components/layout/IconMaker.vue';
import { onUnmounted, ref } from 'vue';
import ContentMarkerContainer from '../components/layout/ContentMarkerContainer.vue';

const treeMap = new Map<string,{name:string}>([
    ['tree01',{name:'球柏'}],
    ['tree02',{name:'松树'}],
    ['tree03',{name:'红梅'}],
    ['tree04',{name:'樟树'}],
]);

const key = ref("");

function onMarkerClick(name:string){
    key.value = name
}

onUnmounted(()=>{
    SceneManager.Instance.setRenderOverlay();
})

</script>

<template>
    <ContentMarkerContainer v-for="tree in treeMap"
        :mesh="tree[0]"
        :title="tree[1].name"
        :showContent="key === tree[0]"
        @markerClick="onMarkerClick(tree[0])">
        <IconMaker 
            icon="greenery-tree"
            color="#5EFF5B"
            :text="tree[1].name">
        </IconMaker>

        <template #content>
            <div></div>
        </template>
    </ContentMarkerContainer>
</template>

<style>
</style>