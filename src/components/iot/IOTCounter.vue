<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import CCard from '../base/CCard.vue';
import MultilineRate from '../base/shape/MultilineRate.vue'
import Ring from '../base/shape/Ring.vue';

const options = [
    { name: "正常", val: 80, color: '#023AFF', secondaryColor: '#fff' },
    { name: "故障", val: 5, color: '#FF2D2E' },
    { name: "离线", val: 15, color: '#FFA640' }]

const count = computed(() => {
    return options.reduce((pre, current) => pre + current.val, 0);
});

</script>

<template>
    <div id="count">{{ count }}</div>
    <MultilineRate class="rate" :values="options" :width="250"></MultilineRate>

    <div class="item" v-for="option in options">
        <div style="display: flex;align-items: center;">
            <Ring :radius="5" :stroke="option.color"></Ring>
            <span>{{ option.name }}</span>
        </div>
        <span :style="{ color: option.secondaryColor || option.color }">{{ option.val }}</span>
        <span>{{ option.val * 100 / count }}%</span>
    </div>
</template>

<style scoped>
#count {
    font-size: xx-large;
}

.rate {
    margin-bottom: 20px;
}

.item {
    margin: 10px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>