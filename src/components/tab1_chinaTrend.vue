<template>
    <div class="china-trend">
        <div id="myChart1"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                yqData: {}
            }
        },
        beforeCreate() {
            this.$Loading.start();
        },
        mounted(){
            this.$Loading.finish();
            var myChart1 = echarts.init(document.getElementById('myChart1'));
            var option = {
                // backgroundColor: {
                //     type: 'linear',
                //     x: 0,
                //     y: 0,
                //     x2: 1,
                //     y2: 1,
                //     colorStops: [{
                //         offset: 0,
                //         color: '#0f378f' // 0% 处的颜色
                //     }, {
                //         offset: 1,
                //         color: '#00091a' // 100% 处的颜色
                //     }],
                //     globalCoord: false // 缺省为 false
                // },
                legend: {
                    show: true,
                    x: 'center',
                    top: '10%',
                    y: '35',
                    icon: 'stack',
                    itemWidth: 24,
                    itemHeight: 15,
                    textStyle: {
                        color: '#1bb4f6'
                    },
                    data: ['新增确诊数', '新增治愈数', '新增死亡数']
                },
                tooltip: {
                    show: true,
                    formatter: `<img src="../../static/img/time.png" width="20px" style="vertical-align: bottom">
                        时间:{b}<br>
                        <img src="../../static/img/cured.png" width="20px" style="vertical-align: bottom">
                        {a1}:{c1}<br>
                        <img src="../../static/img/sure.png" width="20px" style="vertical-align: bottom">
                        {a0}:{c0}<br>
                        <img src="../../static/img/death.png" width="20px" style="vertical-align: bottom">
                        {a2}:{c2}`,
                    trigger: 'axis',
                    textStyle:{
                        align:'left'
                    },
                    axisPointer: {
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0, 255, 233,0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 255, 255,1)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(0, 255, 233,0)'
                                }],
                            }
                        },
                    },
                },
                grid: {
                    top: '25%',
                    left: '25%',
                    right: '25%',
                    bottom: '20%',
                },
                xAxis: [{
                    type: 'category',
                    axisLine: {
                        show: true
                    },
                    splitArea: {
                        // show: true,
                        color: '#f00',
                        lineStyle: {
                            color: '#f00'
                        },
                    },
                    axisLabel: {
                        margin: 30,
                        color: '#fff'
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: false,
                    data: ['2020-01','2020-02','2020-03','2020-04','2020-05','2020-06','2020-07','2020-08','2020-09','2020-10']
                }],

                yAxis: [{
                    type: 'value',
                    min: 0,
                    // max: sureData.concat(curedData).concat(deathData).sort()[0],
                    splitNumber: 4,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    axisLine: {
                        show: true,
                    },
                    axisLabel: {
                        show: true,
                        margin: 15,
                        textStyle: {
                            color: '#d1e6eb',

                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [{
                        name: '新增确诊数',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 15,
                        lineStyle: {
                            normal: {
                                color: "#fc6565",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fc6565',
                            }
                        },
                        itemStyle: {
                            color: "#fc6565",
                            borderColor: "#fff",
                            borderWidth: 2,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(108,80,243,0.3)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(108,80,243,0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(108,80,243, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: [8,7,6,5,4,3,7,8,13,15],
                    },
                    {
                        name: '新增治愈数',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 15,
                        lineStyle: {
                            normal: {
                                color: "#00ca95",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#00ca95',
                            }
                        },

                        itemStyle: {
                            color: "#00ca95",
                            borderColor: "#fff",
                            borderWidth: 2,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0,202,149,0.3)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0,202,149,0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(0,202,149, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: [1,2,3,4,5,6,7,8,9,10],
                    }, {
                        name: '新增死亡数',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 15,
                        lineStyle: {
                            normal: {
                                color: "#9e9e9e",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#9e9e9e',
                            }
                        },

                        itemStyle: {
                            color: "#9e9e9e",
                            borderColor: "#fff",
                            borderWidth: 2,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0,202,149,0.3)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0,202,149,0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(0,202,149, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: [1,3,5,7,9,2,4,6,8,10],
                    }
                ]
            }
            myChart1.setOption(option);
        }
    }
</script>

<style scoped>
#myChart1{
    height:620px;
    width:100%;
}
</style>