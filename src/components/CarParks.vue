<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { NCard, NSpace } from 'naive-ui'
import MultilineCircleRate from './base/shape/MultilineCircleRate.vue';

const total = 100;
const excess = ref(40);
const used = computed(() => total - excess.value);

let intervalHandler: number | undefined;
let added: number | undefined;

onMounted(() => {
    intervalHandler = setInterval(() => {
        if (added) {
            excess.value -= added;
            added = undefined;
        } else {
            added = Math.round(Math.random() * 2);
            excess.value += added;
        }
    }, 5000);
})

onUnmounted(() => {
    clearInterval(intervalHandler);
})
</script>

<template>
    <n-card title="停车位实时监控">
        <n-space :size="50">
            <MultilineCircleRate
                :values="[
                { color: '#5e82ff', val: used },
                { color: '#00be7e', val: excess }]"
                :size="80"
                :empty="0.15"
                :lineWidth="10"
                fontColor="#a162f7"
                :text="used.toString()"
                font-color="#ffffff"
                :font-size="20"
            ></MultilineCircleRate>

            <n-space vertical>
                <label>车位总数</label>
                <label class="count">{{ total }}</label>
            </n-space>

            <n-space vertical>
                <label>剩余车位</label>
                <label class="count count-excess">{{ excess }}</label>
            </n-space>
        </n-space>
    </n-card>
</template>

<style>
.n-card {
    border-radius: 20px;
    background-color: rgb(24, 24, 28, 0.6);
}

.count {
    font-size: 25px;
}

.count-excess {
    color: #00be7e;
}
</style>