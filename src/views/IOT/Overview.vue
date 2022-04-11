<script lang="ts" setup>
import IOTData from '../../components/iot/IOTData.vue';
import IOTCounter from '../../components/iot/IOTCounter.vue';
import CCard from '../../components/base/CCard.vue';
import AirQuality from '../../components/iot/chart/AirQuality.vue';
defineProps<{}>();
</script>

<template>
    <CCard class="item" title="物联网设备统计">
        <IOTCounter></IOTCounter>
    </CCard>

    <CCard class="item" title="近12小时空气质量趋势">
        <AirQuality></AirQuality>
    </CCard>

    <IOTData class="item" id="data"></IOTData>
</template>

<style scoped>
.item{
    margin-top: 20px;
}
</style>