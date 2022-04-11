<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TooltipComponent]);

const container = ref<HTMLDivElement>();

onMounted(() => {
    var myChart = echarts.init(container.value!, undefined, { height: 200, width: 400 });

    let option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['08', '09', '10', '11', '12', '15', '14', '15', '16', '17', '18', '19'],
            // axisLabel: {
            //     formatter: '{value}:00'
            // }
            name: '小时'
        },
        yAxis: {
            type: 'value',
            splitLine: false,
            name: 'AQI',
            // nameTextStyle:{
            //     align: 'right'
            // }
        },
        grid: {
            top: '20%',
            bottom: '10%',
        },
        textStyle: {
            color: '#fff'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                }
            },
            // backgroundColor:'rgba(0,0,0,0.5)',
            formatter: (params: any) => {
                const param = params[0];
                const axisValue = param.axisValueLabel;
                const data = param.data as number;

                return `<div>
                        <div style="font-size:17px">${axisValue}h</div>
                        <div style="display:flex;align-items: center;justify-content: space-between; width:50px">
                            <div style="width:10px;height:10px;border-radius:50%;background:${data >= 60 ? 'red' : data < 50 ? 'green' : 'yellow'}"></div>
                            <span>${data}</span>
                        </div>
                    </div>`;
            }
        },
        series: [
            {
                data: [45, 44, 34, 45, 50, 60, 45, 34, 23, 23, 54, 56],
                type: 'line',
                smooth: true,
                symbolSize: 0,
                lineStyle: {
                    color: 'rgba(254, 126, 7, 1)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(255, 122, 47, 0.5)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 122, 47, 0)'
                        }
                    ])
                }
            }
        ]
    };

    option && myChart.setOption(option);
})
</script>

<template>
    <div ref="container" style="height: 100%"></div>
</template>

<style>
</style>