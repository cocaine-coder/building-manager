<script lang="ts" setup>
import ContentMarkerContainer from '../../components/layout/ContentMarkerContainer.vue';
import WebcamViewer from '../../components/WebcamViewer.vue';
import IconMaker from '../../components/layout/IconMaker.vue';
import { Vector3 } from '@babylonjs/core';

defineProps<{}>();

const mesh = new Vector3(0,0,0);

</script>

<template>
   <ContentMarkerContainer :mesh="mesh" :showContent="true" title="摄像头">
      <div>
         <IconMaker icon="iot-webcam" color="#455DDC" text="摄像头"></IconMaker>
      </div>

      <template #content>
         <WebcamViewer url="ezopen://open.ys7.com/G85698102/1.hd.live"
            accessToken="at.d8996t9t0yaoas6k0wu3rin60v039eqz-64cu9owyg4-0pc8u0f-qldixvdcx"></WebcamViewer>
      </template>
   </ContentMarkerContainer>
</template>

<style>
</style>