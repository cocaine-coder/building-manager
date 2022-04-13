<script lang="ts" setup>
import { AbstractMesh, Camera, Matrix, Nullable, Observer, Scene, Vector3 } from '@babylonjs/core';
import { onMounted, onUnmounted, ref } from 'vue';

type Target = AbstractMesh | Vector3;

const props = defineProps<{
    mesh: Target,
    scene: Scene
}>();

const container = ref<HTMLDivElement>();
let obs: Nullable<Observer<Scene>>;

onMounted(() => {
    const dom = container.value!;

    obs = props.scene.onBeforeRenderObservable.add((s, e) => {
        var coordinates = worldToScreen(props.mesh,props.scene.activeCamera!,props.scene);
        dom.style.top = window.innerHeight * coordinates.y + "px";
        dom.style.left = window.innerWidth * coordinates.x + "px";
    })
})

onUnmounted(() => {
    props.scene.onBeforeRenderObservable.remove(obs);
})

function worldToScreen(target: Target, camera: Camera, scene: Scene) {
    
    const isVector = target instanceof Vector3;
    const point = isVector ? target : target.getBoundingInfo().boundingBox.center;
    const worldMatrix = isVector? Matrix.Identity() : target.getWorldMatrix();
    const transformMatrix = scene.getTransformMatrix();

    return Vector3.Project(
            point,
            worldMatrix,
            transformMatrix,
            camera.viewport);
}

</script>

<template>
    <div class="bjs-gui-container" ref="container">
        <slot></slot>
    </div>
</template>

<style>
.bjs-gui-container {
    position: absolute;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}
</style>