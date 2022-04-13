<script lang="ts" setup>
import CCard from '../base/CCard.vue';
import CButton from '../base/CButton.vue';

defineProps<{
    icon: string,
    color: string,
    text: string
}>();

</script>

<template>
    <div class="card">
        <CButton 
            class="icon"
            :text="text" 
            :icon="icon"
            :size="2"
            :iconScale="0.7"
            :isActive="true"
            :activeBgColor="color"></CButton>
        <div>{{ text }}</div>
    </div>
</template>

<style scoped>
.card {
    padding: 0.4rem;
    display: flex;
    align-items: center;
}

.icon{
    margin-right: 0.5rem;
}
</style>