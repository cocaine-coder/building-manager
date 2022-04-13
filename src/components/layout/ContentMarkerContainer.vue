<script lang="ts" setup>
import { ref } from 'vue';
import { Color3 } from '@babylonjs/core';

import SceneManager from '../../manager/SceneManager';
import GuiContainer from './BJS-GUI-Follow-Container.vue'
import CCard from '../base/CCard.vue';

const props = defineProps<{
    mesh: string,
    showContent: boolean,
    title?: string,
    overlayColor?: Color3,
    overlayAlpha?: number
}>();

const emits = defineEmits<{
    (e: 'markerClick'): void
    (e: 'close'): void
}>();

const target = SceneManager.Instance.scene.getMeshByName(props.mesh)!
const show = ref(false);

function onMarkerClick() {
    show.value = true;
    SceneManager.Instance.setRenderOverlay
        (props.mesh, props.overlayColor, props.overlayAlpha);

    emits('markerClick');
}

function onClose() {
    show.value = false;
    SceneManager.Instance.setRenderOverlay();
    emits('close');
}

</script>

<template>
    <GuiContainer :mesh="target" :scene="SceneManager.Instance.scene" v-show="!(show && showContent)">
        <div @click="onMarkerClick">
            <slot></slot>
        </div>
    </GuiContainer>

    <GuiContainer :mesh="target" :scene="SceneManager.Instance.scene" v-show="show && showContent">
        <CCard :closeable="true" @close="onClose" :title="title">
            <slot name="content"></slot>
        </CCard>
    </GuiContainer>
</template>

<style>
</style>