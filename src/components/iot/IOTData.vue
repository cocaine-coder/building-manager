<script lang="ts" setup>
import { onMounted, onUnmounted, reactive } from 'vue';
import { NSpace } from 'naive-ui'
import IOTDataItem, { IOTDataType, CheckFCType } from './IOTDataItem.vue'

const temperatureCheck: CheckFCType = (value: number) => {
    if (value > 35 || value < 0) return 'bad';
    if (value > 28 || value < 15) return 'mid';
    return 'good';
}

const humidityCheck: CheckFCType = (value: number) => {
    if (value > 80 || value < 40) return 'bad';
    if (value > 60 || value < 50) return 'mid';
    return 'mid';
}

const airQualityCheck: CheckFCType = (value: number) => {
    if (value > 60) return 'bad';
    if (value > 50) return 'mid';
    return 'good';
}

const datas = reactive<Array<IOTDataType>>([
    { name: "温度", value: 20, icon: "temperature", unit: "℃", check: temperatureCheck },
    { name: "湿度", value: 55, icon: "humidity", unit: "％", check: humidityCheck },
    { name: '空气质量', value: 20, icon: "airQuality", check: airQualityCheck }
])

let intervalHandler: number | undefined;
const baseData = [25, 55, 45]
onMounted(() => {
    intervalHandler = setInterval(() => {
        datas.forEach((data,index) => {
            const random = baseData[index] * Math.random() * 1.5;
            data.value = Math.round(random);
        })
    }, 5000)
})

onUnmounted(() => {
    clearInterval(intervalHandler);
})

</script>

<template>
    <n-space>
        <IOTDataItem v-for="data in datas" v-bind="data"></IOTDataItem>
    </n-space>
</template>

<style scoped>
.n-space {
    width: fit-content;
}
</style>