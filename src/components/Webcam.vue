<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue';
import EZUIKit from 'ezuikit-js'
import img from '../assets/imgs/point.png?url'

const props = withDefaults(defineProps<{
    url: string,
    accessToken: string,
    audio?: 1 | 0,
    width?: number | string,
    height?: number | string
}>(), {
    audio: 1,
    width: 600,
    height: 400,
})

let player: any;

var themeData = {
    "header": {
        "color": "#1890ff",
        "activeColor": "#FFFFFF",
        "backgroundColor": "#000000",
        "btnList": [
            {
                "iconId": "deviceID",
                "part": "left",
                "defaultActive": 0,
                "memo": "顶部设备名称",
                "isrender": 0
            },
            {
                "iconId": "deviceName",
                "part": "left",
                "defaultActive": 0,
                "memo": "顶部设备ID",
                "isrender": 0
            },
            {
                "iconId": "cloudRec",
                "part": "right",
                "defaultActive": 0,
                "memo": "顶部设备ID",
                "isrender": 0
            },
            {
                "iconId": "rec",
                "part": "right",
                "defaultActive": 0,
                "memo": "顶部设备ID",
                "isrender": 0
            }
        ]
    },
    "footer": {
        "color": "#FFFFFF",
        "activeColor": "#1890FF",
        "backgroundColor": "#00000021",
        "btnList": [
            {
                "iconId": "play",
                "part": "left",
                "defaultActive": 1,
                "memo": "播放",
                "isrender": 1
            },
            {
                "iconId": "capturePicture",
                "part": "left",
                "defaultActive": 0,
                "memo": "截屏按钮",
                "isrender": 1
            },
            {
                "iconId": "sound",
                "part": "left",
                "defaultActive": 0,
                "memo": "声音按钮",
                "isrender": 1
            },
            {
                "iconId": "pantile",
                "part": "left",
                "defaultActive": 0,
                "memo": "云台控制按钮",
                "isrender": 1
            },
            {
                "iconId": "recordvideo",
                "part": "left",
                "defaultActive": 0,
                "memo": "录制按钮",
                "isrender": 1
            },
            {
                "iconId": "talk",
                "part": "left",
                "defaultActive": 0,
                "memo": "对讲按钮",
                "isrender": 1
            },
            {
                "iconId": "hd",
                "part": "right",
                "defaultActive": 0,
                "memo": "清晰度切换按钮",
                "isrender": 1
            },
            {
                "iconId": "webExpend",
                "part": "right",
                "defaultActive": 0,
                "memo": "网页全屏按钮",
                "isrender": 1
            },
            {
                "iconId": "expend",
                "part": "right",
                "defaultActive": 0,
                "memo": "全局全屏按钮",
                "isrender": 1
            }
        ]
    }
};

onMounted(() => {
    player = new EZUIKit.EZUIKitPlayer({
        id: 'video-container', // 视频容器ID
        accessToken: props.accessToken,
        url: props.url,
        width: props.width,
        height: props.height,
        audio: props.audio,
        themeData: themeData
    })

    setTimeout(() => {
        player.setPoster(img);
    }, 200)
})

watch([props.url],()=>{
    if(player){
        player.changePlayUrl({
            
        })
    }
})
</script>

<template>
    <div id="video-container"></div>
</template>

<style scoped>
#video-container {
    border-radius: 10px;
}
</style>