<template>
    <div class="china-trend">
        <div id="myChart1"></div>
        <div id="myChart2"></div>
        <div id="myChart3"></div>
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
        mounted() {
            this.$Loading.finish();
            var myChart1 = echarts.init(document.getElementById('myChart1'));
            var myChart2 = echarts.init(document.getElementById('myChart2'));
            var myChart3 = echarts.init(document.getElementById('myChart3'));
            var getVirtulData = function(year) {
                year = year || '2021';
                var date = +echarts.number.parseDate(year + '-01-01');
                var end = +echarts.number.parseDate((+year + 1) + '-01-01');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                for (var time = date; time < end; time += dayTime) {
                    data.push([
                        echarts.format.formatTime('yyyy-MM-dd', time),
                        Math.floor(Math.random() * 10000)
                    ]);
                }
                console.log(data);
                return data;
            }
            var addOption1 = function() {
                return {
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
                        textStyle: {
                            align: 'left'
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
                        data:(function() {
                            let a = [];
                            for (let i = 0; i < 30; i++) {
                                a.push(i);
                            }
                            return a;
                        })(),
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
                        symbolSize: 5,
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
                                }, {
                                    offset: 1,
                                    color: 'rgba(108,80,243,0)'
                                }], false),
                                shadowColor: 'rgba(108,80,243, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: (function() {
                            let a = [];
                            for (let i = 0; i < 30; i++) {
                                a.push(Math.floor(Math.random(10) * 10));
                            }
                            return a;
                        })(),
                    }, {
                        name: '新增治愈数',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 5,
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
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,202,149,0)'
                                }], false),
                                shadowColor: 'rgba(0,202,149, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: (function() {
                            let a = [];
                            for (let i = 0; i < 30; i++) {
                                a.push(Math.floor(Math.random(10) * 10));
                            }
                            return a;
                        })(),
                    }, {
                        name: '新增死亡数',
                        type: 'line',
                        showAllSymbol: true,
                        symbol: 'circle',
                        symbolSize: 5,
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
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,202,149,0)'
                                }], false),
                                shadowColor: 'rgba(0,202,149, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: (function() {
                            let a = [];
                            for (let i = 0; i < 30; i++) {
                                a.push(Math.floor(Math.random(10) * 10));
                            }
                            return a;
                        })(),
                    }]
                }
            }
            var timeOption1 = {
                baseOption: {
                    timeline: {
                        width:'80%',
                        bottom: "5%",
                        left:'center',
                        axisType: 'category',
                        autoPlay: true,
                        playInterval: 2000,
                        animation: true,
                        data: [1,2,3,4,5,6,7,8,9,10,11,12],
                        itemStyle: {
                            normal: {
                                color: '#fff',
                                borderColor: '#4B96F3',
                                borderWidth: 2
                            },
                            emphasis: {
                                color: '#fff',
                                borderColor: '#4B96F3',
                                borderWidth: 2
                            }
                        },
                        lineStyle: {
                            color: '#C9C9C9',
                            width: 2
                        },
                        checkpointStyle: {
                            symbolSize: 8,
                            color: '#4B96F3',
                            borderColor: '#4B96F3',
                            borderWidth: 2
                        },
                        tooltip:{
                            show:false
                        },
                        // label: {
                        //     formatter: function(s) {
                        //         return (new Date(s)).getFullYear();
                        //     }
                        // },
                        title: {
                            subtext: '数据来自国家统计局'
                        },
                    },
                    legend: {
                        show: true,
                        x: 'center',
                        top: '20%',
                        y: '35',
                        icon: 'stack',
                        itemWidth: 24,
                        itemHeight: 15,
                        textStyle: {
                            color: '#1bb4f6'
                        },
                        data: ['新增确诊数', '新增治愈数', '新增死亡数']
                    },
                    grid: {
                        top: '30%',
                        left: '10%',
                        right: '5%',
                        bottom: '25%',
                    },
                },
                options: []
            }
            var option2 = {
                title: {
                    text: '2020年全年确诊人数与治愈人数关系图',
                    left: 'center',
                    top: '23%',
                    textStyle: {
                        size: 10,
                        color: 'white',
                    }
                },
                grid: {
                    top: '40%',
                    bottom: '15%',
                },
                toolbox: {
                    top: '10%',
                    right: '5%',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                    },
                    textStyle: {
                        align: 'left'
                    }
                },
                legend: {
                    data: ['新增治愈', '新增确诊'],
                    left: 10,
                    top: '20%',
                    textStyle: {
                        color: 'white'
                    }
                },
                dataZoom: [{
                    bottom: '5',
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 10,
                    height: 20,
                }, {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 10
                }],
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        onZero: false
                    },
                    textStyle: {
                        color: 'white',
                    },
                    data: (function() {
                        let a = [];
                        for (let i = 0; i < 365; i++) {
                            a.push(i);
                        }
                        return a;
                    })()

                }],
                yAxis: [{
                    name: '新增治愈(人)',
                    type: 'value',
                }, {
                    name: '新增确诊(人)',
                    nameLocation: 'start',
                    type: 'value',
                    inverse: true
                }],
                series: [{
                    name: '新增治愈',
                    type: 'line',
                    areaStyle: {
                        color: '#00ca95'
                    },
                    lineStyle: {
                        width: 1,
                        color: "rgba(0,0,0,0)"
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: (function() {
                        let a = [];
                        for (let i = 0; i < 365; i++) {
                            a.push(Math.floor(Math.random(10) * 100));
                        }
                        return a;
                    })()
                }, {
                    name: '新增确诊',
                    type: 'line',
                    yAxisIndex: 1,
                    areaStyle: {
                        color: '#fc6565',
                    },
                    lineStyle: {
                        width: 1,
                        color: "rgba(0,0,0,0)"
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: (function() {
                        let a = [];
                        for (let i = 0; i < 365; i++) {
                            a.push(Math.floor(Math.random(10) * 100));
                        }
                        return a;
                    })()
                }]
            }
            var option3 = {
                title: {
                    top: 30,
                    left: 'center',
                    text: '2020年全年新增确诊数日历图',
                    textStyle: {
                        color: 'white'
                    }
                },
                tooltip: {},
                visualMap: {
                    min: 0,
                    max: 10000,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '20%',
                    textStyle: {
                        color: "white"
                    }
                },
                calendar: {
                    top: 90,
                    left: 30,
                    right: 30,
                    cellSize: ['auto', 14],
                    range: '2020',
                    itemStyle: {
                        borderWidth: 0.5
                    },
                    yearLabel: {
                        show: false
                    }
                },
                series: {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: getVirtulData(2020)
                }
            }
            for(let i=0;i<12;i++){
                timeOption1.options.push(addOption1());
            }
            myChart1.setOption(timeOption1);
            myChart2.setOption(option2);
            myChart3.setOption(option3);
        }
    }
</script>

<style scoped>
    .china-trend {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: var(--bg-darkColor);
    }
    
    #myChart1 {
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
    }
    
    #myChart2 {
        position: absolute;
        width: 50%;
        height: 50%;
        top: 5%;
        left: 50%;
    }
    
    #myChart3 {
        position: absolute;
        width: 50%;
        height: 45%;
        top:55%;
        left: 50%;
    }
</style>