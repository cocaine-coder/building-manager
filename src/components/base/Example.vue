<script setup lang="ts">

import Card from './Card.vue';
import SvgIcon from './SvgIcon.vue';

import IconLabel from './IconLabel.vue'
import LineRate from './shape/LineRate.vue';
import CircleSlider from './shape/CircleSlider.vue';
import { ref } from 'vue';
import MultilineCircleRate from './shape/MultilineCircleRate.vue';
import CircleRate from './shape/CircleRate.vue';

function handleClick(message?: any) {
    console.log("click handle", message);
}

const value = ref(20);

</script>

<template>
    <div id="example">
        <Card style="width: 150px;">
            <template #title>
                <h3 id="title">hello world</h3>
            </template>
            <button>hello</button>
        </Card>

        <SvgIcon name="mail" :size="0.5" color="#ff0000" class="icon"></SvgIcon>

        <IconLabel text="hello world" labelColor="#000000"></IconLabel>

        <IconLabel
            icon="mail"
            :iconSize="0.2"
            color="#873FD7"
            :onClick="() => handleClick('IconLabel')"
        ></IconLabel>

        <Card style="width: 150px;">
            <template #title>
                <h3 id="title">rate</h3>
            </template>
            <LineRate :rate="50" mainColor="#43464B"></LineRate>
        </Card>

        <CircleSlider v-model="value" mainColor="#43464B"></CircleSlider>
        <div>
            <input type="number" v-model="value" style="width:100px" />
        </div>

        <Card style="width: 200px;">
            <template #title>
                <h3 id="title">station</h3>
            </template>
            <MultilineCircleRate
                :values="[
                { color: '#43D1A7', val: 30 },
                { color: '#43464C', val: 70 }]"
                :size="50"
                :empty="0.125"
                :lineWidth="5"
            ></MultilineCircleRate>
            <span>&nbsp;</span>
            <MultilineCircleRate
                :values="[
                { color: '#43D1A7', val: 30 },
                { color: '#43464C', val: 70 }]"
                :size="50"
                :empty="0.125"
                :lineWidth="5"
                text="40%"
            ></MultilineCircleRate>
            <span>&nbsp;</span>
            <MultilineCircleRate
                :values="[
                { color: '#455DDC', val: 40 },
                { color: '#9646EF', val: 20 },
                { color: '#FF852E', val: 15 },
                { color: '#43D1A7', val: 20 },
                { color: '#727C94', val: 5 }]"
                :size="50"
                :empty="0.125"
                :lineWidth="5"
            ></MultilineCircleRate>

            <CircleRate :size="50" :processWidth="5" :rate="value"></CircleRate>
        </Card>
    </div>
</template>

<style scoped>
#example {
}

#title {
    margin-top: 0;
    color: aliceblue;
}
</style>