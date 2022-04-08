<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import CButton from '../base/CButton.vue';
import SceneManager from '../../manager/SceneManager';
import { ref } from 'vue';

const currentFloor = ref<string>('all');

function floorChangeHandler(floor: string) {
    if (currentFloor.value === floor) return;
    if (floor === 'all') {
        SceneManager.Instance.mainBuildingManager.leave();
    } else {
        SceneManager.Instance.mainBuildingManager.enter(floor);
    }

    currentFloor.value = floor;
}

</script>

<template>
    <n-space vertical align="center">
        <Button
            text="All"
            shape="circle"
            bg-color="#222631"
            :is-active="currentFloor === 'all'"
            :size="1.8"
            @click="floorChangeHandler('all')"
        ></Button>
        <div id="card">
            <n-space vertical>
                <CButton
                    v-for="floor in SceneManager.Instance.mainBuildingManager.floorNames.reverse()"
                    shape="circle"
                    :key="floor"
                    :text="`${floor}F`"
                    :is-active="currentFloor === floor"
                    :size="1.5"
                    @click="floorChangeHandler(floor)"
                ></CButton>
            </n-space>
        </div>
    </n-space>
</template>

<style scoped>
#card {
    width: fit-content;
    border-radius: 30px;
    padding: 30px 5px;
    background-color: #222631;
}
</style>