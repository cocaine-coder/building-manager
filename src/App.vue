<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { NConfigProvider, darkTheme } from 'naive-ui'
import { Scene } from '@babylonjs/core';

import SceneComponent from './components/SceneComponent.vue';
import SceneManager from './manager/SceneManager';

import { useLoadingStore } from './stores/SystemStroe'
import { useIOTShowerStore } from './stores/IOTStore'

import Loading from './components/Loading.vue';
import IOTData from './components/iot/IOTData.vue';
import Floors from './components/Floors.vue';
import CarParks from './components/CarParks.vue';
import Helper from './components/Helper.vue'

const loading = useLoadingStore();
const IOTShower = useIOTShowerStore();

function onSceneReady(scene: Scene) {
  SceneManager.Instance.init(scene).then(() => {
    loading.show = false;
  });
}

</script>

<template>
  <Loading></Loading>

  <SceneComponent
    class="scene-container"
    :onSceneReady="onSceneReady"
    :onRender="undefined"
    :antialias = "true"
    :adaptToDeviceRatio = "true"
  ></SceneComponent>

    <n-config-provider class="n-controls" :theme="darkTheme">
      <Helper></Helper>
      <div id="monitor" v-if="IOTShower.show">
        <CarParks id="car-parks"></CarParks>
        <p></p>
        <IOTData id="iot-data"></IOTData>
      </div>

      <Floors id="floors"></Floors>
    </n-config-provider>
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
