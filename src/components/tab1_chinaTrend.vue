<template>
    <div class="china-trend">
        <div id="myChart1"></div>
        <div id="myChart2"></div>
        <div id="myChart3"></div>
        <div class="rl-set">
            <span class="rl-qz set-active1" @click="changeRlStatus('sure_cnt','确诊')">新增确诊</span>
            <span class="rl-zy" @click="changeRlStatus('cure_cnt','治愈')">新增治愈</span>
            <span class="rl-sw" @click="changeRlStatus('die_cnt','死亡')">新增死亡</span>
        </div>
    </div>
</template>
<script>
    import data2020 from '../../static/js/data2020.js';
    export default {
        data() {
            return {
                yqData: {},
                rl_status: '确诊',
                myChart3: null,
                option3: null
            }
        },
        methods: {
            changeRlStatus(projectItem, msg) {
                var that = this;
                this.rl_status = msg;
                var getVirtulData = function(year, projectItem) {
                    year = year || '2021';
                    var date = +echarts.number.parseDate(year + '-01-01');
                    var end = +echarts.number.parseDate((+year + 1) + '-01-01');
                    var dayTime = 3600 * 24 * 1000;
                    var data = [];
                    for (var time = date, i = 0; time < end; time += dayTime, i++) {
                        data.push([
                            echarts.format.formatTime('yyyy-MM-dd', time),
                            data2020.yearIncData[i][projectItem]
                        ]);
                    }
                    return data;
                }
                this.option3.series.data = getVirtulData(2020, projectItem);
                if(msg=="确诊"){
                    that.option3.visualMap.max = 1000;
                    that.option3.visualMap.inRange.color =  ['#f6efa6', '#bf444c'];
                    $('.rl-qz').addClass('set-active1');
                    $('.rl-zy').removeClass('set-active2');
                    $('.rl-sw').removeClass('set-active3');
                }
                if(msg=="治愈"){
                    that.option3.visualMap.max = 1000;
                    that.option3.visualMap.inRange.color =  ['#f6efa6', 'green'];
                    $('.rl-qz').removeClass('set-active1');
                    $('.rl-zy').addClass('set-active2');
                    $('.rl-sw').removeClass('set-active3');
                }
                if(msg=="死亡"){
                    that.option3.visualMap.max = 100;
                    that.option3.visualMap.inRange.color =  ['#f6efa6', '#333'];
                    $('.rl-qz').removeClass('set-active1');
                    $('.rl-zy').removeClass('set-active2');
                    $('.rl-sw').addClass('set-active3');
                }
                this.myChart3.setOption(this.option3);
            }
        },
        beforeCreate() {
            this.$Loading.start();
        },
        mounted() {
            var that = this;
            console.log(data2020.yearIncData);
            console.log(data2020.monthIncData);
            this.$Loading.finish();
            var myChart1 = echarts.init(document.getElementById('myChart1'));
            var myChart2 = echarts.init(document.getElementById('myChart2'));
            that.myChart3 = echarts.init(document.getElementById('myChart3'));
            var monthLen = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var monthFirstIndex = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
            var getVirtulData = function(year, projectItem) {
                year = year || '2021';
                var date = +echarts.number.parseDate(year + '-01-01');
                var end = +echarts.number.parseDate((+year + 1) + '-01-01');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                for (var time = date, i = 0; time < end; time += dayTime, i++) {
                    data.push([
                        echarts.format.formatTime('yyyy-MM-dd', time),
                        data2020.yearIncData[i][projectItem]
                    ]);
                }
                return data;
            }
            var addOption1 = function(firstIndex, len, month) {
                return {
                    title: {
                        text: '2020年各月新增数据动态演示图（' + (parseInt(month) + 1) + '月）',
                        left: 'center',
                        top: 100,
                        textStyle: {
                            color: 'white'
                        }
                    },
                    tooltip: {
                        show: true,
                        formatter: `<img src="./static/img/time.png" width="20px" style="vertical-align: bottom">
                        时间:{b}<br>
                        <img src="./static/img/cured.png" width="20px" style="vertical-align: bottom">
                        {a1}:{c1}<br>
                        <img src="./static/img/sure.png" width="20px" style="vertical-align: bottom">
                        {a0}:{c0}<br>
                        <img src="./static/img/death.png" width="20px" style="vertical-align: bottom">
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
                        data: (function() {
                            let a = [];
                            for (let i = firstIndex; i < firstIndex + len; i++) {
                                a.push(data2020.yearIncData[i].day);
                            }
                            return a;
                        })(),
                    }],

                    yAxis: [{
                        type: 'value',
                        min: 0,
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
                            for (let i = firstIndex; i < firstIndex + len; i++) {
                                a.push(data2020.yearIncData[i].sure_cnt);
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
                            for (let i = firstIndex; i < firstIndex + len; i++) {
                                a.push(data2020.yearIncData[i].cure_cnt);
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
                            for (let i = firstIndex; i < firstIndex + len; i++) {
                                a.push(data2020.yearIncData[i].die_cnt);
                            }
                            return a;
                        })(),
                    }]
                }
            }
            var timeOption1 = {
                baseOption: {
                    timeline: {
                        width: '80%',
                        bottom: "5%",
                        left: 'center',
                        axisType: 'category',
                        autoPlay: true,
                        playInterval: 2000,
                        animation: true,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                        label: {
                            color: "white"
                        },
                        controlStyle: {
                            color: "white",
                            borderColor: "white"
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
                        tooltip: {
                            show: false
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
                    text: '2020年全年新增确诊人数与新增治愈人数关系图（日统）',
                    left: 'center',
                    top: '26%',
                    textStyle: {
                        size: 10,
                        color: 'white',
                    }
                },
                grid: {
                    top: '40%',
                    bottom: '15%',
                },
                tooltip: {
                    trigger: 'axis',
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
                    end: 30,
                    height: 20,
                    textStyle: {
                        color: "white"
                    }
                }, {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 10,
                }],
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "white"
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: "white"
                        }
                    },
                    data: (function() {
                        let a = [];
                        for (let i = 0; i < 366; i++) {
                            a.push(data2020.yearIncData[i].day);
                        }
                        return a;
                    })()

                }],
                yAxis: [{
                    name: '新增治愈(人)',
                    type: 'value',
                    max: 4000,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "white"
                        }
                    }
                }, {
                    name: '新增确诊(人)',
                    nameLocation: 'start',
                    type: 'value',
                    max: 4000,
                    inverse: true,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "white"
                        }
                    },
                }],
                series: [{
                    name: '新增治愈',
                    type: 'line',
                    symbolSize: 0,
                    areaStyle: {
                        color: '#00ca95'
                    },
                    lineStyle: {
                        width: 0,
                        color: "#00ca95"
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: (function() {
                        let a = [];
                        for (let i = 0; i < 366; i++) {
                            a.push(data2020.yearIncData[i].cure_cnt);
                        }
                        return a;
                    })()
                }, {
                    name: '新增确诊',
                    type: 'line',
                    symbolSize: 0,
                    yAxisIndex: 1,
                    areaStyle: {
                        color: '#fc6565',
                    },
                    lineStyle: {
                        width: 0,
                        color: "#fc6565"
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: (function() {
                        let a = [];
                        for (let i = 0; i < 366; i++) {
                            a.push(data2020.yearIncData[i].sure_cnt);
                        }
                        return a;
                    })()
                }]
            }
            that.option3 = {
                title: {
                    top: 30,
                    left: 'center',
                    text: '2020年全年新增确诊数日历图（日统）',
                    textStyle: {
                        color: 'white'
                    }
                },
                tooltip: {
                    formatter: function(params) {
                        return params.marker + params.data[0] + '<br>新增' + that.rl_status + '人数：' + params.data[1] + '人';
                    },
                    textStyle: {
                        align: 'left'
                    }
                },
                visualMap: {
                    min: 0,
                    max: 1000,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '20%',
                    textStyle: {
                        color: "white"
                    },
                    inRange: {
                        color: ['#f6efa6', '#bf444c']
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
                    dayLabel: {
                        color: "#fff"
                    },
                    monthLabel: {
                        color: 'white'
                    }
                },
                series: {
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data: getVirtulData(2020, 'sure_cnt')
                }
            }
            for (let i = 0; i < 12; i++) {
                timeOption1.options.push(addOption1(monthFirstIndex[i], monthLen[i], i));
            }
            myChart1.setOption(timeOption1);
            myChart2.setOption(option2);
            that.myChart3.setOption(that.option3);
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
        top: 55%;
        left: 50%;
    }
    
    .rl-set {
        position: absolute;
        bottom: 0;
        right: 25%;
        transform: translateX(50%);
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    
    .rl-set span {
        cursor: pointer;
        display: inline-block;
        height: 45px;
        line-height: 45px;
        width: 100px;
        font-size: 14px;
        border-top: 3px solid #ddd;
        color: #ddd;
        font-weight: bold;
        transition: all 0.1s linear;
    }
    
    .rl-set span:nth-of-type(1) {
        background: rgba(177, 52, 30, 0.432);
    }
    
    .rl-set span:nth-of-type(1):hover {
        background: rgb(219, 62, 34) !important;
        color: #fff !important;
        border-top: 3px solid #fff !important;
    }
    
    .rl-set span:nth-of-type(2) {
        background: rgba(47, 160, 53, 0.274);
    }
    
    .rl-set span:nth-of-type(2):hover {
        background: rgba(47, 160, 53, 0.753) !important;
        color: #fff !important;
        border-top: 3px solid #fff !important;
    }
    
    .rl-set span:nth-of-type(3) {
        background: rgba(128, 128, 128, 0.356);
    }
    
    .rl-set span:nth-of-type(3):hover {
        background: rgba(128, 128, 128, 0.76) !important;
        color: #fff !important;
        border-top: 3px solid #fff !important;
    }
    
    .set-active1 {
        color: #fff !important;
        border-top: 3px solid #fff !important;
        background: rgb(219, 62, 34) !important;
    }
    .set-active2 {
        color: #fff !important;
        border-top: 3px solid #fff !important;
       background: rgba(47, 160, 53, 0.753) !important;
    }
    .set-active3 {
        color: #fff !important;
        border-top: 3px solid #fff !important;
        background: rgba(128, 128, 128, 0.76) !important;
    }
</style>m