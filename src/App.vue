<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { Scene } from '@babylonjs/core';
import SceneComponent from './components/SceneComponent.vue';
import SceneManager from './manager/SceneManager';
import Board from './components/base/Board.vue';

function onSceneReady(scene: Scene) {
  SceneManager.Instance.init(scene);
}

function handleTest(){
  console.log(123);
}

</script>

<template>
  <SceneComponent
    class="scene-container"
    :onSceneReady="onSceneReady"
    :onRender="undefined"
    antialias
    adaptToDeviceRatio
  ></SceneComponent>

  <div id="controls">
    <Board width="30px" height="300px" :alpha="0.1" radius="15px">
      <button @click="handleTest">click</button>
    </Board>
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
  pointer-events:none;
}
</style>
