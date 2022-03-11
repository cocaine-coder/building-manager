<script setup lang="ts">
import {NTooltip, NButton, NUl, NLi } from 'naive-ui'
</script>

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button strong secondary round type="success" color="black">帮助</n-button>
        </template>
        <n-ul>
            <n-li>1 - 白天</n-li>
            <n-li>2 - 日落</n-li>
            <n-li>3 - 黑夜</n-li>
            <n-li>9 - 透明模式</n-li>
            <n-li>0 - 不透明模式</n-li>
            <n-li>双击楼体 - 进入单层模式</n-li>
            <n-li>esc - 退至初始状态</n-li>
        </n-ul>
    </n-tooltip>
</template>