

<script setup lang="ts">
import { Engine, EngineOptions, Scene, SceneOptions, SceneLoader, Color4 } from "@babylonjs/core";
import { GLTFFileLoader } from 'babylonjs-loaders'
import { onMounted, onUnmounted, ref } from "vue";


const props = defineProps<{
    className?: string
    antialias?: boolean
    engineOptions?: EngineOptions
    adaptToDeviceRatio?: boolean
    sceneOptions?: SceneOptions
    onRender?: (scene: Scene) => void
    onSceneReady: (scene: Scene) => void
}>();

const canvas = ref(null);
let engine: Engine;
let scene: Scene;
onMounted(() => {
    SceneLoader.RegisterPlugin(new GLTFFileLoader());

    if (canvas.value) {
        engine = new Engine(canvas.value, props.antialias, props.engineOptions, props.adaptToDeviceRatio);
        scene = new Scene(engine, props.sceneOptions);
        scene.clearColor = new Color4(0, 0, 0, 1);

        if (scene.isReady()) {
            props.onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if (typeof props.onRender === "function") {
                props.onRender(scene);
            }
            scene.render();
        });

        if (window) {
            window.addEventListener("resize", resize);
        }
    }
})

onUnmounted(() => {
    scene.getEngine().dispose();

    if (window) {
        window.removeEventListener("resize", resize);
    }
})

const resize = () => {
    scene.getEngine().resize();
};

</script>

<template>
    <canvas ref="canvas" :class="className" />
</template>