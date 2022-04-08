<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { NConfigProvider, darkTheme } from 'naive-ui'
import { Scene } from '@babylonjs/core';
import SceneComponent from './components/layout/SceneComponent.vue';
import SceneManager from './manager/SceneManager';

import Loading from './views/Loading.vue';
import SideBar from './components/nav/SideBar.vue';
import { ref } from 'vue';

const loading = ref(true);

function onSceneReady(scene: Scene) {
  loading.value = true;
  SceneManager.Instance.initAsync(scene).then(() => {
    loading.value = false;
  });
}

</script>

<template>
  <Loading :show="loading"></Loading>

  <div id="main">
    <SideBar></SideBar>
    <div id="container">
      <SceneComponent
        class="scene-container"
        :onSceneReady="onSceneReady"
        :onRender="undefined"
        :antialias="true"
        :adaptToDeviceRatio="true"
      ></SceneComponent>

      <n-config-provider v-if="!loading" class="n-controls" :theme="darkTheme">
        <router-view></router-view>
      </n-config-provider>
    </div>
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
  overflow-y: hidden;
  overflow-x: hidden;
}

#app {
  height: 100vh;
}

#main {
  display: flex;
}

#container {
  height: 100vh;
  width: 100%;
  position: relative;
}

.scene-container {
  height: 100%;
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
  position: absolute;
}
</style>
