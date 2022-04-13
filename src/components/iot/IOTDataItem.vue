<script lang="ts" setup>
import { computed } from 'vue';
import SvgIcon from '../base/SvgIcon.vue';
import CCard from '../base/CCard.vue';

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
    <CCard class="c-card">
        <div class="title" justify="space-between">
            <div>
                <SvgIcon :name="icon" :size="iconSize || 0.25" color="#ffffff"></SvgIcon>
            </div>
            <div class="state" :style="{ backgroundColor: state }"></div>
        </div>
        <div class="content">
            <label class="value">{{ props.value }}</label>
            <label v-if="props.unit">{{ props.unit }}</label>
        </div>
        <label>{{ props.name }}</label>
    </CCard>
</template>


<style scoped>
.c-card {
    width: 100px;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content {
    display: flex;
    align-items: baseline;
}

.value {
    font-size: 30px;
    margin-right: 10px;
}

.state {
    height: 10px;
    width: 10px;
    border-radius: 5px;
}
</style>
