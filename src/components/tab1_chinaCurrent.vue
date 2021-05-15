<template>
    <div class="china-current">
        </span>
        <div id="myChart1"></div>
        <div class="optionSet animated fadeInRight">
            <h2><img src='../assets/set.png' width="25px" style="vertical-align:middle;margin-bottom:3px"> 动态演示配置面板</h2>
            <p><img src='../assets/project.png' width="18px" style="vertical-align:middle;margin-bottom:3px"> 演示项目：</p>
            <Select v-model="catalogue" style="width:100px">
                <Option v-for="item in itemList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <p><img src='../assets/bc.png' width="20px" height="20px" style="vertical-align:middle;margin-bottom:3px;margin-right:2px">演示步长：</p>
            <Select v-model="step" style="width:100px">
                <Option v-for="item in stepList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <p><img src='../assets/qzsj.png' width="20px" style="vertical-align:middle;margin-bottom:3px;margin-right:2px">起止时间：</p>
            <DatePicker  :value="dayScale" @on-change="dayScale=$event" format="yyyy-MM-dd" type="daterange" confirm placement="bottom-end" placeholder="Select date" style="width: 200px" v-if="step=='日'"></DatePicker>
            <div class="monthSelect" v-else>
                <Select v-model="monthFirst" style="width:100px" placeholder="1月">
                    <Option v-for="(item,index) in 12" :value ="item" :key="index">{{ item }}月</Option>
                </Select>
                <Select v-model="monthEnd" style="width:100px" placeholder="12月">
                    <Option v-for="(item,index) in 12" :value ="item" :key="index">{{ item }}月</Option>
                </Select>
            </div>
            <p><img src='../assets/ld2.png' width="18px" style="vertical-align:middle;margin-bottom:3px"> 演示速度：</p>
            <Input v-model="speed" placeholder="单位为ms" style="width: 100px" />
            <p><img src='../assets/ys.png' width="20px" height="20px" style="vertical-align:middle;margin-bottom:3px"> 地图颜色映射区间：</p>
            <div v-if="catalogue=='新增确诊'">
                <ColorPicker v-model="lowColor1" alpha />
                <ColorPicker v-model="highColor1" alpha />
            </div>
            <div v-if="catalogue=='新增治愈'">
                <ColorPicker v-model="lowColor2" alpha />
                <ColorPicker v-model="highColor2" alpha />
            </div>
            <div v-if="catalogue=='新增死亡'">
                <ColorPicker v-model="lowColor3" alpha />
                <ColorPicker v-model="highColor3" alpha />
            </div>
            <div style="margin-top:20px"><Button type="info" @click="optionsChange" style="width:120px"><Icon type="md-pulse" /> 开始演示</Button></div>
        </div>
    </div>
