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
                    <span>国外总计</span>
                    <span class="current">{{abroad_currentConfirm}}</span>
                    <span class="total-case">{{abroad_totalConfirmed}}</span>
                    <span class="total-death">{{abraod_totalDeath}}</span>
                </div>
                <div class="data-left-title intInc">
                    <span>较上日</span>
                    <span class="current">{{intIncrData.incCurConfirmedFlag+intIncrData.incCurConfirmed}}</span>
                    <span class="total-case">{{intIncrData.incConfirmedFlag+intIncrData.incConfirmed}}</span>
                    <span class="total-death">{{intIncrData.incDeathFlag+intIncrData.incDeath}}</span>
                </div>
                <div class="data-scroll">
                    <div class="data-head-name" v-for="item1 in continentDataList">
                        <div style="position: relative;"><span class="c-name">{{item1.continentName}}</span> <Icon type="md-arrow-dropdown" class="extend-arrow" /></div>
                        <div class="data-body" style="display: none;" v-for="item2 in item1.countriesData">
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
                isChina:true,
                chart1Status:'现存确诊：',
                countriesDataList:[],
                continentDataList: [],
                nameComparisonExchange:{},
                test:[],
                intIncrData: {
                    incCurConfirmedFlag: null,
                    incCurConfirmed: null,
                    incConfirmedFlag: null,
                    incConfirmed: null,
                    incDeathFlag: null,
                    incDeath: null
                },
                abroad_currentConfirm: null,
                abroad_totalConfirmed: null,
                abraod_totalDeath: null
            }
        },
        methods: {
            changeChart1(status) {
                var that = this;
                if (status == 'xcqz') {
                    $('.chart1-nav div').css('border-bottom', '3px solid #093ba5').css('color', '#ccc');
                    $('.nav1').css('border-bottom', '3px solid #07dce5').css('color', '#fff');
                    var option1 = this.chart1.getOption();
                    //确诊数据修改
                    var chart1Data = [];
                    for(let i=0;i<that.countriesDataList.length;i++){
                        let item = {};
                        item.name = that.nameComparisonExchange[that.countriesDataList[i].childStatistic];
                        item.value = that.countriesDataList[i].currentConfirm;
                        chart1Data.push(item);
                    }
                    option1.series[0].data = chart1Data;
                    option1.dataRange.max = 100000;
                    //悬浮提示修改
                    that.chart1Status = '现存确诊：';
                    //地图颜色映射修改
                    option1.dataRange.inRange.color = ['yellow', 'red'];
                    //top5现存确诊修改
                    option1.series[1].data = [{
                        name: "美国",
                        value: [-101.44, 39.65, 99]
                    }, {
                        name: '印度',
                        value: [76.30, 20.13, 99]
                    },{
                        name: '巴西',
                        value: [-52.80, -4.92, 99]
                    },{
                        name: '法国',
                        value: [1.0, 47.54, 99]
                    },{
                        name: '土耳其',
                        value: [35.27, 40.10, 99]
                    }];
                    that.chart1.setOption(option1,true);
                }
                if (status == 'zyl') {
                    $('.chart1-nav div').css('border-bottom', '3px solid #093ba5').css('color', '#ccc');
                    $('.nav2').css('border-bottom', '3px solid #07dce5').css('color', '#fff');
                    var option1 = this.chart1.getOption();
                    //治愈数据修改
                    var chart1Data = [];
                    for(let i=0;i<that.countriesDataList.length;i++){
                        let item = {};
                        item.name = that.nameComparisonExchange[that.countriesDataList[i].childStatistic];
                        item.value = (that.countriesDataList[i].totalCured / that.countriesDataList[i].totalConfirmed).toFixed(2);
                        chart1Data.push(item);
                    }
                    option1.series[0].data = chart1Data;
                    option1.dataRange.max = 1;
                    //悬浮提示修改
                    that.chart1Status = '治愈率：';
                    //地图颜色映射修改
                    option1.dataRange.inRange.color = ['#fff', 'green'];
                    //top5治愈率修改
                    option1.series[1].data = [{
                        name: "南苏丹",
                        value: [29.79, 7.72, 0.001]
                    }, {
                        name: '赞比亚',
                        value: [26.49, -13.8, 0.001]
                    },{
                        name: '莫桑比克',
                        value: [34.77, -18.35, 0.001]
                    },{
                        name: '中国',
                        value: [103.50, 35.93, 0.001]
                    },{
                        name: '澳大利亚',
                        value: [133.50, -24.79, 0.001]
                    }];
                    that.chart1.setOption(option1,true);
                }
                if (status == 'bsl') {
                    $('.chart1-nav div').css('border-bottom', '3px solid #093ba5').css('color', '#ccc');
                    $('.nav3').css('border-bottom', '3px solid #07dce5').css('color', '#fff');
                    var option1 = this.chart1.getOption();
                    //病死数据修改
                    var chart1Data = [];
                    for(let i=0;i<that.countriesDataList.length;i++){
                        let item = {};
                        item.name = that.nameComparisonExchange[that.countriesDataList[i].childStatistic];
                        item.value = (that.countriesDataList[i].totalDeath / that.countriesDataList[i].totalConfirmed).toFixed(2);
                        chart1Data.push(item);
                    }
                    option1.series[0].data = chart1Data;
                    option1.dataRange.max = 0.1;
                    //悬浮提示修改
                    that.chart1Status = '病死率：';
                    //地图颜色映射修改
                    option1.dataRange.inRange.color = ['#fff', '#111'];
                    //top5病死率修改
                    option1.series[1].data = [{
                        name: "也门",
                        value: [48.45, 15.54, 0.0001]
                    }, {
                        name: '墨西哥',
                        value: [-104.22, 26.09, 0.0001]
                    },{
                        name: '苏丹',
                        value: [29.55, 16.13, 0.0001]
                    },{
                        name: '叙利亚',
                        value: [38.88, 34.94, 0.0001]
                    },{
                        name: '埃及',
                        value: [30.01, 26.65, 0.0001]
                    }];
                    that.chart1.setOption(option1,true);
                }
            }
        },
        mounted() {
            var that = this;
            var  nameComparison = {
                'Canada':'加拿大',
                'Russia':'俄罗斯',
                'China':'中国',
                'United States':'美国',
                'Singapore Rep.':'新加坡',
                'Dominican Rep.':'多米尼加',
                'Palestine':'巴勒斯坦',
                'Bahamas':'巴哈马',
                'Timor-Leste':'东帝汶',
                'Afghanistan':'阿富汗',
                'Guinea-Bissau':'几内亚比绍',
                "CÃ´te d'Ivoire":'科特迪瓦',
                'Siachen Glacier':'锡亚琴冰川',
                "Br. Indian Ocean Ter.":'英属印度洋领土',
                'Angola':'安哥拉',
                'Albania':'阿尔巴尼亚',
                'United Arab Emirates':'阿联酋',
                'Argentina':'阿根廷',
                'Armenia':'亚美尼亚',
                'French Southern and Antarctic Lands':'法属南半球和南极领地',
                'Australia':'澳大利亚',
                'Austria':'奥地利',
                'Azerbaijan':'阿塞拜疆',
                'Burundi':'布隆迪',
                'Belgium':'比利时',
                'Benin':'贝宁',
                'Burkina Faso':'布基纳法索',
                'Bangladesh':'孟加拉国',
                'Bulgaria':'保加利亚',
                'The Bahamas':'巴哈马',
                'Bosnia and Herz.':'波斯尼亚和黑塞哥维那',
                'Belarus':'白俄罗斯',
                'Belize':'伯利兹',
                'Bermuda':'百慕大',
                'Bolivia':'玻利维亚',
                'Brazil':'巴西',
                'Brunei':'文莱',
                'Bhutan':'不丹',
                'Botswana':'博茨瓦纳',
                'Central African Rep.':'中非',
                'Switzerland':'瑞士',
                'Chile':'智利',
                'Ivory Coast':'象牙海岸',
                'Cameroon':'喀麦隆',
                'Dem. Rep. Congo':'刚果(金)',
                'Congo':'刚果',
                'Colombia':'哥伦比亚',
                'Costa Rica':'哥斯达黎加',
                'Cuba':'古巴',
                'N. Cyprus':'北塞浦路斯',
                'Cyprus':'塞浦路斯',
                'Czech Rep.':'捷克',
                'Germany':'德国',
                'Djibouti':'吉布提',
                'Denmark':'丹麦',
                'Algeria':'阿尔及利亚',
                'Ecuador':'厄瓜多尔',
                'Egypt':'埃及',
                'Eritrea':'厄立特里亚',
                'Spain':'西班牙',
                'Estonia':'爱沙尼亚',
                'Ethiopia':'埃塞俄比亚',
                'Finland':'芬兰',
                'Fiji':'斐',
                'Falkland Islands':'福克兰群岛',
                'France':'法国',
                'Gabon':'加蓬',
                'United Kingdom':'英国',
                'Georgia':'格鲁吉亚',
                'Ghana':'加纳',
                'Guinea':'几内亚',
                'Gambia':'冈比亚',
                'Guinea Bissau':'几内亚比绍',
                'Eq. Guinea':'赤道几内亚',
                'Greece':'希腊',
                'Greenland':'格陵兰岛',
                'Guatemala':'危地马拉',
                'French Guiana':'法属圭亚那',
                'Guyana':'圭亚那',
                'Honduras':'洪都拉斯',
                'Croatia':'克罗地亚',
                'Haiti':'海地',
                'Hungary':'匈牙利',
                'Indonesia':'印度尼西亚',
                'India':'印度',
                'Ireland':'爱尔兰',
                'Iran':'伊朗',
                'Iraq':'伊拉克',
                'Iceland':'冰岛',
                'Israel':'以色列',
                'Italy':'意大利',
                'Jamaica':'牙买加',
                'Jordan':'约旦',
                'Japan':'日本',
                'Kazakhstan':'哈萨克斯坦',
                'Kenya':'肯尼亚',
                'Kyrgyzstan':'吉尔吉斯斯坦',
                'Cambodia':'柬埔寨',
                'Korea':'韩国',
                'Kosovo':'科索沃',
                'Kuwait':'科威特',
                'Lao PDR':'老挝',
                'Lebanon':'黎巴嫩',
                'Liberia':'利比里亚',
                'Libya':'利比亚',
                'Sri Lanka':'斯里兰卡',
                'Lesotho':'莱索托',
                'Lithuania':'立陶宛',
                'Luxembourg':'卢森堡',
                'Latvia':'拉脱维亚',
                'Morocco':'摩洛哥',
                'Moldova':'摩尔多瓦',
                'Madagascar':'马达加斯加',
                'Mexico':'墨西哥',
                'Macedonia':'马其顿',
                'Mali':'马里',
                'Myanmar':'缅甸',
                'Montenegro':'黑山',
                'Mongolia':'蒙古',
                'Mozambique':'莫桑比克',
                'Mauritania':'毛里塔尼亚',
                'Malawi':'马拉维',
                'Malaysia':'马来西亚',
                'Namibia':'纳米比亚',
                'New Caledonia':'新喀里多尼亚',
                'Niger':'尼日尔',
                'Nigeria':'尼日利亚',
                'Nicaragua':'尼加拉瓜',
                'Netherlands':'荷兰',
                'Norway':'挪威',
                'Nepal':'尼泊尔',
                'New Zealand':'新西兰',
                'Oman':'阿曼',
                'Pakistan':'巴基斯坦',
                'Panama':'巴拿马',
                'Peru':'秘鲁',
                'Philippines':'菲律宾',
                'Papua New Guinea':'巴布亚新几内亚',
                'Poland':'波兰',
                'Puerto Rico':'波多黎各',
                'Dem. Rep. Korea':'朝鲜',
                'Portugal':'葡萄牙',
                'Paraguay':'巴拉圭',
                'Qatar':'卡塔尔',
                'Romania':'罗马尼亚',
                'Rwanda':'卢旺达',
                'W. Sahara':'西撒哈拉',
                'Saudi Arabia':'沙特阿拉伯',
                'Sudan':'苏丹',
                'S. Sudan':'南苏丹',
                'Senegal':'塞内加尔',
                'Solomon Is.':'所罗门群岛',
                'Sierra Leone':'塞拉利昂',
                'El Salvador':'萨尔瓦多',
                'Somaliland':'索马里兰',
                'Somalia':'索马里',
                'Serbia':'塞尔维亚',
                'Suriname':'苏里南',
                'Slovakia':'斯洛伐克',
                'Slovenia':'斯洛文尼亚',
                'Sweden':'瑞典',
                'Swaziland':'斯威士兰',
                'Syria':'叙利亚',
                'Chad':'乍得',
                'Togo':'多哥',
                'Thailand':'泰国',
                'Tajikistan':'塔吉克斯坦',
                'Turkmenistan':'土库曼斯坦',
                'East Timor':'东帝汶',
                'Trinidad and Tobago':'特里尼达和多巴哥',
                'Tunisia':'突尼斯',
                'Turkey':'土耳其',
                'Tanzania':'坦桑尼亚',
                'Uganda':'乌干达',
                'Ukraine':'乌克兰',
                'Uruguay':'乌拉圭',
                'Uzbekistan':'乌兹别克斯坦',
                'Venezuela':'委内瑞拉',
                'Vietnam':'越南',
                'Vanuatu':'瓦努阿图',
                'West Bank':'西岸',
                'Yemen':'也门',
                'South Africa':'南非',
                'Zambia':'赞比亚',
                'Zimbabwe':'津巴布韦'
            };
            for (let key in nameComparison) { // key 属性名
                let value = nameComparison[key]; // value 属性值
                [value, key] = [key, value]; // 交换属性名和属性值
                that.nameComparisonExchange[key] = value; // 设置结果
            }
            var chart1Data = [];
            $.getScript("https://cdn.mdeer.com/data/yqstaticdata.js?callback=callbackstaticdata&t=" + (+new Date));
            window.callbackstaticdata = function(res) {
                console.log(res)
                that.continentDataList = res.continentDataList;
                //拼接得到各国数据
                for(let i=0;i<res.continentDataList.length;i++){
                    for(let j=0;j<res.continentDataList[i].countriesData.length;j++){
                        that.countriesDataList.push(res.continentDataList[i].countriesData[j]);
                        that.test.push(res.continentDataList[i].countriesData[j].childStatistic);
                    }
                }
                //构建chart1Data 现存确诊数据
                for(let i=0;i<that.countriesDataList.length;i++){
                    let item = {};
                    item.name = that.nameComparisonExchange[that.countriesDataList[i].childStatistic];
                    item.value = that.countriesDataList[i].currentConfirm;
                    chart1Data.push(item);
                }
                option1.series[0].data = chart1Data;
                chart1.setOption(option1);
                that.chart1 = chart1;
                //获取洲际数据模块及各图表数据
                that.abroad_currentConfirm = res.abroadSum.currentConfirm;
                that.abroad_totalConfirmed = res.abroadSum.totalConfirmed;
                that.abraod_totalDeath = res.abroadSum.totalDeath;
                that.intIncrData = res.intIncrData;
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
            $(document).off('click','.data-head-name');
            $(document).on('click', '.data-head-name', function() { 
                if ($(this).children('.data-body').css('display') == 'none') {
                    $(this).children('.data-body').css('display', 'flex');
                    $(this).children('div').children('.extend-arrow').css('transform', 'rotate(-90deg) translateY(-50%)');
                } else {
                    $(this).children('.data-body').css('display', 'none');
                    $(this).children('div').children('.extend-arrow').css('transform', 'rotate(0deg) translateY(-50%)');
                }
            });
            var option1 = { 
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
                dataRange: {
                    min: 0,
                    max: 100000,
                    text: ['High', 'Low'],
                    realtime: false,
                    inRange: {
                        color: ['yellow', 'red']
                    },
                    textStyle: {
                        color: 'white'
                    }
                },
                geo: {
                    map: 'world', // 与引用进来的地图js名字一致
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
                    layoutCenter: ['40%', '60%'],
                    layoutSize: 1200,
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
                series: [{
                    type: 'map',
                    map: 'world',
                    geoIndex: 0,
                    data: []
                }, {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [{
                        name: "美国",
                        value: [-101.44, 39.65, 99]
                    }, {
                        name: '印度',
                        value: [76.30, 20.13, 99]
                    },{
                        name: '巴西',
                        value: [-52.80, -4.92, 99]
                    },{
                        name: '法国',
                        value: [1.0, 47.54, 99]
                    },{
                        name: '土耳其',
                        value: [35.27, 40.10, 99]
                    }],
                    symbolSize: function(val) {
                        if (val[2] == 0) {
                            return 0;
                        }
                        return 20;
                    },
                    tooltip:{
                        show:false
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            formatter: '{b}',
                            align: 'center',
                            verticalAlign: 'center',
                            show: true,
                            color: 'turquoise',
                            fontWeight: 1000
                        }
                    },
                }]
            };
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

            chart1.on('click',function(params){
                if(params.name=='China'){
                    console.log(params.name)
                    that.$emit("thisIsChina",true);
                }
            })
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
    .data-head-name {
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
    
    .data-head-name {
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
    
    .data-head-name>div {
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .data-head-name>div:hover .c-name {
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
    }
    .data-scroll::-webkit-scrollbar{
        display:none;
    }
     .nav-active {
        border-bottom: 3px solid #07dce5;
        color: #fff;
    }
</style>