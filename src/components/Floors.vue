<script lang="ts" setup>
import { NSpace, NButton } from 'naive-ui'
import { ref } from 'vue';

import SceneManager from '../manager/SceneManager';
import {useFloorStore} from '../stores/FloorStore'

export type FloorViewModel = {
    name: string,
    meshName: string
}

let floors: Array<FloorViewModel> = [
    { name: "6F", meshName: "7_primitive0_merged" },
    { name: "5F", meshName: "6_primitive0_merged" },
    { name: "4F", meshName: "5_primitive0_merged" },
    { name: "3F", meshName: "4_primitive0_merged" },
    { name: "2F", meshName: "3_primitive0_merged" },
    { name: "1F", meshName: "2_primitive0_merged" },
]

const floorStore = useFloorStore();

function getBtnColor(meshName: string) {
    return floorStore.meshName === meshName ? "#5e82ff" : undefined;
}

function onChangeFloorHandler(meshName:string){
    if(floorStore.meshName === meshName)
        return;

    if(meshName === '') SceneManager.Instance.goOrigin();
    else SceneManager.Instance.goTo(meshName);
    floorStore.meshName = meshName;
}

</script>

<template>
    <n-space vertical align="center">
        <n-button 
            circle
            text-color="black"
            :color="getBtnColor('')" 
            @click="onChangeFloorHandler('')">All</n-button>
        <div id="card">
            <n-space vertical>
                <n-button
                    circle
                    v-for="floor in floors"
                    :color="getBtnColor(floor.meshName)"
                    @click="onChangeFloorHandler(floor.meshName)"
                >{{ floor.name }}</n-button>
            </n-space>
        </div>
    </n-space>
</template>

<style scoped>
#card {
    width: fit-content;
    border-radius: 30px;
    padding: 30px 5px;
    background-color: rgb(24, 24, 28, 0.6);
}
</style>