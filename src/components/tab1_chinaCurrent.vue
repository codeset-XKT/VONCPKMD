<template>
    <div class="china-current">
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
        mounted() {
            let that = this;
            //option基础配置项
            var uploadedDataURL = 'http://geo.datav.aliyun.com/areas/bound/100000_full.json';
            var geoCoordMap = {};
            var mapData = [];
            var barData_val = [];
            var barData_name = [];
            var colors = ["#1DE9B6", "#EEDD78", "#32C5E9", "#FFDB5C", "#37A2DA", "#04B9FF"];
            this.$Loading.finish();
            let myChart1 = echarts.init(document.getElementById('myChart1'));

            //请求地图json数据
            this.axios({
                method: 'GET',
                type: 'JSON',
                url: uploadedDataURL
            }).then((res) => {
                let geoJson = res.data;
                echarts.registerMap('china', geoJson);
                //生成mapData和barData
                for (let k = 0; k < 10; k++) {
                    let data = [];
                    let x = [];
                    let y = [];
                    for (let i = 0; i < geoJson.features.length; i++) {
                        let value = Math.floor(Math.random(10) * 30);
                        geoCoordMap[geoJson.features[i].properties.name] = geoJson.features[i].properties.center;
                        data.push({
                            name: geoJson.features[i].properties.name,
                            //现存确诊数据接口
                            value: value
                        });
                        x.push(value);
                        y.push(geoJson.features[i].properties.name);
                    }
                    mapData.push(data);
                    barData_name.push(y);
                    barData_val.push(x);
                }
                console.log(barData_name);
                console.log(barData_val);


                //定义在内部的函数，防止异步请求不到该函数形成的数据
                var convertData = function(data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value),
                            });
                        }
                    }
                    return res;
                };
                var optionTimeLine = {
                        baseOption: {
                            timeline: {
                                bottom: 0,
                                axisType: 'category',
                                autoPlay: true,
                                playInterval: 2000,
                                animation: true,
                                data: ['2019-12', '2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09'],
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
                                label: {
                                    formatter: function(s) {
                                        return (new Date(s)).getFullYear();
                                    }
                                },
                                title: {
                                    subtext: '数据来自国家统计局'
                                },
                            },
                            tooltip: {
                                textStyle:{
                                    align:'left'
                                },
                                trigger: 'item',
                                formatter: function(params) {
                                    if (typeof(params.value)[2] == "undefined") {
                                        return `<img src="../../static/img/city.png" width="20px" style="vertical-align: bottom;">` + ' ' + params.name + '<br>' + params.marker + ' 现存确诊: ' + params.value;
                                    } else {
                                        return `<img src="../../static/img/city.png" width="20px" style="vertical-align: bottom;">` + ' ' + params.name + '<br>' + params.marker + ' 现存确诊: ' + params.value[2];
                                    }
                                },
                            },
                            //视觉映射组件
                            visualMap: {
                                min: 0,
                                max: 50,
                                show: true,
                                min: 0,
                                color: 'white',
                                left: '5%',
                                bottom: '15',
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

                            //地图组件
                            geo: {
                                show: true,
                                // --- //
                                map: 'china',
                                layoutCenter: ['30%', '65%'],
                                // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                                layoutSize: '130%',
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        areaColor: '#031525',
                                        borderColor: '#fff',
                                        shadowColor: 'orange', //外发光
                                        shadowBlur: 8
                                    },
                                    emphasis: {
                                        areaColor: '#2B91B7',
                                    }
                                }
                            },
                            grid: {
                                left: 1000,
                                top: 15,
                                bottom: 100
                            },
                            xAxis: {
                                type: 'value',
                                scale: true,
                                position: 'top',
                                realtimeSort:true,
                                min: 0,
                                boundaryGap: false,
                                splitLine: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    margin: 1,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                            },
                        },
                        options: []
                    }
                    //生成时间轴option1
                var addOption1 = function(data,y,x,i) {
                        return {
                            yAxis: {
                                type: 'category',
                                nameGap: 16,
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#ddd'
                                    }
                                },
                                axisTick: {
                                    show: false,
                                    lineStyle: {
                                        color: '#ddd'
                                    }
                                },
                                axisLabel: {
                                    interval: 0,
                                    textStyle: {
                                        color: '#ddd'
                                    }
                                },
                                data: y
                            },
                            //序列
                            series: [{ //地图映射1
                                    name: '散点',
                                    type: 'scatter',
                                    coordinateSystem: 'geo',
                                    data: convertData(data),
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
                                    data: data
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
                                    data: convertData(data)
                                }, { //排名前五确诊数量点
                                    name: 'Top 5',
                                    type: 'effectScatter',
                                    coordinateSystem: 'geo',
                                    data: convertData(data.sort(function(a, b) {
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
                                }, {
                                    zlevel: 1.5,
                                    type: 'bar',
                                    barMaxWidth: 8,
                                    symbol: 'none',
                                    itemStyle: {
                                        left: 500,
                                        normal: {
                                            color: function(params) {
                                                var colorList = [  //设置颜色
                                                    "#1DE9B6", "#EEDD78", "#32C5E9", "#FFDB5C", "#37A2DA", "#04B9FF",
                                                    "#1DE9B6", "#EEDD78", "#32C5E9", "#FFDB5C", "#37A2DA", "#04B9FF",
                                                    "#1DE9B6", "#EEDD78", "#32C5E9", "#FFDB5C", "#37A2DA", "#04B9FF",
                                                    "#1DE9B6", "#EEDD78", "#32C5E9", "#FFDB5C", "#37A2DA", "#04B9FF",
                                                    "#1DE9B6", "#EEDD78", "#32C5E9", "#FFDB5C", "#37A2DA", "#04B9FF",
                                                    "#1DE9B6", "#EEDD78", "#32C5E9", "#FFDB5C", "#37A2DA", "#04B9FF"
                                                ];
                                                return colorList[params.dataIndex]
                                            },
                                            barBorderRadius: [0, 30, 30, 0]
                                        }
                                    },
                                    // x轴值数据和y轴位置数据不匹配
                                    data: x
                                }

                            ]
                        }
                    }
                    //渲染时间轴上的数据
                for (let i = 0; i < 10; i++) {
                    optionTimeLine.options.push(addOption1(mapData[i],barData_name[i],barData_val[i], i));
                }
                //渲染数据
                myChart1.setOption(optionTimeLine);

            });

            // this.axios({
            //     method: "GET",
            //     url: 'http://ncovdata.market.alicloudapi.com/ncov/cityDiseaseInfoWithTrend', //全国实时疫情数据
            //     headers: {
            //         "Authorization": "APPCODE eff8274606204ce7b52fc0d8680190f1",
            //     }
            // }).then((res) => {
            //     that.yqData = res.data;
            //     console.log(that.yqData);
            // })
        }
    }
</script>

<style scoped>
    h1 {
        text-align: center !important;
        margin-top: 40px
    }
    
    #myChart1 {
        width: 100%;
        height: 620px;
    }
</style>