<script lang="ts" setup>
import { NCard, NSpace } from 'naive-ui'
import { computed } from 'vue';
import SvgIcon from '../base/SvgIcon.vue';

export type level = 'good' | 'mid' | 'bad'

export type CheckFCType = (value: number) => level;

export type IOTDataType = {
    icon: string,
    iconSize?:number,
    name: string
    value: number,
    check: CheckFCType,
    unit?: string,
}

const props = defineProps<IOTDataType>();

const state = computed(() => {
    switch (props.check(props.value)) {
        case 'good':
            return 'green';
        case 'mid':
            return 'yellow';
        case 'bad':
            return 'red';
    }
})

</script>

<template>
    <n-card id="card">
        <NSpace id="iot-title" justify="space-between">
            <SvgIcon :name="icon" :size="iconSize || 0.25" color="#ffffff"></SvgIcon>
            <div id="state" :style="{ backgroundColor: state }"></div>
        </NSpace>
        <NSpace id="iot-content">
            <label id="iot-value">{{ props.value }}</label>
            <label v-if="props.unit">{{ props.unit }}</label>
        </NSpace>
        <label>{{ props.name }}</label>
    </n-card>
</template>


<style scoped>
.n-card {
    width: 150px;
    border-radius: 20px;
    background-color: rgb(24, 24, 28,0.6);
    /* filter: blur(6px); */
}

#iot-title {
    align-items: center;
}

#iot-content {
    margin-top: 20px;
    align-items: baseline;
}

#iot-value {
    font-size: 30px;
}

#state {
    height: 10px;
    width: 10px;
    border-radius: 5px;
}
</style>
