<script lang="ts" setup>
import { computed, onUnmounted, ref } from 'vue';
import { NDrawer, NDrawerContent } from 'naive-ui';
import { Color3 } from '@babylonjs/core';

import GuiContainer from '../components/layout/BJS-GUI-Follow-Container.vue';
import SceneManager from '../manager/SceneManager';
import point from '../assets/imgs/point.png';

type OtherItemInfo = {
    name: string
}

type OtherInfo = {
    name: string,
    items: Array<OtherItemInfo>
}

const overlayColor = Color3.FromHexString("#009cdb");
const overlayAlpha = 0.5;
const others = new Map<string, OtherInfo>(
    [
        ["Roof",{name:"园科大厦",items:[]}],
        ["other1", { name: "宏智大厦-B区", items: [{ name: "欧之漫超市" }, { name: "亿智行地产" }, { name: "苏州京卓智信息科技有限公司" }] }],
        ["other2", {
            name: "广鸿大厦", items: [
                { name: "苏州普腾信息科技有限公司" },
                { name: "江苏奇沐智能科技有限公司" },
                { name: "苏州风之力网络科技有限公司" },
                { name: "苏州领典文化传媒有限公司" },
                { name: "苏州广达科技有限公司" }]
        }],
        ["other3", {
            name: "欧瑞大厦", items: [
                { name: "欧之漫超市" },
                { name: "亿智行地产" },
                { name: "苏州京卓智信息科技有限公司" }]
        }],
        ["other4", { name: "亿阳科技大厦", items: [] }],
        ["other5", {
            name: "澳洋大厦", items: [
                { name: "米度财务管理(苏州)有限公司" },
                { name: "苏州晶之电科技有限公司" },
                { name: "光格设备有限公司" }
            ]
        }],
        ["other6", { name: "芯图大厦", items: [] }],
        ["other7", { name: "创闻大厦", items: [] }],
        ["other8", { name: "悉地(苏州)勘察设计顾问有限公司", items: [] }]
    ]
)

const showOuter = ref(false);
const key = ref("");
const info = computed(() => {
    return others.get(key.value);
})

function onMarkerClick(name: string) {
    SceneManager.Instance.scene.meshes.forEach(mesh => mesh.renderOverlay = false);
    SceneManager.Instance.scene.getMeshByName(name)!.overlayColor = overlayColor;
    SceneManager.Instance.scene.getMeshByName(name)!.overlayAlpha = overlayAlpha;
    SceneManager.Instance.scene.getMeshByName(name)!.renderOverlay = true;

    key.value = name;
    showOuter.value = true;
}

function onUpdateShow(show: boolean) {
    console.log(show)
    if (!show) {
        SceneManager.Instance.scene.meshes.forEach(mesh => mesh.renderOverlay = false);
    }
}

onUnmounted(() => {
    SceneManager.Instance.scene.meshes.forEach(mesh => mesh.renderOverlay = false);
})
</script>

<template>
    <GuiContainer
        v-for="other in others"
        :key="other[0]"
        :mesh="SceneManager.Instance.scene.getMeshByName(other[0])!"
    >
        <div class="marker" @click="onMarkerClick(other[0])">
            <img :src="point" :width="25" :height="25" />
            {{ other[1].name }}
        </div>
    </GuiContainer>

    <n-drawer
        v-model:show="showOuter"
        :width="502"
        :mask-closable="false"
        @update-show="onUpdateShow"
    >
        <n-drawer-content :title="info?.name" :closable="true">
            <ul>
                <li v-for="item in info?.items">
                    {{item.name}}
                </li>
            </ul>
            <template #footer></template>
        </n-drawer-content>
    </n-drawer>
</template>

<style>
.marker {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.n-drawer-mask {
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
}
</style>