import { createRouter, createWebHashHistory } from "vue-router";
import Home from './views/Home.vue';

import IOT from './views/IOT/IOT.vue'
import IOTOverview from './views/IOT/Overview.vue';
import IOTEnv from './views/IOT/Env.vue';
import IOTSoil from './views/IOT/Soil.vue';
import IOTFeedwater from './views/IOT/Feedwater.vue';
import IOTRain from './views/IOT/Rain.vue';

import Security from './views/Security.vue';
import Greenery from './views/Greenery.vue';
import Tenant from './views/Tenant.vue';
import Asset from './views/Asset.vue';
import Fire from './views/Fire.vue';
import Car from './views/Car.vue';
import Pipeline from './views/Pipeline.vue';

import { RouterEvent } from "./eventbus";

export const routes = [
    { path: '/', component: Home, icon: "home", tag: "主页" },
    {
        path: '/iot', redirect:'/iot/all', component: IOT, icon: "iot", tag: "IOT",
        children: [
            { path: 'all', component: IOTOverview, tag: '概览' },
            { path: 'env', component: IOTEnv, tag: '环境' },
            { path: 'soil', component: IOTSoil, tag: '土壤' },
            { path: 'feedwater', component: IOTFeedwater, tag: '给水' },
            { path: 'rain', component: IOTRain, tag: '雨水' },
        ]
    },
    { path: '/security', component: Security, icon: "security", tag: "安防" },
    { path: '/greenery', component: Greenery, icon: "tree", tag: "绿化" },
    { path: '/tenant', component: Tenant, icon: "tenant", tag: "租户管理" },
    { path: '/asset', component: Asset, icon: "asset", tag: "资产管理" },
    { path: '/fire', component: Fire, icon: "fire", tag: "消防" },
    { path: '/car', component: Car, icon: "car", tag: "停车位" },
    { path: '/pipeline', component: Pipeline, icon: "pipeline", tag: "管线" }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;