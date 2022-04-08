<script lang="ts" setup>
import NavBarHor from '../../components/nav/NavBarHor.vue';
import { routes } from '../../router';

const navs = routes.find(x => x.path === '/iot')?.children!;

</script>

<template>
    <NavBarHor :routes="navs" :initPath="navs[0].path"></NavBarHor>
    <router-view></router-view>
</template>

<style>
</style>