<script lang="ts" setup>
import { AbstractMesh, Matrix, Nullable, Observer, Scene, Vector3 } from '@babylonjs/core';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
    mesh: AbstractMesh
}>();

const container = ref<HTMLDivElement>();
let obs: Nullable<Observer<Scene>>;

onMounted(() => {
    const dom = container.value!;
    const mesh = props.mesh;
    const scene = mesh.getScene();

    obs = scene.onBeforeRenderObservable.add((s, e) => {
        var worldMatrix = mesh.getWorldMatrix();
        var transformMatrix = scene.getTransformMatrix();
        var viewport = scene.activeCamera!.viewport;

        var coordinates = Vector3.Project(
            mesh.getBoundingInfo().boundingBox.center, 
            worldMatrix,
            transformMatrix, 
            viewport);

        dom.style.top = window.innerHeight * coordinates.y + "px";
        dom.style.left = window.innerWidth * coordinates.x + "px";
    })
})

onUnmounted(() => {
    props.mesh.getScene().onBeforeRenderObservable.remove(obs);
})

</script>

<template>
    <div class="bjs-gui-container" ref="container">
        <slot></slot>
    </div>
</template>

<style>
.bjs-gui-container {
    position:absolute;
    transform:translate(-50%, -50%);
}
</style>