<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NSpace } from 'naive-ui'
import SvgIcon from './SvgIcon.vue';
import CircleSlider from './shape/CircleSlider.vue';
import MultilineCircleRate from './shape/MultilineCircleRate.vue';
import MultilineRate from './shape/MultilineRate.vue';

const value = ref(20);

</script>

<template>
    <div>
        <n-card title="svg">
            <n-space justify="space-around">
                <n-space>
                    <SvgIcon name="mail" :size="0.5" color="#ff0000" class="icon"></SvgIcon>
                    <SvgIcon name="mail" :size="0.25" color="#ff0000" class="icon"></SvgIcon>
                    <SvgIcon name="mail" :size="0.1" color="#ff0000" class="icon"></SvgIcon>
                </n-space>

                <n-space>
                    <SvgIcon name="mail" :size="0.5" color="#00ff00" class="icon"></SvgIcon>
                    <SvgIcon name="mail" :size="0.25" color="#000000" class="icon"></SvgIcon>
                    <SvgIcon name="mail" :size="0.1" color="#0000ff" class="icon"></SvgIcon>
                </n-space>
            </n-space>
        </n-card>

        <n-card title="多段线 MultilineRate">
            <n-space :size="60">
                <MultilineRate
                    :width="200"
                    :values="[
                        { color: '#455DDC', val: 40 },
                        { color: '#9646EF', val: 60 },
                    ]"
                ></MultilineRate>
                <MultilineRate
                    :width="400"
                    :values="[
                        { color: '#455DDC', val: 40 },
                        { color: '#9646EF', val: 20 },
                        { color: '#FF852E', val: 15 },
                        { color: '#43D1A7', val: 20 },
                        { color: '#727C94', val: 50 }
                    ]"
                ></MultilineRate>
            </n-space>
        </n-card>

        <n-card title="多段线-圆环 MultilineCircleRate">
            <n-space :size="60">
                <MultilineCircleRate
                    :values="[
                    { color: '#43D1A7', val: 30 },
                    { color: '#43464C', val: 70 }]"
                    :size="100"
                    :empty="0.1"
                    :lineWidth="10"
                ></MultilineCircleRate>
                <MultilineCircleRate
                    :values="[
                    { color: '#43D1A7', val: 40 },
                    { color: '#43464C', val: 60 }]"
                    :size="100"
                    :empty="0.1"
                    :lineWidth="10"
                    fontColor="#a162f7"
                    text="40%"
                ></MultilineCircleRate>
                <MultilineCircleRate
                    :values="[
                    { color: '#455DDC', val: 40 },
                    { color: '#9646EF', val: 20 },
                    { color: '#FF852E', val: 15 },
                    { color: '#43D1A7', val: 20 },
                    { color: '#727C94', val: 5 }]"
                    :size="100"
                    :empty="0.1"
                    :lineWidth="10"
                ></MultilineCircleRate>
            </n-space>
        </n-card>

        <n-card title="slider">
            <CircleSlider v-model="value" mainColor="#43464B"></CircleSlider>
            <n-space :size="0">
                <div id="start"></div>
                <div id="centers"></div>
                <div id="end"></div>
            </n-space>
        </n-card>
    </div>
</template>

<style scoped>
</style>