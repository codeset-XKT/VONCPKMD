<template>
    <div>
        <div id="myChart1"></div>
    </div>
</template>
<script>
    export default {
        mounted() {
            var categories = [{
                name: "新型冠状病毒"
            }, {
                name: "并发症"
            }, {
                name: "鉴别诊断"
            }, {
                name: "相关药物"
            }, {
                name: "检查检验"
            },{
                name: "上下位"
            },{
                name: "传播途径"
            },{
                name: "治疗方案"
            },{
                name: "症状"
            },{
                name: "基本问题"
            },{
                name: "预防措施"
            }];

            var option1 = {
                tooltip: {
                    formatter: function(params) {
                        if(params.value==undefined){
                            return params.name;
                        }else{
                            return params.value;
                        }
                    }
                },
                animationDurationUpdate: 500,
                animationEasingUpdate: "quinticInOut",
                legend: [{
                    orient: 'vertical',
                    left:150,
                    top:'center',
                    textStyle:{
                        color:'white',
                    },
                    data: categories.map(function(a) {
                        return a.name;
                    })
                }],
                series: [{
                    type: "graph",
                    layout: "force",
                    roam: true,
                    hoverAnimation: true,
                    focusNodeAdjacency: true,
                    draggable: true,
                    symbolSize: 33,
                     force: {
                        repulsion: 200
                    },
                    itemStyle: {
                        normal: {
                            borderColor: "#fff",
                            borderWidth: 1,
                            shadowBlur: 10,
                            shadowColor: "rgba(0, 0, 0, 0.3)"
                        }
                    },
                    lineStyle: {
                        width:1,
                        curveness: 0.3,
                        opacity: 0.8
                    },
                    emphasis: {
                        itemStyle: {
                            borderWidth:1
                        },
                        lineStyle: {
                            color: 'gray',
                            width: 6,
                        }
                    },
                    data: [{
                        name: "新型冠状病毒肺炎",
                        category: '新型冠状病毒',
                        symbolSize: 90,
                        label: {
                            show: true
                        }, 
                        itemStyle: {
                            borderWidth:3
                        }, 
                        emphasis: {
                        itemStyle: {
                            borderWidth:3
                        },

                    },
                    }, {
                        name: "并发症",
                        category: '并发症', 
                        symbolSize: 70,
                        label: {
                            show: true
                        }  
                    },{
                        name: "肾衰竭",
                        category: '并发症', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "急性呼吸\n窘迫综合症",
                        category: '并发症', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "肾脏",
                        category: '并发症', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "鉴别诊断",
                        category: '鉴别诊断', 
                        symbolSize: 70,
                        label: {
                            show: true
                        }  
                    },{
                        name: "流感病毒肺炎",
                        category: '鉴别诊断', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "血管炎",
                        category: '鉴别诊断', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "细菌性肺炎",
                        category: '鉴别诊断', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "相关药物",
                        category: '相关药物', 
                        symbolSize: 70,
                        label: {
                            show: true
                        }  
                    },{
                        name: "连花清瘟颗粒",
                        category: '相关药物', 
                        symbolSize: 60,
                        label: {
                            show: true
                        }  
                    },{
                        name: "一次一粒\n一日三次\n（口服）",
                        category: '相关药物', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "北京以岭\n药业有限公司",
                        category: '相关药物', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "颗粒",
                        category: '相关药物', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "甲类",
                        category: '相关药物', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "盐酸阿比多尔分散片",
                        category: '相关药物', 
                        symbolSize: 60,
                        label: {
                            show: true
                        }  
                    },{
                        name: "阿比多尔",
                        category: '相关药物', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "片",
                        category: '相关药物', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "恶心",
                        category: '相关药物', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "腹泻",
                        category: '相关药物', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "检查检验",
                        category: '检查检验', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "血常规",
                        category: '检查检验', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "CT",
                        category: '检查检验', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "病毒基因测序",
                        category: '检查检验', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "上下位",
                        category: '上下位', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "病毒性肺炎",
                        category: '上下位', 
                        symbolSize: 40,
                        label: {
                            show: true
                        }  
                    },{
                        name: "传播途径",
                        category: '传播途径', 
                        symbolSize: 60,
                        label: {
                            show: true
                        }  
                    },{
                        name: "飞沫",
                        category: '传播途径', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "接触",
                        category: '传播途径', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "气溶胶",
                        category: '传播途径', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "治疗方案",
                        category: '治疗方案', 
                        symbolSize: 60,
                        label: {
                            show: true
                        }  
                    },{
                        name: "接种疫苗",
                        category: '治疗方案', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "血液净化治疗",
                        category: '治疗方案', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "肾功能衰竭和肾替代治疗",
                        category: '治疗方案', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "康复者血浆治疗",
                        category: '治疗方案', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "呼吸支持",
                        category: '治疗方案', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "症状",
                        category: '症状', 
                        symbolSize: 60,
                        label: {
                            show: true
                        }  
                    },{
                        name: "发热",
                        category: '症状', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "乏力",
                        category: '症状', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "咳嗽",
                        category: '症状', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "支原体肺炎",
                        category: '症状', 
                        symbolSize: 40,
                        label: {
                            show: true
                        }  
                    },{
                        name: "上呼吸道感染",
                        category: '症状', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "基本问题",
                        category: '基本问题', 
                        symbolSize: 60,
                        label: {
                            show: true
                        }  
                    },{
                        name: "口罩怎么选择",
                        category: '基本问题', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "体温多少算正常",
                        category: '基本问题', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "如何居家隔离",
                        category: '基本问题', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "预防措施",
                        category: '预防措施', 
                        symbolSize: 60,
                        label: {
                            show: true
                        }  
                    },{
                        name: "戴口罩",
                        category: '预防措施', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "勤洗手",
                        category: '预防措施', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },{
                        name: "多消毒",
                        category: '预防措施', 
                        symbolSize: 50,
                        label: {
                            show: true
                        }  
                    },],
                    links: [{
                        source: "预防措施",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "传播途径",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "检查检验",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "基本问题",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "并发症",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "鉴别诊断",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "相关药物",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "检查检验",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "上下位",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "传染途径",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "治疗方案",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "症状",
                        target: "新型冠状病毒肺炎",
                        value: "",
                    },{
                        source: "预防措施",
                        target: "戴口罩",
                        value: "",
                    },{
                        source: "预防措施",
                        target: "勤洗手",
                        value: "",
                    },{
                        source: "预防措施",
                        target: "多消毒",
                        value: "",
                    },{
                        source: "治疗方案",
                        target: "血液净化治疗",
                        value: "",
                    },{
                        source: "治疗方案",
                        target: "肾功能衰竭和肾替代治疗",
                        value: "",
                    },{
                        source: "治疗方案",
                        target: "康复者血浆治疗",
                        value: "",
                    },{
                        source: "治疗方案",
                        target: "呼吸支持",
                        value: "",
                    },{
                        source: "治疗方案",
                        target: "接种疫苗",
                        value: "",
                    },{
                        source: "发热",
                        target: "症状",
                        value: "",
                    },{
                        source: "咳嗽",
                        target: "症状",
                        value: "",
                    },{
                        source: "乏力",
                        target: "症状",
                        value: "",
                    },{
                        source: "上呼吸道感染",
                        target: "咳嗽",
                        value: "症状",
                    },{
                        source: "支原体肺炎",
                        target: "咳嗽",
                        value: "症状",
                    },{
                        source: "并发症",
                        target: "肾衰竭",
                        value: "",
                    },{
                        source: "并发症",
                        target: "急性呼吸\n窘迫综合症",
                        value: "",
                    },{
                        source: "肾脏",
                        target: "肾衰竭",
                        value: "发病部位",
                    },{
                        source: "鉴别诊断",
                        target: "细菌性肺炎",
                        value: "",
                    },{
                        source: "鉴别诊断",
                        target: "血管炎",
                        value: "",
                    },{
                        source: "鉴别诊断",
                        target: "流感病毒肺炎",
                        value: "",
                    },{
                        source: "相关药物",
                        target: "连花清瘟颗粒",
                        value: "",
                    },{
                        source: "相关药物",
                        target: "盐酸阿比多尔分散片",
                        value: "",
                    },{
                        source: "一次一粒\n一日三次\n（口服）",
                        target: "连花清瘟颗粒",
                        value: "用法用量",
                    },{
                        source: "北京以岭\n药业有限公司",
                        target: "连花清瘟颗粒",
                        value: "生产企业",
                    },{
                        source: "颗粒",
                        target: "连花清瘟颗粒",
                        value: "剂型属性",
                    },{
                        source: "甲类",
                        target: "连花清瘟颗粒",
                        value: "医保",
                    },{
                        source: "阿比多尔",
                        target: "盐酸阿比多尔分散片",
                        value: "ATC",
                    },{
                        source: "片",
                        target: "盐酸阿比多尔分散片",
                        value: "剂型属性",
                    },{
                        source: "再立克",
                        target: "盐酸阿比多尔分散片",
                        value: "商品名",
                    },{
                        source: "腹泻",
                        target: "盐酸阿比多尔分散片",
                        value: "副作用",
                    },{
                        source: "恶心",
                        target: "盐酸阿比多尔分散片",
                        value: "副作用",
                    },{
                        source: "上下位",
                        target: "病毒性肺炎",
                        value: "",
                    },{
                        source: "基本问题",
                        target: "口罩怎么选择",
                        value: "",
                    },{
                        source: "基本问题",
                        target: "体温多少算正常",
                        value: "",
                    },{
                        source: "基本问题",
                        target: "如何居家隔离",
                        value: "",
                    },{
                        source: "传播途径",
                        target: "盐酸阿比多尔分散片",
                        value: "",
                    },{
                        source: "传播途径",
                        target: "飞沫",
                        value: "",
                    },{
                        source: "传播途径",
                        target: "接触",
                        value: "",
                    },{
                        source: "传播途径",
                        target: "气溶胶",
                        value: "",
                    },{
                        source: "检查检验",
                        target: "CT",
                        value: "",
                    },{
                        source: "检查检验",
                        target: "病毒基因测序",
                        value: "",
                    },{
                        source: "检查检验",
                        target: "核酸",
                        value: "",
                    },{
                        source: "检查检验",
                        target: "血常规",
                        value: "",
                    },],
                    categories: categories
                }]
            }
            var myChart1 = echarts.init(document.getElementById('myChart1'));
            myChart1.setOption(option1);
        }
    }
</script>
<style scoped>
  #myChart1 {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        background: var(--bg-darkColor);
    }
</style>