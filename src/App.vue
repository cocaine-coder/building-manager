<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Scene } from '@babylonjs/core';
import SceneComponent from './components/SceneComponent.vue';
import SceneManager from './manager/SceneManager';
import Example from './components/base/Example.vue';

const show3D = false;

function onSceneReady(scene: Scene) {
  SceneManager.Instance.init(scene);
}

</script>

<template>
  <SceneComponent
    v-if="show3D"
    class="scene-container"
    :onSceneReady="onSceneReady"
    :onRender="undefined"
    antialias
    adaptToDeviceRatio
  ></SceneComponent>

  <div id="controls">
    <Example></Example>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  height: 100vh;
}

#app {
  height: 100vh;
}

.scene-container {
  height: 100vh;
  width: 100%;
}

#controls {
  position:absolute;
  top: 0;
  width:100%;
  height: 100%;
}
</style>
