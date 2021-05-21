<template>
  <div class="skfx">
        <div class="data-left">
        <div>
            <button class="left-btn">疫情实时数据</button>
                <div class="data-left-title">
                    <span>地区</span>
                    <span class="current">现存</span>
                    <span class="total-case">累计</span>
                    <span class="total-death">死亡</span>
                </div>
                <div class="data-left-title intAll">
                    <span>国内总计</span>
                    <span class="current">{{currentConfirm}}</span>
                    <span class="total-case">{{totalConfirmed}}</span>
                    <span class="total-death">{{totalDeath}}</span>
                </div>
                <div class="data-left-title intInc">
                    <span>较上日</span>
                    <span class="current">{{incCountry.incCurConfirmedFlag+incCountry.incCurConfirmed}}</span>
                    <span class="total-case">{{incCountry.incConfirmedFlag+incCountry.incConfirmed}}</span>
                    <span class="total-death">{{incCountry.incDeathFlag+incCountry.incDeath}}</span>
                </div>
                <div class="data-scroll">
                    <div class="data2-head-name" v-for="item1 in provinceArray">
                        <div style="position: relative;"><span class="c-name">{{item1.childStatistic}}</span> <Icon type="md-arrow-dropdown" class="extend-arrow" /></div>
                        <div class="data-body" style="display: none;" v-for="item2 in item1.cityArray">
                            <span>{{item2.childStatistic}}</span>
                            <span class="current">{{item2.currentConfirm}}</span>
                            <span class="total-case">{{item2.totalConfirmed}}</span>
                            <span class="total-death">{{item2.totalDeath}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chart1"></div>
        <div class="chart1-nav">
                <div class="nav1 nav-active" @click="changeChart1('xcqz')" style="color:#fff">现存确诊</div>
                <div class="nav2" @click="changeChart1('zyl')">治愈率</div>
                <div class="nav3" @click="changeChart1('bsl')">病死率</div>
        </div>
        <div class="data-right">
            <div class="right-chart1"></div>
            <div class="right-chart2"></div>
            <div class="right-chart3"></div>
        </div>
        <div class="bottom-time">
            <p>{{currentTime}}</p>
        </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                currentTime: new Date(),
                chart1: null,
                option1:null,
                isChina:true,
                chart1Status:'现存确诊：',
                provinceArray: [],
                geoCoordMap:{},
                test:[],
                incCountry: {
                    incCurConfirmedFlag: null,
                    incCurConfirmed: null,
                    incConfirmedFlag: null,
                    incConfirmed: null,
                    incDeathFlag: null,
                    incDeath: null
                },
                currentConfirm: null,
                totalConfirmed: null,
                totalDeath: null
            }
        },
        methods: {
            changeChart1(status) {
                var that = this;
                var convertData = function(data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = that.geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value),
                            });
                        }
                    }
                    return res;
                };
                if (status == 'xcqz') {
                    $('.chart1-nav div').css('border-bottom', '3px solid #093ba5').css('color', '#ccc');
                    $('.nav1').css('border-bottom', '3px solid #07dce5').css('color', '#fff');
                    var mapData = [];
                    console.log(that.option1)
                    //确诊数据修改
                    for(let i=0;i<that.provinceArray.length;i++){
                        mapData.push({
                            name:that.provinceArray[i].childStatistic,
                            value:that.provinceArray[i].currentConfirm
                        })
                    }
                    mapData.push({
                        name:'台湾省',
                        value:that.provinceArray[0].currentConfirm
                    });
                    mapData.push({
                        name:'香港特别行政区',
                        value:that.provinceArray[1].currentConfirm
                    });
                    that.option1.series[0].data = convertData(mapData);
                    that.option1.series[1].data = mapData;
                    that.option1.series[2].data = convertData(mapData);
                    that.option1.series[3].data = convertData(mapData.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 5));
                    that.option1.visualMap.max = 100;
                    //悬浮提示修改
                    that.chart1Status = '现存确诊：';
                    //地图颜色映射修改
                    that.option1.visualMap.inRange.color = ['yellow', 'red'];
                    that.chart1.setOption(that.option1,true);
                }
                if (status == 'zyl') {
                    $('.chart1-nav div').css('border-bottom', '3px solid #093ba5').css('color', '#ccc');
                    $('.nav2').css('border-bottom', '3px solid #07dce5').css('color', '#fff');
                    //治愈数据修改
                    var mapData = [];
                    for(let i=0;i<that.provinceArray.length;i++){
                        mapData.push({
                            name:that.provinceArray[i].childStatistic,
                            value:(that.provinceArray[i].totalCured/that.provinceArray[i].totalConfirmed).toFixed(2)
                        })
                    }
                    mapData.push({
                        name:'台湾省',
                        value:(that.provinceArray[0].totalCured/that.provinceArray[0].totalConfirmed).toFixed(2)
                    });
                    mapData.push({
                        name:'香港特别行政区',
                        value:(that.provinceArray[1].totalCured/that.provinceArray[1].totalConfirmed).toFixed(2)
                    });
                    that.option1.series[0].data = convertData(mapData);
                    that.option1.series[1].data = mapData;
                    that.option1.series[2].data = convertData(mapData);
                    that.option1.series[3].data = convertData(mapData.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 5));
                    that.option1.visualMap.max = 1;
                    //悬浮提示修改
                    that.chart1Status = '治愈率：';
                    //地图颜色映射修改
                    that.option1.visualMap.inRange.color = ['#fff', 'green'];
                    that.chart1.setOption(that.option1,true);
                }
                if (status == 'bsl') {
                    $('.chart1-nav div').css('border-bottom', '3px solid #093ba5').css('color', '#ccc');
                    $('.nav3').css('border-bottom', '3px solid #07dce5').css('color', '#fff');
                    var option1 = this.chart1.getOption();
                    //病死数据修改
                    var mapData = [];
                    for(let i=0;i<that.provinceArray.length;i++){
                        mapData.push({
                            name:that.provinceArray[i].childStatistic,
                            value:(that.provinceArray[i].totalDeath/that.provinceArray[i].totalConfirmed).toFixed(2)
                        })
                    }
                    mapData.push({
                        name:'台湾省',
                        value:(that.provinceArray[0].totalDeath/that.provinceArray[0].totalConfirmed).toFixed(2)
                    });
                    mapData.push({
                        name:'香港特别行政区',
                        value:(that.provinceArray[1].totalDeath/that.provinceArray[1].totalConfirmed).toFixed(2)
                    });
                    that.option1.series[0].data = convertData(mapData);
                    that.option1.series[1].data = mapData;
                    that.option1.series[2].data = convertData(mapData);
                    that.option1.series[3].data = convertData(mapData.sort(function(a, b) {
                        return b.value - a.value;
                    }).slice(0, 5));
                    that.option1.visualMap.max = 0.1;
                    //地图颜色映射修改
                    that.option1.visualMap.inRange.color = ['#fff', '#111'];
                     //悬浮提示修改
                    that.chart1Status = '病死率：';
                    that.chart1.setOption(that.option1,true);
                }
            }
        },
        mounted() {
            var that = this;
            var chart1Data = [];
            $.getScript("https://cdn.mdeer.com/data/yqstaticdata.js?callback=callbackstaticdata&t=" + (+new Date));
            window.callbackstaticdata = function(res) {
                console.log(that.geoCoordMap)
                var chart1 = echarts.init(document.getElementsByClassName('chart1')[0]);
                $.getJSON('../../static/json/china.json', function(geoJson) {
                    console.log(geoJson);
                     echarts.registerMap('china', geoJson);
                    var mapData = [];
                    var convertData = function(data) {
                        var res = [];
                        for (var i = 0; i < data.length; i++) {
                            var geoCoord = that.geoCoordMap[data[i].name];
                            if (geoCoord) {
                                res.push({
                                    name: data[i].name,
                                    value: geoCoord.concat(data[i].value),
                                });
                            }
                        }
                        return res;
                    };
                    for (let i = 0; i < geoJson.features.length; i++) {
                        var value;
                        that.geoCoordMap[geoJson.features[i].properties.name] = geoJson.features[i].properties.center;
                    };
                    for(let i=0;i<res.provinceArray.length;i++){
                        mapData.push({
                            name:res.provinceArray[i].childStatistic,
                            value:res.provinceArray[i].currentConfirm
                        });
                    };
                    mapData.push({
                        name:'台湾省',
                        value:res.provinceArray[0].currentConfirm
                    });
                    mapData.push({
                        name:'香港特别行政区',
                        value:res.provinceArray[1].currentConfirm
                    });

                    that.option1 = { 
                        tooltip: {
                            textStyle: {
                                align: 'left'
                            },
                            trigger: 'item',
                            formatter: function(params) {
                                if(params.name==""){
                                    return;
                                }
                                if (typeof(params.value)[2] == "undefined") {
                                    return `<img src="../../static/img/city.png" width="20px" style="vertical-align: bottom;">` + ' ' + params.name + '<br>' + params.marker + that.chart1Status + params.value;
                                } else {
                                    return `<img src="../../static/img/city.png" width="20px" style="vertical-align: bottom;">` + ' ' + params.name + '<br>' + params.marker + that.chart1Status + params.value[2];
                                }
                            },
                        },
                        visualMap: {
                            show: true,
                            min: 0,
                            max:100,
                            color: 'white',
                            text: ['高', '低'], // 文本，默认为数值文本
                            calculable: true,
                            textStyle: {
                                color: "white"
                            },
                            seriesIndex: [1],
                            inRange: {
                                color: ['yellow', 'red']
                            }
                        },
                        geo: {
                            map: 'china', // 与引用进来的地图js名字一致
                            roam: false, // 禁止缩放平移
                            label: {
                                normal: { // 默认的文本标签显示样式
                                    show: false,
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            roam: true,
                            mapLocation: {
                                y: 60
                            },
                            layoutCenter: ['50%', '70%'],
                            layoutSize: 650,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#fff',
                                    borderWidth: 0.2,
                                    shadowColor: 'orange', //外发光
                                    shadowBlur: 4
                                },
                                emphasis: {
                                    areaColor: '#2B91B7',
                                }
                            },
                        },
                        series: [{ //地图映射1
                            name: '散点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(mapData),
                            symbolSize: function(val) {
                                return 5;
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    align: 'center',
                                    verticalAlign: 'top',
                                    show: true,
                                    color: '#fc6565'
                                },
                                emphasis: {
                                    // show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'turquoise'
                                }
                            }
                        }, { //地图映射2
                            type: 'map',
                            map: 'china',
                            geoIndex: 0,
                            animation: false,
                            layoutCenter: ['30%', '30%'],
                            // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                            layoutSize: 10,
                            data: mapData
                        }, { //气泡确诊数量点
                            name: '点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'pin', //气泡

                            symbolSize: function(val) {
                                if (val[2] == 0) {
                                    return 0;
                                }
                                return 40;
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 9,
                                    },
                                    formatter(value) {
                                        return value.data.value[2]
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'turquoise', //标志颜色
                                }
                            },
                            zlevel: 6,
                            data: convertData(mapData)
                        }, { //排名前五确诊数量点
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(mapData.sort(function(a, b) {
                                return b.value - a.value;
                            }).slice(0, 5)),
                            symbolSize: function(val) {
                                if (val[2] == 0) {
                                    return 0;
                                }
                                return 15;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    align: 'center',
                                    verticalAlign: 'top',
                                    show: true,
                                    color: 'red'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'turquoise',
                                    fontSize: 20
                                }
                            },
                            zlevel: 1
                        }]
                    };
                    chart1.setOption(that.option1);
                });
                that.chart1 = chart1;
                //获取国内数据模块及各图表数据
                that.provinceArray = res.provinceArray;
                that.currentConfirm = res.country.currentConfirm;
                that.totalConfirmed = res.country.totalConfirmed;
                that.totalDeath = res.country.totalDeath;
                that.incCountry = res.incCountry;


                let chart2_data = {
                    country: [],
                    totalConfirmed: [],
                    totalCured: [],
                    totalDeath: []
                };
                for (let i = 0; i < res.intTopTotalConfirm.length; i++) {
                    chart2_data.country.push(res.intTopTotalConfirm[i].childStatistic);
                    chart2_data.totalConfirmed.push(res.intTopTotalConfirm[i].totalConfirmed);
                    chart2_data.totalCured.push(res.intTopTotalConfirm[i].totalCured);
                    chart2_data.totalDeath.push(res.intTopTotalConfirm[i].totalDeath);
                }
                option2.xAxis.data = chart2_data.country;
                option2.series[0].data = chart2_data.totalConfirmed;
                option2.series[1].data = chart2_data.totalCured;
                option2.series[2].data = chart2_data.totalDeath;
                chart2.setOption(option2);
                let chart3_data = {
                    time: [],
                    sure_cnt: [],
                    cure_cnt: [],
                    die_cnt: []
                };
                let chart4_data = {
                    time: [],
                    sure_cnt: [],
                    cure_cnt: [],
                    die_cnt: []
                };
                for (let i = 0; i < res.trend.length; i++) {
                    chart3_data.time.push(res.trend[i].fullDay);
                    chart3_data.sure_cnt.push(res.trend[i].sure_cnt);
                    chart3_data.cure_cnt.push(res.trend[i].cure_cnt);
                    chart3_data.die_cnt.push(res.trend[i].die_cnt);
                }
                option3.xAxis.data = chart3_data.time;
                option3.series[0].data = chart3_data.sure_cnt;
                option3.series[1].data = chart3_data.cure_cnt;
                option3.series[2].data = chart3_data.die_cnt;
                chart3.setOption(option3);
                for (let i = 0; i < res.intTrend[0].trend.length; i++) {
                    chart4_data.time.push(res.intTrend[0].trend[i].day);
                    chart4_data.sure_cnt.push(res.intTrend[0].trend[i].sure_cnt);
                    chart4_data.cure_cnt.push(res.intTrend[0].trend[i].cure_cnt);
                    chart4_data.die_cnt.push(res.intTrend[0].trend[i].die_cnt);
                }
                option4.xAxis.data = chart4_data.time;
                option4.series[0].data = chart4_data.sure_cnt;
                option4.series[1].data = chart4_data.cure_cnt;
                option4.series[2].data = chart4_data.die_cnt;
                chart4.setOption(option4);
                
            };
            $(document).off('click','.data2-head-name');
            $(document).on('click', '.data2-head-name', function() { 
                console.log('触发点击事件！')
                if ($(this).children('.data-body').css('display') == 'none') {
                    console.log(1)
                    $(this).children('.data-body').css('display', 'flex');
                    $(this).children('div').children('.extend-arrow').css('transform', 'rotate(-90deg) translateY(-50%)');
                } else {
                     console.log(2)
                    $(this).children('.data-body').css('display', 'none');
                    $(this).children('div').children('.extend-arrow').css('transform', 'rotate(0deg) translateY(-50%)');
                }
            });
            var chart1 = echarts.init(document.getElementsByClassName('chart1')[0]);
            var option2 = {
                title: {
                    text: '典型国家疫情状况',
                    textStyle: {
                        color: 'white',
                        fontSize: 13
                    },
                    x: 'center',
                    y: '2%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    textStyle: {
                        align: 'left'
                    }
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '0%',
                    top: '20%',
                    containLabel: true
                },
                legend: {
                    data: ['累计确诊', '累计治愈', '累计死亡'],
                    top: 20,
                    textStyle: {
                        color: "#fff"
                    },
                    itemWidth: 12,
                    itemHeight: 10,
                    // itemGap: 35
                },
                xAxis: {
                    type: 'category',
                    data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
                    axisLine: {
                        lineStyle: {
                            color: 'white'

                        }
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            fontFamily: 'Microsoft YaHei',
                            fontSize: 10
                        }
                    },
                },

                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.3)'
                        }
                    },
                    axisLabel: {
                        formatter: function(params) {
                            return params / 10000000;
                        },
                    }
                },
                series: [{
                    name: '累计确诊',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fccb05'
                            }, {
                                offset: 1,
                                color: '#f5804d'
                            }]),
                            barBorderRadius: 12,
                        },
                    },
                    data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
                }, {
                    name: '累计治愈',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#8bd46e'
                            }, {
                                offset: 1,
                                color: '#09bcb7'
                            }]),
                            barBorderRadius: 11,
                        }

                    },
                    data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
                }, {
                    name: '累计死亡',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#248ff7'
                            }, {
                                offset: 1,
                                color: '#6851f1'
                            }]),
                            barBorderRadius: 11,
                        }
                    },
                    data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
                }]
            };
            const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
            var option3 = {
                title: {
                    text: '国内疫情发展折线图',
                    textStyle: {
                        color: 'white',
                        fontSize: 13
                    },
                    x: 'center',
                    y: '2%'
                },
                legend: {
                    data: ['累计确诊', '累计治愈', '累计死亡'],
                    top: 20,
                    textStyle: {
                        color: "#fff"
                    },
                    itemWidth: 12,
                    itemHeight: 10,
                    // itemGap: 35
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '3%',
                    top: '20%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    textStyle: {
                        align: 'left'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: 'white'

                        }
                    },
                    axisLabel: {
                        // interval: 0,
                        rotate: 0,
                        textStyle: {
                            fontFamily: 'Microsoft YaHei',
                            fontSize: 10
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.3)'
                        }
                    },
                    axisLabel: {
                        formatter: function(params) {
                            return params / 10000;
                        },
                    }
                },
                series: [{
                    name: '累计确诊',
                    type: 'line',
                    data: [10, 10, 30, 12, 15, 3, 7],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: true,
                    yAxisIndex: 0,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#9effff'
                        }, {
                            offset: 1,
                            color: '#9E87FF'
                        }]),
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[0],
                            borderColor: colorList[0]
                        }
                    }
                }, {
                    name: '累计治愈',
                    type: 'line',
                    data: [5, 12, 11, 14, 25, 16, 10],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
                            offset: 0,
                            color: '#73DD39'
                        }, {
                            offset: 1,
                            color: '#73DDFF'
                        }]),
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[1],
                            borderColor: colorList[1]
                        }
                    }
                }, {
                    name: '累计死亡',
                    type: 'line',
                    data: [150, 120, 170, 140, 500, 160, 110],
                    symbolSize: 1,
                    symbol: 'circle',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#fe9a'
                        }, {
                            offset: 1,
                            color: '#fe9a8b'
                        }]),
                    },
                    itemStyle: {
                        normal: {
                            color: colorList[2],
                            borderColor: colorList[2]
                        }
                    }
                }]
            };
            var chart2 = echarts.init(document.getElementsByClassName('right-chart1')[0]);
            var chart3 = echarts.init(document.getElementsByClassName('right-chart2')[0]);
            let color = [
                "#FF0000",
                "#00CA69",
                "#999999"
            ];

            let xAxisData = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            let yAxisData1 = [100, 138, 187, 173, 180, 150, 180, 230, 213, 200, 178, 169];
            let yAxisData2 = [45, 23, 14, 34, 22, 56, 44, 12, 67, 87, 43, 32];
            let yAxisData3 = [145, 123, 114, 134, 122, 156, 144, 112, 167, 187, 143, 132];

            const hexToRgba = (hex, opacity) => {
                let rgbaColor = "";
                let reg = /^#[\da-f]{6}$/i;
                if (reg.test(hex)) {
                    rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt("0x" + hex.slice(3, 5))},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
                }
                return rgbaColor;
            }
            var option4 = {
                title: {
                    text: '国外疫情发展曲线图',
                    textStyle: {
                        color: 'white',
                        fontSize: 13
                    },
                    x: 'center',
                    y: '2%'
                },
                color: color,
                legend: {
                    data: ['累计确诊', '累计治愈', '累计死亡'],
                    top: 20,
                    textStyle: {
                        color: "#fff"
                    },
                    itemWidth: 12,
                    itemHeight: 10,
                    // itemGap: 35
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    bottom: '3%',
                    top: '22%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    axisLine: {
                        lineStyle: {
                            color: 'white'

                        }
                    },
                    axisLabel: {
                        // interval: 0,
                        rotate: 0,
                        textStyle: {
                            fontFamily: 'Microsoft YaHei',
                            fontSize: 10
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.3)'
                        }
                    },
                    axisLabel: {
                        formatter: function(params) {
                            return params / 10000000;
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    textStyle: {
                        align: 'left'
                    }
                },
                series: [{
                    // name: "2018",
                    name: "累计确诊",
                    type: "line",
                    smooth: true,
                    symbolSize: 8,
                    zlevel: 3,
                    lineStyle: {
                        normal: {
                            color: color[0],
                            shadowBlur: 3,
                            shadowColor: hexToRgba(color[0], 0.5),
                            shadowOffsetY: 8
                        }
                    },
                    symbol: 'circle', //数据交叉点样式
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1, [{
                                    offset: 0,
                                    color: hexToRgba(color[0], 0.3)
                                }, {
                                    offset: 1,
                                    color: hexToRgba(color[0], 0.1)
                                }],
                                false
                            ),
                            shadowColor: hexToRgba(color[0], 0.1),
                            shadowBlur: 10
                        }
                    },
                    data: yAxisData1
                }, {
                    name: "累计治愈",
                    type: "line",
                    smooth: true,
                    symbolSize: 8,
                    zlevel: 3,
                    lineStyle: {
                        normal: {
                            color: color[1],
                            shadowBlur: 3,
                            shadowColor: hexToRgba(color[1], 0.5),
                            shadowOffsetY: 8
                        }
                    },
                    symbol: 'circle', //数据交叉点样式 (实心点)
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1, [{
                                    offset: 0,
                                    color: hexToRgba(color[1], 0.3)
                                }, {
                                    offset: 1,
                                    color: hexToRgba(color[1], 0.1)
                                }],
                                false
                            ),
                            shadowColor: hexToRgba(color[1], 0.1),
                            shadowBlur: 10
                        }
                    },
                    data: yAxisData2
                }, {
                    name: "累计死亡",
                    type: "line",
                    smooth: true,
                    symbolSize: 8,
                    zlevel: 3,
                    lineStyle: {
                        normal: {
                            color: color[2],
                            shadowBlur: 3,
                            shadowColor: hexToRgba(color[2], 0.5),
                            shadowOffsetY: 8
                        }
                    },
                    symbol: 'circle', //数据交叉点样式 (实心点)
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1, [{
                                    offset: 0,
                                    color: hexToRgba(color[2], 0.3)
                                }, {
                                    offset: 1,
                                    color: hexToRgba(color[2], 0.1)
                                }],
                                false
                            ),
                            shadowColor: hexToRgba(color[2], 0.1),
                            shadowBlur: 10
                        }
                    },
                    data: yAxisData3
                }]
            };
            var chart4 = echarts.init(document.getElementsByClassName('right-chart3')[0]);
        }
    }
