<template>
    <div>
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
            var uploadedDataURL = 'http://geo.datav.aliyun.com/areas/bound/100000_full.json';
            var geoCoordMap = {};
            var data = [];
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
            var option1 = {
                backgroundColor: '#051b4a',
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if (typeof(params.value)[2] == "undefined") {
                            return params.name + '<br>现存确诊: ' + params.value;
                        } else {
                            return params.name + '<br>现存确诊: ' + params.value[2];
                        }
                    }
                },

                //视觉映射组件
                visualMap: {
                    min: 0,
                    max: 50,
                    show: true,
                    min: 0,
                    color: 'white',
                    left: '22%',
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
                    layoutCenter: ['50%', '65%'],
                    // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
                    layoutSize: '120%',
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
                    }, { //气泡确诊数量点 --（未起作用）
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
                    }, { //排名前五确诊数量点 --（未起作用）
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
                    }

                ]
            };
            // this.$Loading.finish();
            let myChart1 = echarts.init(document.getElementById('myChart1'));
            this.axios({
                method:'GET',
                type:'JSON',
                url:uploadedDataURL
            }).then((res)=>{
                let geoJson = res.data;
                echarts.registerMap('china', geoJson);
                for (let i = 0; i < geoJson.features.length; i++) {
                    geoCoordMap[geoJson.features[i].properties.name] = geoJson.features[i].properties.center;
                    data.push({
                        name: geoJson.features[i].properties.name,
                        //现存确诊数据接口
                        value: Math.floor(Math.random(10)*50)
                    });
                }
                console.log(data);
                console.log(geoCoordMap);
                myChart1.setOption(option1);
                console.log(myChart1.getOption());
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
        width:100%;
        height:600px;
        background: #eee;
    }
</style>