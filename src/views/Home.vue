<script lang="ts" setup>
import { onUnmounted, ref } from 'vue';
import { Color3 } from '@babylonjs/core';
import point from '../assets/imgs/point.png';

import SceneManager from '../manager/SceneManager';
import ContentMarkerContainer from '../components/layout/ContentMarkerContainer.vue';

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
        ["Roof", { name: "园科大厦", items: [] }],
        ["other1", {
            name: "宏智大厦-B区", items: [
                { name: "欧之漫超市" },
                { name: "亿智行地产" },
                { name: "苏州京卓智信息科技有限公司" }]
        }],
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

const key = ref('');

function onMarkerClick(name:string){
    key.value = name;
}

onUnmounted(() => {
    SceneManager.Instance.setRenderOverlay();
})
</script>

<template>
    <ContentMarkerContainer v-for="other in others" 
        :mesh="other[0]" 
        :title="other[1].name" 
        :overlayColor="overlayColor"
        :overlayAlpha="overlayAlpha"
        :showContent = "key === other[0]"
        @markerClick="onMarkerClick(other[0])">
        <div class="marker">
            <img :src="point" :width="25" :height="25" />
            {{ other[1].name }}
        </div>

        <template #content>
            <ul>
                <li v-for="item in other[1].items">
                    {{ item.name }}
                </li>
            </ul>
        </template>
    </ContentMarkerContainer>
</template>

<style>
.marker {
    display: flex;
    cursor: pointer;
}

.n-drawer-mask {
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
}
</style>