</script>

<style scoped>
    body::-webkit-scrollbar {
        /*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
        width: 5px;
        border-radius: 10rem;
        background: var(--bg-darkColor);
    }
    
    .skfx {
        position: absolute;
        height: 100%;
        width: 100%;
        background: #051b4a;
        top: 0;
        left: 0;
        overflow:hidden !important;
    }
    
    .chart1 {
        position: fixed;
        width: 58%;
        height: 70%;
        left: 21%;
        top: 80px;
        padding: 5px;
        background: url(../assets/data-center.png);
        background-size: 100% 100%;
        z-index: 1;
    }
    
    .data-left {
        position: absolute;
        height: 90%;
        top: 8%;
        width: 20%;
        left: 0%;
        background: rgba(41, 41, 114, 0.164);
        overflow: hidden;
        padding: 5px;
        background: url(../assets/data-left.png);
        background-size: 100% 100%;
    }
    
    .data-left-title,
    .data-body {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    
    .data-left-title,
    .data2-head-name {
        width: 90% !important;
        margin-left: 5% !important;
    }
    
    .data-left-title {
        margin: 5px;
        margin-top: 8px;
        font-weight: bold;
        background-image: linear-gradient(to left, #355288, #0f378f);
        box-shadow: 0 0 1px 1px #00b7a6;
    }
    
    .data2-head-name {
        text-align: left;
        position: relative;
        background: linear-gradient(to left, #355288, #0f378f);
        margin-top: 10px;
        border-top-left-radius: 10px;
        box-shadow: 0 0 1px 1px #00b7a6;
        border-bottom-right-radius: 10px;
        width: 96%;
        margin-left: 2%;
    }
    
    .data-left span {
        display: inline-block;
        width: 25%;
        text-align: center;
        padding: 2px;
        font-size: 14px;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    
    .extend-arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        transform-origin: 50% 0%;
    }
    
    .data-left-title span {
        margin-top: 6px;
        margin-bottom: 6px;
    }
    
    .c-name {
        padding: 10px !important;
        font-size: 15px !important;
        transition: all 0.2s ease;
    }
    
    .intAll span,
    .intInc span {
        font-size: 12px;
    }
    
    .data2-head-name>div {
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .data2-head-name>div:hover .c-name {
        color: #fff;
    }
    
    .data-body span {
        font-size: 13px !important;
        margin-top: 8px;
        margin-bottom: 8px;
    }
    
    .current {
        color: turquoise;
    }
    
    .total-case {
        color: orange;
    }
    
    .total-death {
        color: rgb(98, 98, 255);
    }
    
    .data-left::-webkit-scrollbar {
        display: none;
    }
    
    .left-btn {
        background: none;
        border: none;
        background-image: url(../assets/btn-bg.png);
        background-size: 100% 100%;
        width: 230px;
        height: 40px;
        padding-bottom: 7px;
        position: relative;
        color: white;
        outline: none;
        color: turquoise;
        font-weight: 1000;
        opacity: 0.9;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    
    .data-right {
        position: absolute;
        width: 20%;
        right: 0;
        height: 90%;
        top: 8%;
        background: url(../assets/data-left.png);
        background-size: 100% 100%;
    }
    
    .right-chart1 {
        position: absolute;
        height: 32%;
        width: 94%;
        left: 3%;
        top: 2%;
        background: url(../assets/data-center.png);
        background-size: 100% 100%;
    }
    
    .right-chart2 {
        position: absolute;
        height: 32%;
        width: 94%;
        left: 3%;
        top: 35%;
        background: url(../assets/data-center.png);
        background-size: 100% 100%;
    }
    
    .bottom-time {
        position: absolute;
        width: 30%;
        height: 70px;
        bottom: 0;
        left: 35%;
        border: 2px solid #072a75;
        border-bottom: none;
        background: rgba(0, 0, 0, 0.2);
        font-size: 16px;
        line-height: 70px;
    }
    
    .right-chart3 {
        position: absolute;
        height: 30%;
        width: 94%;
        left: 3%;
        top: 68%;
        background: url(../assets/data-center.png);
        background-size: 100% 100%;
    }
    
    .nav1 {
        position: absolute;
        top: calc(70% + 79px);
        left: calc(50% - 120px);
        transform: translateX(-50%);
        height: 42px;
        line-height: 40px;
        width: 100px;
        background: rgba(0, 0, 0, 0.164);
        border: 1px solid #093ba5;
        z-index: 0;
        border-bottom: 3px solid #093ba5;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }
    
    .nav2 {
        position: absolute;
        top: calc(70% + 79px);
        left: calc(50% - 10px);
        transform: translateX(-50%);
        height: 42px;
        line-height: 40px;
        width: 100px;
        background: rgba(0, 0, 0, 0.164);
        border: 1px solid #093ba5;
        z-index: 0;
        border-bottom: 3px solid #093ba5;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }
    
    .nav3 {
        position: absolute;
        top: calc(70% + 79px);
        left: calc(50% + 100px);
        transform: translateX(-50%);
        height: 42px;
        line-height: 40px;
        width: 100px;
        background: rgba(0, 0, 0, 0.164);
        border: 1px solid #093ba5;
        z-index: 0;
        border-bottom: 3px solid #093ba5;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }
    
    
    .chart1-nav>div {
        transition: all 0.2s ease;
        color: #ccc;
    }
    
    .chart1-nav>div:hover {
        border-bottom: 3px solid #07dce5 !important;
        color: #fff !important;
    }
    
   
    .data-scroll{
        overflow-y:scroll;
        height: 420px;
        margin-top:-5px;
        padding-bottom:10px;
    }
    .data-scroll::-webkit-scrollbar{
        display:none;
    }
     .nav-active {
        border-bottom: 3px solid #07dce5;
        color: #fff;
    }
</style>