</template>
<script>
    import provinceData from '../../static/js/incProvince2020.js'
    export default {
        data() {
            return {
                itemList: [{
                    value: '新增确诊',
                    label: '新增确诊'
                }, {
                    value: '新增治愈',
                    label: '新增治愈'
                }, {
                    value: '新增死亡',
                    label: '新增死亡'
                }],
                stepList: [{
                    value: '月',
                    label: '月'
                }, {
                    value: '日',
                    label: '日'
                }],
                daylyData:{},
                monthlyData:{},
                myChart1: null,
                geoCoordMap:{},
                optionTimeLine:{},
                speed: 2000,
                catalogue: '新增确诊',
                step: '月',
                item: '新增确诊',
                monthFirst: 1,
                monthEnd: 12,
                dayScale:['2020-02-01', '2020-03-01'],
                lowColor1: 'yellow',
                highColor1: 'red',
                lowColor2: '#fff',
                highColor2: 'green',
                lowColor3: '#fff',
                highColor3: '#111',
            }
        },
        methods: {
            getDayIndex(mon,day){
                let num=0
                switch (mon-1) {
                    case 11:num+=30;
                    case 10:num+=31;
                    case 9: num+=30;
                    case 8: num+=31;
                    case 7: num+=31;
                    case 6: num+=30;
                    case 5: num+=31;
                    case 4: num+=30;
                    case 3: num+=31;
                    case 2: num+=29;
                    case 1: num+=31  
                }
                return num+day;
            },
            optionsChange() {
                var that=this;
                that.optionTimeLine.options = [];
                let mapData = [];
                let barData_val = [];
                let projectItem;
                this.catalogue=='新增确诊'?projectItem='newConfirm':(this.catalogue=='新增治愈'?projectItem='newHeal':projectItem='newDead');
                that.optionTimeLine.baseOption.timeline.data = [];
                var firstChoseYear = that.dayScale[0].split('-')[0];
                var firsrtMonth = that.dayScale[0].split('-')[1];
                var firsrtDay = that.dayScale[0].split('-')[2];
                var endChoseYear = that.dayScale[1].split('-')[0];
                var endMonth = that.dayScale[1].split('-')[1];
                var endDay = that.dayScale[1].split('-')[2];
                //错误输入处理
                if(parseInt(this.monthFirst)>parseInt(this.monthEnd)){
                    alert('结束月份应该大于开始月份！');
                    that.monthFirst = 1;
                    that.monthEnd = 12;
                    return;
                }
                if(firstChoseYear!='2020' || endChoseYear!='2020'){
                    alert('选择年份必须是2020年！');
                    that.dayScale = ['2020-01-01', '2020-02-01'];
                    return;
                }
        

                if(this.step=='月'){
                    this.catalogue=='新增死亡'?this.optionTimeLine.baseOption.visualMap.max = 50:this.optionTimeLine.baseOption.visualMap.max = 200; 
                    this.catalogue=='新增死亡'?this.optionTimeLine.baseOption.xAxis.max = 50:this.optionTimeLine.baseOption.xAxis.max = 1000; 
                    for (let k=parseInt(this.monthFirst)-1;k<parseInt(this.monthEnd);k++) {
                    that.optionTimeLine.baseOption.timeline.data.push('2020-'+parseInt(k+1));
                    let data = [];
                    let x = [];
                    for (let i = 0; i < 34; i++) {
                        data.push({
                            name: that.monthlyData.provinceName[i],
                            //现存确诊数据接口
                            value: that.monthlyData.monthly_data[k].provinceData[i][projectItem]
                        });
                        x.push(that.monthlyData.monthly_data[k].provinceData[i][projectItem])
                    }
                    mapData.push(data);
                    barData_val.push(x);
                    }
                    for(let i=0;i<mapData.length;i++){
                        that.optionTimeLine.options.push(that.addOption1(mapData[i], barData_val[i]));
                    }
                
                    //修改tooltip


                }else{  
                    this.catalogue=='新增死亡'?this.optionTimeLine.baseOption.visualMap.max = 10:this.optionTimeLine.baseOption.visualMap.max = 30; 
                    this.catalogue=='新增死亡'?this.optionTimeLine.baseOption.xAxis.max = 10:this.optionTimeLine.baseOption.xAxis.max = 30;  
                    let fisrtDayIndex =  that.getDayIndex(parseInt(firsrtMonth),parseInt(firsrtDay));
                    let endDayIndex = that.getDayIndex(parseInt(endMonth),parseInt(endDay));
                    console.log(fisrtDayIndex,endDayIndex);
                    for (let k=fisrtDayIndex-1;k<endDayIndex-1;k++) {
                        that.optionTimeLine.baseOption.timeline.data.push(that.daylyData.dayly_data[k].provinceData[16].date?that.daylyData.dayly_data[k].provinceData[16].date:'');
                        let data = [];
                        let x = [];
                        for (let i = 0; i < 34; i++) {
                            data.push({
                                name: that.daylyData.provinceName[i],
                                //现存确诊数据接口
                                value: that.daylyData.dayly_data[k].provinceData[i][projectItem]
                            });
                            x.push(that.daylyData.dayly_data[k].provinceData[i][projectItem])
                        }
                        mapData.push(data);
                        barData_val.push(x);
                    }
                    for(let i=0;i<mapData.length;i++){
                        that.optionTimeLine.options.push(that.addOption1(mapData[i], barData_val[i]));
                    }
                    //修改tooltip


                }
                this.optionTimeLine.baseOption.visualMap.inRange.color = [this.catalogue=='新增确诊'?this.lowColor1:(this.catalogue=='新增治愈'?this.lowColor2:this.lowColor3),this.catalogue=='新增确诊'?this.highColor1:(this.catalogue=='新增治愈'?this.highColor2:this.highColor3)];  
                this.optionTimeLine.baseOption.timeline.playInterval = this.speed;  
                this.myChart1.setOption(this.optionTimeLine,true);
            },
            addOption1(data, x, index) {
                var that = this;
                //定义在内部的函数，防止异步请求不到该函数形成的数据
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
                return {
                    title:{
                        text:"全国疫情新增趋势动态演示图",
                        textStyle:{
                            color:'white',
                            fontSize:18
                        },
                        top:90,
                        left:320
                    },
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
                        data:  ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "台湾省", "香港特别行政区", "澳门特别行政区"]
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
                                        var colorList = [ //设置颜色
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
        },
        beforeCreate() {
            this.$Loading.start();
                            console.log(provinceData.provinceDaily)
        },
        mounted() {
            let that = this;
            //第一步 补齐数据
            var daylyData = {};
            daylyData.dayly_data = [];
            for (let key in provinceData.provinceDaily) {
                if (provinceData.provinceDaily[key].data.length != 366) {
                    let len = provinceData.provinceDaily[key].data.length;
                    for (let i = 0; i < 366 - len; i++) {
                        provinceData.provinceDaily[key].data.unshift({
                            newConfirm: 0,
                            newDead: 0,
                            newHeal: 0,
                            province: key
                        });
                    }
                }
            };
            //第二步 形成日统计数据
            for (let i = 0; i < 366; i++) {
                let a = {};
                a.provinceData = [];
                for (let key in provinceData.provinceDaily) {
                    a.provinceData.push(provinceData.provinceDaily[key].data[i]);
                }
                daylyData.dayly_data.push(a);
            }
            daylyData.provinceName = ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "台湾省", "香港特别行政区", "澳门特别行政区"];
            //第三步 形成月统计数据
            var monthLen = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var monthFirstIndex = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
            var monthlyData = {};
            monthlyData.monthly_data = [];
            monthlyData.provinceName = [];
            for (let i = 0; i < 12; i++) {
                let a = {};
                a.provinceData = [];
                for (let j = 0; j < 34; j++) {
                    let newConfirm = 0;
                    let newHeal = 0;
                    let newDead = 0;
                    for (let k = monthFirstIndex[i]; k < monthFirstIndex[i] + monthLen[i]; k++) { //第一天循环31次
                        newConfirm += daylyData.dayly_data[k].provinceData[j].newConfirm;
                        newHeal += daylyData.dayly_data[k].provinceData[j].newHeal;
                        newDead += daylyData.dayly_data[k].provinceData[j].newDead;
                    }
                    a.provinceData.push({
                        newConfirm: newConfirm,
                        newHeal: newHeal,
                        newDead: newDead
                    });
                }
                monthlyData.monthly_data.push(a);
            }
            monthlyData.provinceName = ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "台湾省", "香港特别行政区", "澳门特别行政区"];
            
            this.daylyData = daylyData;
            this.monthlyData = monthlyData;
            console.log(this.daylyData);
            console.log(this.monthlyData);


            //option基础配置项
            var uploadedDataURL = '../../static/json/china.json';
            var mapData = [];
            var barData_val = [];
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
                console.log(that.monthlyData)
                for (let k = 0; k < 12; k++) {
                    let data = [];
                    let x = [];
                    for (let i = 0; i < 34; i++) {
                        that.geoCoordMap[geoJson.features[i].properties.name] = geoJson.features[i].properties.center;
                        data.push({
                            name: that.monthlyData.provinceName[i],
                            //现存确诊数据接口
                            value: that.monthlyData.monthly_data[k].provinceData[i].newConfirm
                        });
                        x.push(that.monthlyData.monthly_data[k].provinceData[i].newConfirm)
                    }

                    mapData.push(data);
                    barData_val.push(x);
                }
                that.optionTimeLine = {
                        baseOption: {
                            timeline: {
                                bottom: 10,
                                axisType: 'category',
                                autoPlay: true,
                                playInterval: 2000,
                                animation: true,
                                data: ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12'],
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
                                controlStyle: {
                                    color: "white",
                                    borderColor: "white"
                                },
                                label: {
                                    color: "white",
                                },
                                title: {
                                    subtext: '数据来自国家统计局'
                                },
                            },
                            tooltip: {
                                textStyle: {
                                    align: 'left'
                                },
                                trigger: 'item',
                                formatter: function(params) {
                                    if(params.componentType=="timeline"){
                                        return `<img src="../../static/img/city.png" width="20px" style="vertical-align: bottom;">` + ' ' + params.name;
                                    }
                                    if (typeof(params.value)[2] == "undefined") {
                                        return `<img src="../../static/img/city.png" width="20px" style="vertical-align: bottom;">` + ' ' + params.name + '<br>' + params.marker + that.catalogue +':'+ params.value;
                                    } else {
                                        return `<img src="../../static/img/city.png" width="20px" style="vertical-align: bottom;">` + ' ' + params.name + '<br>' + params.marker + that.catalogue+':' + params.value[2];
                                    }
                                },
                            },
                            //视觉映射组件
                            visualMap: {
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
                                layoutSize: '110%',
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
                                        shadowBlur: 1
                                    },
                                    emphasis: {
                                        areaColor: '#2B91B7',
                                    }
                                }
                            },
                            grid: {
                                left: 950,
                                top: 85,
                                right: 320,
                                bottom: 100
                            },
                            xAxis: {
                                type: 'value',
                                scale: true,
                                max:1000,
                                position: 'top',
                                realtimeSort: true,
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



                //渲染时间轴上的数据
                for (let i = 0; i < 12; i++) {
                    that.optionTimeLine.options.push(that.addOption1(mapData[i], barData_val[i], i));
                }
                //渲染数据
                myChart1.setOption(that.optionTimeLine);
                that.myChart1 = myChart1;
            });

        }
    }
</script>

<style>
    .china-current .step {
        position: absolute;
        z-index: 99;
        left: 120px;
        bottom: 10 0px;
    }
    
    .china-current h1 {
        text-align: center !important;
        margin-top: 40px
    }
    
    .china-current #myChart1 {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: var(--bg-darkColor);
    }
    
    .optionSet {
        position: absolute;
        width: 250px;
        height: 80%;
        right: 0;
        background: linear-gradient(-150deg, #3db3a1, #6982c0);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 2px solid #eee;
        border-right: none;
        text-align: left;
        padding-left: 20px;
        padding-top: 20px;
    }
    
    .optionSet p {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    
    .china-current .ivu-input {
        height: 32px;
    }
    
    .china-current .ivu-color-picker-confirm {
        padding: 12px;
    }
</style>
</style>