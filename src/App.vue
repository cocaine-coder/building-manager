<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import { NConfigProvider, darkTheme, NSwitch} from 'naive-ui'

import { Scene } from '@babylonjs/core';
import SceneComponent from './components/SceneComponent.vue';
import SceneManager from './manager/SceneManager';

import { useIOTShowerStore } from './stores/IOTStore'

import Example from './components/base/Example.vue';
import IOTData from './components/iot/IOTData.vue';
import Floors from './components/Floors.vue';
import CarParks from './components/CarParks.vue';
import Helper from './components/Helper.vue'

const show3D = ref(true);
const IOTShower = useIOTShowerStore();

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

  <div class="controls">
    <n-config-provider class="n-controls" :theme="darkTheme">
      <Helper></Helper>
      <div id="monitor" v-if="IOTShower.show">
        <CarParks id="car-parks"></CarParks>
        <p></p>
        <IOTData id="iot-data"></IOTData>
      </div>

      <Floors id="floors"></Floors>
    </n-config-provider>
    <n-config-provider :theme="undefined" v-if="!show3D">
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

.controls,
.n-controls {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.n-controls > * {
  pointer-events: visible;
}

#monitor {
  position: absolute;
  bottom: 100px;
  left: 30px;
}

#floors {
  position: absolute;
  bottom: 200px;
  right: 30px;
}
</style>
