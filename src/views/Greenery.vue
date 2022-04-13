<script lang="ts" setup>
import SceneManager from '../manager/SceneManager';
import IconMaker from '../components/layout/IconMaker.vue';
import { onUnmounted, ref } from 'vue';
import ContentMarkerContainer from '../components/layout/ContentMarkerContainer.vue';

import shongsu from '../assets/imgs/songsu.jpg'
import hongmei from '../assets/imgs/hongmei.jpeg'
import qiubai from '../assets/imgs/qiubai.jpeg'
import zhangshu from '../assets/imgs/zhangshu.jpeg'

const treeMap = new Map<string, { name: string, thumb?: string, content?: string }>([
    ['tree01', { name: '球柏', thumb: qiubai, content: `球柏是柏科、圆柏属矮型丛生圆球形灌木，枝密生，叶鳞形，间有刺叶。树皮深灰色，成条片开裂；树皮灰褐色，小枝通常直或稍成弧状弯曲，生鳞叶的小枝近圆柱形或近四棱形，叶二型，即刺叶及鳞叶；刺叶三叶交互轮生，斜展，疏松，披针形，先端渐尖，上面微凹，有两条白粉带。雌雄异株，稀同株，雄球花黄色，椭圆形，常有花药。球果近圆球形，熟时暗褐色，有种子；种子卵圆形，有棱脊及少数树脂槽；子叶条形。` }],
    ['tree02', { name: '松树', thumb: shongsu, content: `松树是松科、松属植物。世界上的松树种类有八十余种，松树主要分为马尾松、油松、白皮松、罗汉松、华山松、大别山五针松、红松、赤松、黑松、黄山松、云南松、金钱松、樟子松、雪松等。如分布于华北、西北几省区的油松、樟子松、黑松和赤松，华中几省的马尾松、黄山松、高山松，秦巴山区的巴山松，以及台湾松和北美短叶松，多数是我国荒山造林的主要树种。松树为轮状分枝，节间长，小枝比较细弱平直或略向下弯曲，针叶细长成束。其树冠看起来蓬松不紧凑，“松”字正是其树冠特征的形象描述。所以，“松”就是树冠蓬松的一类树。松树坚固，寿命十分长。` }],
    ['tree03', { name: '红梅', thumb: hongmei, content: `红梅是梅花的一种，这种植物可用于园林、绿地、庭园、风景区，可孤植、丛植、群植等；也可屋前、坡上、石际、路边自然配植。可用常绿乔木或深色建筑做背景，衬托出梅花玉洁冰清之美。古代强调"梅花绕屋"、"登楼观梅"等，均是为了获得最佳的观赏效果。另外，梅花可布置成梅岭、梅峰、梅园、梅溪、梅径等。红梅也是中国文人喜欢呤咏的对象，画作和诗歌很多。` }],
    ['tree04', { name: '樟树', thumb: zhangshu, content:`樟树为常绿大乔木,高达10米—55米左右，胸径30-80厘米；树皮灰褐色。枝条圆柱形，紫褐色，无毛，嫩时多少具棱角。芽小，卵圆形，芽鳞疏被绢毛。叶互生，卵圆形或椭圆状卵圆形，长8-17厘米，宽3-10厘米，先端短渐尖，基部锐尖、宽楔形至圆形，坚纸质，上面光亮，幼时有极细的微柔毛,老时变无毛，下面苍白，极密被绢状微柔毛，中脉在上面平坦下面凸起，侧脉每边4-6条，最基部的一对近对生，其余的均为互生，斜升，两面近明显，侧脉脉腋在下面有明显的腺窝，上面相应处明显呈泡状隆起，横脉及细脉网状，两面不明显，叶柄长2-3厘米，腹凹背凸，略被微柔毛。圆锥花序在幼枝上腋生或侧生，同时亦有近侧生，有时基部具苞叶，长(5)10-15厘米，多分枝，分枝两歧状，具棱角，总梗圆柱形，长4-6厘米，与各级序轴均无毛。` }],
]);

const key = ref("");

function onMarkerClick(name: string) {
    key.value = name
}

onUnmounted(() => {
    SceneManager.Instance.setRenderOverlay();
})

</script>

<template>
    <ContentMarkerContainer v-for="tree in treeMap" :mesh="tree[0]" :title="tree[1].name" :showContent="key === tree[0]"
        @markerClick="onMarkerClick(tree[0])">
        <IconMaker icon="greenery-tree" color="#455DDC" :text="tree[1].name">
        </IconMaker>

        <template #content>
            <div style="width: 300px;">
                <img class="content-img" v-if="tree[1].thumb" :src="tree[1].thumb" /><br />
                <div class="content-text" v-if="tree[1].content">
                    {{ tree[1].content }}
                </div>
            </div>
        </template>
    </ContentMarkerContainer>
</template>

<style>
.content-img,
.content-text {
    width: 300px;
    word-break: break-word;
    white-space: pre-line;
}
</style>