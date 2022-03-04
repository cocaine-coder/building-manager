<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Scene } from '@babylonjs/core';
import SceneComponent from './components/SceneComponent.vue';
import SceneManager from './manager/SceneManager';

function onSceneReady(scene:Scene){
  SceneManager.Instance.init(scene);
}

</script>

<template>
   <SceneComponent
        className="scene-container"
        :onSceneReady="onSceneReady"
        :onRender="undefined"
        antialias
        adaptToDeviceRatio></SceneComponent>
</template>

<style>
html,body{
  margin:0;
}

#app {
  height: 100vh;
}

.scene-container{
  height : 100vh;
  width: 100%;
}
</style>
