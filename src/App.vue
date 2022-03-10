<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Scene } from '@babylonjs/core';
import SceneComponent from './components/SceneComponent.vue';
import SceneManager from './manager/SceneManager';
import Example from './components/base/Example.vue';

import { ref } from 'vue'
import { NConfigProvider, darkTheme, NSwitch } from 'naive-ui'

const show3D = ref(false);

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
    <n-config-provider :theme="undefined">
      <n-switch v-model:value="show3D"></n-switch>
      <label>{{ show3D ? '显示控件demo' : '显示3D' }}</label>
      <Example v-if="!show3D"></Example>
    </n-config-provider>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  height: 100vh;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}

#app {
  height: 100vh;
}

.scene-container {
  height: 100vh;
  width: 100%;
}

#controls {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

#controls > * {
  pointer-events: visible;
}
</style>
