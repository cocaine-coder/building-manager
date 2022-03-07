<script setup lang="ts">

import Card from './Card.vue';
import SvgIcon from './SvgIcon.vue';

import IconLabel from './IconLabel.vue'
import LineRate from './shape/LineRate.vue';

import svgUrl from '../../assets/icons/mail.svg?url'

function handleClick(message?: string) {
    console.log("click handle", message);
}

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
            <LineRate :rate="50" outColor="#43464B"></LineRate>
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