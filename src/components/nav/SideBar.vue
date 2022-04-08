<script lang="ts" setup>
import { ref, watch } from 'vue';
import { NSpace, NTooltip } from 'naive-ui'
import CButton from '../base/CButton.vue';
import { routes } from '../../router'
import { useRoute, useRouter } from 'vue-router';

const currentPath = ref<string>("/");
const route = useRoute();
const router = useRouter();

function sidebarChangeHandler(name: string) {
    if (name !== currentPath.value) {
        currentPath.value = name;
        router.push({ path: name });
    }
}

function clickLogoHandler() {
    window.open('http://www.yuankest.cn/index.html');
}

watch(()=>route.path,(current,old,_)=>{
    currentPath.value = '/' + current.split('/')[1];
})

</script>

<template>
    <n-space vertical id="sidebar">
            <!-- <SvgIcon name="logo" :height="40" :width="40" @click="clickLogoHanlder"></SvgIcon> -->
        
        <CButton id="logo"
                icon="logo" 
                text="logo" 
                :size="2" 
                :icon-scale="1" 
                @click="clickLogoHandler">
        </CButton>

        <n-space vertical>
            <template v-for="sidebarItem in routes" :key="sidebarItem.name">
                <n-tooltip placement="right" trigger="hover">
                    <template #trigger>
                        <CButton
                            :text="sidebarItem.path"
                            :icon="`sidebar-${sidebarItem.icon}`"
                            :is-active="sidebarItem.path === currentPath"
                            :size="2"
                            @click="sidebarChangeHandler(sidebarItem.path)"
                            class="hover_btn"
                        ></CButton>
                    </template>
                    <span>{{ sidebarItem.tag }}</span>
                </n-tooltip>
            </template>
        </n-space>
    </n-space>
</template>

<style scoped>
#sidebar {
    background-color: #222631;
    padding: 15px 10px;
}

#logo {
    margin-bottom: 5px;
}

.hover_btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>∫