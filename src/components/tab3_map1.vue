<template>
    <div class="map1">
        <div id="myChart1"></div>
        <Modal
            v-model="modal1"
            :title="picTitle"
            >
            <div class="pic-container">
                <img :src="picUrl" width="100%">
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                modal1:false,
                picTitle:'',
                picUrl:''
            }
        },
        methods:{
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        },
        mounted() {
            var myChart1 = echarts.init(document.getElementById('myChart1'));
            var graph = {
                "nodes": [{
                    "id": "0",
                    "name":'新冠肺炎疫苗是一种什么药？',
                    "data":`新冠病毒疫苗（COVID-19 Vaccine，SARS-COV-2 Vaccine）<br>是具有新型冠状病毒抗原特性的各种疫苗的总称<br>简称「新冠疫苗」，或称「新冠肺炎疫苗」。`,
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(235,81,72)"
                        }
                    },
                    "symbolSize": 100,
                    "x": -80,
                    "y": 100,
                    "attributes": {
                        "modularity_class": 0
                    }
                }, {
                    "id": "1",
                    "name": "接种人群",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":70,
                    "x": -130,
                    "y": 130,
                    "attributes": {
                        "modularity_class": 1
                    }
                },{
                    "id": "2",
                    "name": "新冠疫苗分类",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":70,
                    "x": -222,
                    "y": 150,
                    "attributes": {
                        "modularity_class": 2
                    }
                },{
                    "id": "3",
                    "name": "接种方法",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":70,
                    "x": 0,
                    "y":170,
                    "attributes": {
                        "modularity_class": 3
                    }
                },{
                    "id": "4",
                    "name": "不良反应",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":70,
                    "x":0,
                    "y": 80,
                    "attributes": {
                        "modularity_class": 4
                    }
                },{
                    "id": "5",
                    "name": "紧急上市的研发流程",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":70,
                    "x": 50,
                    "y": 120,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "6",
                    "name": "疫苗作用时长",
                    "data":"从前期已发表的新冠疫苗文献来看，发挥作用的时间主要是在接种疫苗第二剂次的两周后，会产生较好的免疫效果。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":70,
                    "x": -112.08344,
                    "y": 30,
                    "attributes": {
                        "modularity_class": 6
                    }
                },{
                    "id": "7",
                    "name": "注意事项",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":70,
                    "x": -200,
                    "y": 82.8853,
                    "attributes": {
                        "modularity_class": 7
                    }
                },{
                    "id": "8",
                    "name": "疫苗介绍",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":70,
                    "x": -100,
                    "y": 180,
                    "attributes": {
                        "modularity_class": 8
                    }
                },
                {
                    "id": "9",
                    "name": "哪些人建议接种新冠疫苗？",
                    "data":"国内计划通过新冠病毒疫苗接种建立全人群免疫屏障，来控制疫情。<br>2021 年进入下一步——疫苗批准附条件上市，接种将逐步扩大到高危人群（老年人和有基础疾病的人群接种），<br>再下一步再扩大到全人群接种。一般认为接种率达到 60%～70% 才能建立全民保护。鉴于我国已批准的疫苗安全性良好，<br>有效性也有了很好的证据，倡导老百姓在知情同意、排除禁忌证前提下，积极参加接种，保护自己也保护家人、他人。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -160,
                    "y": 152,
                    "attributes": {
                        "modularity_class": 1
                    }
                },
                {
                    "id": "10",
                    "name": "哪些重点人群将接种新冠疫苗？",
                    "data":"疫苗接种将分两步实施：<br>第一步主要针对部分重点人群，包括从事进口冷链、口岸检疫、船舶引航、航空空勤、生鲜市场、公共交通、医疗疾控等感染风险比较高的工作人员<br>以及前往中高风险国家或者地区去工作或者学习的人员，尽力缓解输入性疫情防控的压力，降低本土病例发生和国内疫情暴发的风险；<br>第二步随着疫苗获批上市，或疫苗产量逐步提高，将会有更多的疫苗投入使用,通过有序开展预防接种，符合条件的群众都能实现应接尽接逐步构筑起<br>人群的免疫屏障，来阻断新冠病毒在国内的传播。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -160,
                    "y": 140,
                    "attributes": {
                        "modularity_class": 1
                    }
                },{
                    "id": "11",
                    "name": "哪些人不能接种新冠病毒疫苗？",
                    "data":"适宜接种新型冠状病毒疫苗的人群要根据疫苗的临床试验选择的人群来决定。<br>一般来说，如果只进行了 18～59 岁健康人群的临床试验，那超出该年龄和健康状况范围的人群就不推荐接种（特殊情况下，需要政策批准和知情自愿）。<br>另外，对疫苗中的任何成份过敏、患有严重急性疾病、发热或慢性疾病急性发作期都不能接种新型冠状病毒疫苗。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -150,
                    "y": 160,
                    "attributes": {
                        "modularity_class": 1
                    }
                },{
                    "id": "12",
                    "name": "哪些人要谨慎接种新冠病毒疫苗？",
                    "data":"有药物过敏史、慢性疾病、免疫功能异常的人群应谨慎接种<br>由医生衡量接种疫苗的获益和可能发生的风险，权衡利弊后决定是否接种。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -150,
                    "y": 120,
                    "attributes": {
                        "modularity_class": 1
                    }
                },{
                    "id": "13",
                    "name": "儿童、怀孕、哺乳期、老年人可以接种新冠病毒疫苗吗？",
                    "data":"由于目前国内疫苗企业刚开始启动 18 岁以下人群的临床试验，且孕期、哺乳期的妇女及 60 岁以上的老年人临床研究尚未开始<br>因此这些人群暂不能接种。特殊情况可以进行接种评估，权衡利弊后接种。<br>比如 2020 年末，国家接种将逐步扩大到高危人群，其中就包括老年人。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -170,
                    "y": 130,
                    "attributes": {
                        "modularity_class": 1
                    }
                },
                {
                    "id": "14",
                    "name": "得过新冠肺炎或是无症状感染者，还有必要接种新冠疫苗吗？",
                    "data":"基于现有已发表信息，在包括中国香港、比利时、荷兰、美国等地通过基因测序的结果均发现再次感染现象<br>目前无法得出一次感染终身免疫的结论。参考流感、轮状病毒肠炎等季节性流行病毒的接种建议<br>考虑到规范接种后所获得抗体的保护力和保护时间更稳定，建议这类人群在无接种禁忌证的情况下，考虑接种新冠疫苗。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -150,
                    "y": 160,
                    "attributes": {
                        "modularity_class": 1
                    }
                },{
                    "id": "15",
                    "name": "HPV 疫苗可以和新冠病毒疫苗一起接种吗？",
                    "data":"尽管理论上灭活疫苗与其它疫苗接种间隔不受影响<br>但因为无研究数据，目前建议 HPV 疫苗和新冠病毒疫苗的接种间隔在两周以上。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -120,
                    "y": 170,
                    "attributes": {
                        "modularity_class": 1
                    }
                },
                {
                    "id": "16",
                    "name": "什么是传统疫苗和新型疫苗？",
                    "data":"传统疫苗是指用病原微生物及代谢物经过减毒、灭活等方法制成的疫苗。<br>新型疫苗采用的技术与传统疫苗常用的灭活、减毒技术不同，包括重组疫苗、核酸疫苗等。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -200,
                    "y": 170,
                    "attributes": {
                        "modularity_class": 2
                    }
                },{
                    "id": "17",
                    "name": "什么是减毒活疫苗？",
                    "data":"减毒活疫苗是在实验室内对病原体进行减毒处理，减弱甚至去除其致病性<br>但保留其生长或复制和引起免疫的能力制成的疫苗。<br>常用减毒活疫苗有卡介苗、麻腮风疫苗、口服脊髓灰质炎疫苗、水痘疫苗等。<br>活疫苗中的病原体在体内可繁殖，免疫效果好，免疫保护时间较长，但对于免疫功能缺陷人群可能存在潜在致病风险。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -220,
                    "y": 165,
                    "attributes": {
                        "modularity_class": 2
                    }
                },{
                    "id": "18",
                    "name": "灭活疫苗分哪几类？",
                    "data":"根据病原体的成分不同，灭活病毒疫苗可以分为全病毒灭活疫苗、裂解疫苗、亚单位疫苗等；<br>灭活细菌疫苗一般是组分疫苗，一般由菌体结构或代谢产物组成，比如破伤风疫苗（抗原为破伤风类毒素）、b型流感嗜血杆菌疫苗（抗原为荚膜多糖结合破伤风类毒素）。<br>以病毒疫苗为例，全病毒灭活疫苗含有病毒的各种抗原蛋白，免疫原性相对更好。<br>而组分疫苗则只是提纯出病毒的其中一部分携带抗原蛋白的结构——比如亚单位疫苗——以减少疫苗引起的不良反应，安全性更高，但免疫原性可能稍差。<br>我国目前（2020 年 10 月）已经有包括中生集团和科兴控股在内的两家企业共计三个全病毒灭活新冠疫苗进入 Ⅲ 期临床阶段，在全球处于领先阶段。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":30,
                    "x": -220,
                    "y": 125,
                    "attributes": {
                        "modularity_class": 2
                    }
                },{
                    "id": "19",
                    "name": "什么是裂解疫苗？",
                    "data":"裂解疫苗是将病毒进行培养，将病毒在灭活前或灭活后裂解为抗原片段<br>再经过纯化和分装制成的疫苗，常见的裂解疫苗主要是流感病毒裂解疫苗。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -210,
                    "y": 115,
                    "attributes": {
                        "modularity_class": 2
                    }
                },{
                    "id": "20",
                    "name": "什么是蛋白亚单位疫苗？",
                    "data":"亚单位疫苗是指提取或者合成病原体外壳的一部分具有特征性的蛋白结构来制成的疫苗，和重组疫苗有部分重合。<br>因为只选取了一部分能引起免疫反应的结构，所以理论上可以减少疫苗引起不良反应的风险，安全性更好。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -220,
                    "y": 115,
                    "attributes": {
                        "modularity_class": 2
                    }
                },{
                    "id": "21",
                    "name": "什么是基因工程疫苗？",
                    "data":"基因工程疫苗是通过基因工程对抗原基因与其他细胞、病毒、质粒重组或将其作为载体<br>甚至通过技术平台直接合成基因序列制备的疫苗，包括了病毒载体疫苗、核酸疫苗（DNA 疫苗和 mRNA 疫苗）等。<br>病毒载体疫苗是指以无致病性或改造过的病毒如腺病毒、痘病毒、甲病毒等为载体，搭载具有免疫原性的病原体基因的疫苗<br>通过病毒载体进入人体产生免疫反应。我国目前已有腺病毒载体新型冠状病毒疫苗在进行三期临床试验。<br>核酸疫苗是将编码病原体抗原蛋白的外源基因(DNA 或 RNA ) 导入人体细胞内<br>在细胞内表达合成抗原蛋白， 诱导人体产生对该抗原蛋白的免疫应答， 以达到预防疾病的目的。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -205,
                    "y": 125,
                    "attributes": {
                        "modularity_class": 2
                    }
                },{
                    "id": "22",
                    "name": "什么是病毒样颗粒疫苗？",
                    "data":"病毒样颗粒疫苗是指通过合成和病毒体极为相似具有病毒体表面结构但不具有致病性和传染性的颗粒制备的疫苗<br>由于不具有功能性病毒包膜因此没有传染性，非常安全。我们熟知的 HPV 疫苗就是通过这种工艺制备的。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -230,
                    "y": 120,
                    "attributes": {
                        "modularity_class": 2
                    }
                },{
                    "id": "23",
                    "name": "新冠病毒疫苗接种频率？剂次？每次间隔多久？",
                    "data":"目前批准开展紧急接种的新型冠状病毒疫苗的免疫程序为接种两剂<br>每剂 0.5 mL，两剂之间间隔 2～4 周。疫苗正式上市后，以疫苗说明书要求为准。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 0,
                    "y": 150,
                    "attributes": {
                        "modularity_class": 3
                    }
                },{
                    "id": "24",
                    "name": "新冠病毒疫苗如何接种？",
                    "data":"目前批准开展紧急接种的新型冠状病毒疫苗的接种途径为上臂三角肌肌内注射。<br>疫苗正式上市后，以疫苗说明书要求为准。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 20,
                    "y": 160,
                    "attributes": {
                        "modularity_class": 3
                    }
                },{
                    "id": "25",
                    "name": "错过接种时间或延误接种后如何补种？",
                    "data":"目前尚未获得不同免疫程序的临床研究数据，因此不确定两剂疫苗的最大间隔。<br>但结合其他疫苗的经验，如果推迟接种或者未能按照免疫程序完成接种，应尽快开始接种或者补齐相应剂次。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 10,
                    "y": 145,
                    "attributes": {
                        "modularity_class": 3
                    }
                },{
                    "id": "26",
                    "name": "国内这些疫苗的效果怎么样？",
                    "data":"已有数据显示，保护率为 79.34%，实现安全性、有效性、可及性、可负担性的统一，达到世界卫生组织及国家药监局相关标准要求。<br>后续，疫苗免疫的持久性和保护效果还需持续观察。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 35,
                    "y": 155,
                    "attributes": {
                        "modularity_class": 3
                    }
                },{
                    "id": "27",
                    "name": "接种新冠疫苗后，是不是就不会再感染新冠病毒了？",
                    "data":"接种疫苗是预防和控制传染病最经济、有效的措施，但截止到目前还没有任何一个疫苗的保护率能达到百分之百。<br>新冠疫苗也不例外，尤其是在当前群体免疫还没有建立起来的情况下<br>建议即使接种新冠疫苗以后，大家还是要继续维持个人防护措施，包括戴口罩、保证社交距离、勤洗手等，这样才能更好地保障你我和大家的安全。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 30,
                    "y": 145,
                    "attributes": {
                        "modularity_class": 3
                    }
                },{
                    "id": "28",
                    "name": "新冠病毒变异，现在研发的疫苗还有用吗？",
                    "data":"在 31 日举行的国务院联防联控机制新闻发布会上，科技部副部长徐南平说<br>根据国家生物信息中心掌握的近 30 万条新冠病毒基因组序列的数据监测结果，综合分析研判认为，目前观察到的变异仍属正常范围的变异积累。<br>总体来说，专家研判认为，目前没有证据证明观察到的变异对疫苗使用效果构成实质影响。（来源：新华视点 @微博）",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 25,
                    "y": 135,
                    "attributes": {
                        "modularity_class": 3
                    }
                },{
                    "id": "29",
                    "name": "接种新冠病毒疫苗可能出现哪些不良反应？",
                    "data":"接种新冠病毒疫苗导致的不良反应包括全身性反应和局部反应，常见的不良反应包括一过性发热、接种部位的红肿、疼痛和硬结等，其它严重不良反应较罕见。<br>截止至 2020 年 12 月的数据显示，新冠疫苗接种后发生了一定比例的不良反应，总的发生率与常规接种的灭活疫苗接近<br>主要表现是局部疼痛、硬结，轻度发热比例大概不到 0.1%，过敏反应比较严重的不良发生率大约为百万分之二。<br>目前尚未发现接种新冠病毒疫苗后出现抗体依赖增强（ADE）效应，即接种疫苗后，再次接触新型冠状病毒反而加重病毒感染后症状的现象。<br>但新冠疫苗是否存在 ADE 效应还需要在 Ⅲ 期临床甚至疫苗上市后的监测分析才能得到答案。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 15,
                    "y": 65,
                    "attributes": {
                        "modularity_class": 4
                    }
                },{
                    "id": "30",
                    "name": "出现不良反应，应该如何处理？",
                    "data":"疫苗引起的发烧、接种部位红肿、疼痛等不良反应通常会在两到三天之内自行缓解，一般不需要特殊处理。<br>如果症状较重或者发生严重不良反应及时就医处理。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 5,
                    "y": 55,
                    "attributes": {
                        "modularity_class": 4
                    }
                },{
                    "id": "31",
                    "name": "接种新冠病毒疫苗需不需要检查是否产生了抗体？",
                    "data":"由于在疫苗上市前的临床试验中已经做了充分的疫苗免疫原性评价，和其它大多数疫苗一样<br>接种新冠病毒疫苗后通常不再需要检查是否产生了抗体，且目前市面上抗体检测方法鱼龙混杂，因此检测后的结果并不一定可靠。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": -5,
                    "y": 60,
                    "attributes": {
                        "modularity_class": 4
                    }
                },{
                    "id": "32",
                    "name": "新冠疫苗快速上市的研发流程有哪些？",
                    "data":"新型冠状病毒疫苗从研发到上市要经过以下几个步骤：<br>一、临床前试验：<br>临床前试验的目的是掌握新型冠状病毒的抗原特征信息，选取合适的抗原组分并制作疫苗在动物模型中进行试验。初步了解疫苗是否对动物安全有效。<br>二、临床试验：药品或疫苗上市前在人群中的临床试验，分为 Ⅰ 至 Ⅲ 期。用来全面评价疫苗上市前的有效性和安全性。<br>只有前一期临床试验成功，才能进行下一期临床试验。临床试验很少一帆风顺，每一期都可能因为达不到理想的标准被暂停、推倒重来，甚至停止。<br>三、注册审批、规模生产、批签发检验：<br>疫苗三期临床试验全部完成后才能申请上市注册。如果监管部门审评认为疫苗达到安全、有效、质量可控，才能批准上市。<br>生产企业还需要准备大规模生产需要的场地、设备等。疫苗生产出来后还需要进行严格的检验，检验合格才能真正用于上市接种。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":30,
                    "x": 40,
                    "y": 100,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "33",
                    "name": "国内疫苗的研发和上市进度怎么判断？",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":40,
                    "x": 60,
                    "y": 105,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "34",
                    "name": "研发阶段",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 60,
                    "y": 90,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "35",
                    "name": "临床前",
                    "data":"在新疫苗正式用于人体前，为了保证安全性，研究人员会先在细胞上进行测试<br>然后在小鼠或猴等动物身上进行测试，查看安全性和免疫原性（效果）情况。这些都通过了可以向国家药品监督管理部门申请临床试验。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 68,
                    "y": 92,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "36",
                    "name": "Ⅰ 期临床试验",
                    "data":"针对少数人群注射疫苗，重点是观察不同剂量疫苗的安全性，部分情况也会研究人体对疫苗的免疫反应。<br>这一阶段受试者数量有限，通常为几十到上百人不等，受试者通常为 18岁以上的健康成年人。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 72,
                    "y": 96,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "37",
                    "name": "Ⅱ 期临床试验",
                    "data":"进一步确认疫苗的安全性和免疫原性，并确定疫苗剂量和免疫程序。<br>II 期临床试验人数会增加到几百至上千人，这些研究中的受试者可能包括感染传染病的高危人群。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 80,
                    "y": 100,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "38",
                    "name": "Ⅲ 期临床试验",
                    "data":"此期在几千至上万人中开展，这些试验用来确定疫苗是否能预防新型冠状病毒感染。<br>FDA 在 6 月份表示，冠状病毒疫苗必须保护至少 50％ 的疫苗接种者才被视为有效。<br>此外，III 期临床试验的规模要足以显示早期研究中可能遗漏的相对罕见的不良反应。<br>III 期临床试验的方案设计和实施要求最严格，难度也最高，历史上许多研究项目都是在 III 期试验阶段功亏一篑。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 78,
                    "y": 105,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "39",
                    "name": "Ⅳ期临床试验（正式上市）",
                    "data":"在疫苗上市后继续进行研究，这其中包括安全性、有效性、免疫持久性、联合其他疫苗接种的影响，甚至其他的潜在功效。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":10,
                    "x": 74,
                    "y": 110,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "40",
                    "name": "有限批准（紧急上市）",
                    "data":"由于疫苗 Ⅲ 期临床试验耗时较长，因此在疫情大流行期间，疫苗可能会在正式完成 Ⅲ 期临床试验并获得批准之前得到紧急使用授权，以用于一些特殊情况或特定人群。<br>中国有多款疫苗已经有限获批用于医务人员等特定人群，而不是等待Ⅲ期临床试验的结果。俄罗斯甚至连Ⅲ期临床试验都没做就批准了疫苗使用。<br>提前使用有一定必要性，但这种匆忙进行的过程同时也必然增加了安全性方面的潜在风险。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":20,
                    "x": 78,
                    "y": 120,
                    "attributes": {
                        "modularity_class": 5
                    }
                },{
                    "id": "41",
                    "name": "接种前",
                    "data":"受种者要去了解当地接种点的预约方式、接种时间、自己要做的接种准备",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":20,
                    "x": -198,
                    "y": 50,
                    "attributes": {
                        "modularity_class": 7
                    }
                },{
                    "id": "42",
                    "name": "准备证件",
                    "data":"受种者要带身份证去接种，有接种证的的要带接种证。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":20,
                    "x": -188,
                    "y": 55,
                    "attributes": {
                        "modularity_class": 7
                    }
                },{
                    "id": "43",
                    "name": "接种后",
                    "data":"按照通用要求，接种后要在留观室留观30分钟，如出现不良反应及时向医生汇报。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":20,
                    "x": -178,
                    "y": 50,
                    "attributes": {
                        "modularity_class": 7
                    }
                },{
                    "id": "44",
                    "name": "北京生物制品研究所生产疫苗",
                    "data": "点击获取具体信息。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":20,
                    "x": -78,
                    "y": 160,
                    "attributes": {
                        "modularity_class": 8
                    }
                },{
                    "id": "45",
                    "name": "北京科兴生物制品有限公司生产疫苗",
                    "data": "点击获取具体信息。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":20,
                    "x": -65,
                    "y": 170,
                    "attributes": {
                        "modularity_class": 8
                    }
                },{
                    "id": "46",
                    "name": "武汉生物制品生产疫苗",
                    "data": "点击获取具体信息。",
                    "itemStyle": {
                        "normal": {
                            "color": "rgb(236,81,72)"
                        }
                    },
                    "symbolSize":20,
                    "x": -95,
                    "y": 160,
                    "attributes": {
                        "modularity_class": 8
                    }
                }],
                "links": [{
                    "id": "0",
                    "source": "1",
                    "target": "0"
                },{
                    "id": "1",
                    "source": "2",
                    "target": "0"
                },{
                    "id": "2",
                    "source": "3",
                    "target": "0"
                },{
                    "id": "3",
                    "source": "4",
                    "target": "0"
                },{
                    "id": "4",
                    "source": "5",
                    "target": "0"
                },{
                    "id": "5",
                    "source": "6",
                    "target": "0"
                },{
                    "id": "6",
                    "source": "7",
                    "target": "0"
                },{
                    "id": "7",
                    "source": "8",
                    "target": "0"
                },{
                    "id": "8",
                    "source": "1",
                    "target": "9"
                },{
                    "id": "9",
                    "source": "1",
                    "target": "10"
                },{
                    "id": "10",
                    "source": "1",
                    "target": "11"
                },{
                    "id": "10",
                    "source": "1",
                    "target": "12"
                },{
                    "id": "11",
                    "source": "1",
                    "target": "13"
                },{
                    "id": "12",
                    "source": "1",
                    "target": "14"
                },{
                    "id": "13",
                    "source": "1",
                    "target": "15"
                },{
                    "id": "14",
                    "source": "14",
                    "target": "15"
                },{
                    "id": "15",
                    "source": "13",
                    "target": "15"
                },{
                    "id": "16",
                    "source": "12",
                    "target": "15"
                },{
                    "id": "17",
                    "source": "11",
                    "target": "15"
                },{
                    "id": "18",
                    "source": "10",
                    "target": "15"
                },{
                    "id": "19",
                    "source": "9",
                    "target": "15"
                },{
                    "id": "20",
                    "source": "13",
                    "target": "14"
                },{
                    "id": "21",
                    "source": "12",
                    "target": "14"
                },{
                    "id": "22",
                    "source": "11",
                    "target": "14"
                },{
                    "id": "23",
                    "source": "10",
                    "target": "14"
                },{
                    "id": "24",
                    "source": "9",
                    "target": "14"
                },{
                    "id": "25",
                    "source": "12",
                    "target": "13"
                },{
                    "id": "26",
                    "source": "11",
                    "target": "13"
                },{
                    "id": "27",
                    "source": "10",
                    "target": "13"
                },{
                    "id": "28",
                    "source": "9",
                    "target": "13"
                },{
                    "id": "29",
                    "source": "11",
                    "target": "12"
                },{
                    "id": "30",
                    "source": "10",
                    "target": "12"
                },{
                    "id": "31",
                    "source": "9",
                    "target": "12"
                },{
                    "id": "32",
                    "source": "10",
                    "target": "11"
                },{
                    "id": "33",
                    "source": "9",
                    "target": "11"
                },{
                    "id": "34",
                    "source": "9",
                    "target": "10"
                },{
                    "id": "35",
                    "source": "16",
                    "target": "2"
                },{
                    "id": "36",
                    "source": "17",
                    "target": "2"
                },{
                    "id": "37",
                    "source": "18",
                    "target": "2"
                },{
                    "id": "38",
                    "source": "16",
                    "target": "17"
                },{
                    "id": "39",
                    "source": "18",
                    "target": "19"
                },{
                    "id": "40",
                    "source": "18",
                    "target": "20"
                },{
                    "id": "41",
                    "source": "18",
                    "target": "21"
                },{
                    "id": "42",
                    "source": "18",
                    "target": "22"
                },{
                    "id": "43",
                    "source": "22",
                    "target": "19"
                },{
                    "id": "44",
                    "source": "22",
                    "target": "20"
                },{
                    "id": "45",
                    "source": "22",
                    "target": "21"
                },{
                    "id": "46",
                    "source": "21",
                    "target": "20"
                },{
                    "id": "47",
                    "source": "21",
                    "target": "19"
                },{
                    "id": "48",
                    "source": "20",
                    "target": "19"
                },{
                    "id": "49",
                    "source": "23",
                    "target": "3"
                },{
                    "id": "50",
                    "source": "24",
                    "target": "3"
                },{
                    "id": "51",
                    "source": "25",
                    "target": "3"
                },{
                    "id": "52",
                    "source": "26",
                    "target": "3"
                },{
                    "id": "53",
                    "source": "27",
                    "target": "3"
                },{
                    "id": "54",
                    "source": "28",
                    "target": "3"
                },{
                    "id": "55",
                    "source": "28",
                    "target": "27"
                },{
                    "id": "56",
                    "source": "28",
                    "target": "26"
                },{
                    "id": "57",
                    "source": "28",
                    "target": "25"
                },{
                    "id": "58",
                    "source": "28",
                    "target": "24"
                },{
                    "id": "59",
                    "source": "28",
                    "target": "23"
                },{
                    "id": "60",
                    "source": "27",
                    "target": "26"
                },{
                    "id": "61",
                    "source": "27",
                    "target": "25"
                },{
                    "id": "62",
                    "source": "27",
                    "target": "24"
                },{
                    "id": "63",
                    "source": "27",
                    "target": "23"
                },{
                    "id": "64",
                    "source": "26",
                    "target": "25"
                },{
                    "id": "65",
                    "source": "26",
                    "target": "25"
                },{
                    "id": "66",
                    "source": "26",
                    "target": "23"
                },{
                    "id": "67",
                    "source": "25",
                    "target": "24"
                },{
                    "id": "68",
                    "source": "25",
                    "target": "23"
                },{
                    "id": "69",
                    "source": "24",
                    "target": "23"
                },{
                    "id": "70",
                    "source": "29",
                    "target": "4"
                },{
                    "id": "71",
                    "source": "30",
                    "target": "4"
                },{
                    "id": "72",
                    "source": "31",
                    "target": "4"
                },{
                    "id": "73",
                    "source": "31",
                    "target": "30"
                },{
                    "id": "74",
                    "source": "31",
                    "target": "29"
                },{
                    "id": "75",
                    "source": "30",
                    "target": "29"
                },{
                    "id": "76",
                    "source": "32",
                    "target": "5"
                },{
                    "id": "77",
                    "source": "33",
                    "target": "5"
                },{
                    "id": "78",
                    "source": "33",
                    "target": "34"
                },{
                    "id": "79",
                    "source": "33",
                    "target": "35"
                },{
                    "id": "80",
                    "source": "33",
                    "target": "36"
                },{
                    "id": "81",
                    "source": "33",
                    "target": "37"
                },{
                    "id": "82",
                    "source": "33",
                    "target": "38"
                },{
                    "id": "83",
                    "source": "33",
                    "target": "39"
                },{
                    "id": "84",
                    "source": "33",
                    "target": "40"
                },{
                    "id": "85",
                    "source": "32",
                    "target": "33"
                },{
                    "id": "86",
                    "source": "41",
                    "target": "7"
                },{
                    "id": "87",
                    "source": "42",
                    "target": "7"
                },{
                    "id": "88",
                    "source": "43",
                    "target": "7"
                },{
                    "id": "89",
                    "source": "43",
                    "target": "42"
                },{
                    "id": "90",
                    "source": "43",
                    "target": "41"
                },{
                    "id": "91",
                    "source": "42",
                    "target": "41"
                },{
                    "id": "92",
                    "source": "44",
                    "target": "8"
                },{
                    "id": "93",
                    "source": "45",
                    "target": "8"
                },{
                    "id": "94",
                    "source": "46",
                    "target": "8"
                },{
                    "id": "95",
                    "source": "45",
                    "target": "46"
                },{
                    "id": "96",
                    "source": "44",
                    "target": "46"
                },{
                    "id": "97",
                    "source": "44",
                    "target": "45"
                },]
            }
            var categories = [{
                name:'新冠肺炎疫苗'
            },{
                name:'接种人群'
            },{
                name:'新冠疫苗分类'
            },{
                name:'接种方法'
            },{
                name:'不良反应'
            },{
                name:'紧急上市研发流程'
            },{
                name:'疫苗作用时长'
            },{
                name:'注意事项'
            },{
                name:'疫苗介绍'
            }];
            graph.nodes.forEach(function(node) {
                node.itemStyle = null;
                node.value = node.symbolSize;
                node.symbolSize /= 1.5;
                node.label = {
                    normal: {
                        show: node.symbolSize > 30
                    }
                };
                node.category = node.attributes.modularity_class;
            });
            var option1 = {
                tooltip: {
                    textStyle:{
                        align:'left'
                    },
                    formatter:function(params){
                        if(params.dataType == 'edge'){
                            return;
                        }
                        return params.marker + params.name + `<br>` + (params.data.data?params.data.data:'');
                    },
                },
                legend: [{
                    orient: 'vertical',
                    right:80,
                    top:'center',
                    textStyle:{
                        color:'white',
                    },
                    data: categories.map(function(a) {
                        return a.name;
                    })
                }],
                series: [{
                    type: 'graph',
                    layout: 'none',
                    data: graph.nodes,
                    links: graph.links,
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    categories: categories,
                    zoom:0.8,
                    roam: true,
                    focusNodeAdjacency: true,
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1,
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    },
                    label: {
                        position: 'inside',
                        formatter: '{b}',
                        color:"white",
                        textStyle:{
                            fontWeight:'bold'
                        }
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    },
                    emphasis: {
                        lineStyle: {
                            width: 10
                        }
                    }
                }]
            };
            myChart1.setOption(option1);
            var that = this;
            myChart1.on('click',function(params){
                if(params.data.data == '点击获取具体信息。'){
                    that.picTitle = params.data.name;
                    that.picUrl = '../../static/img/'+params.data.name + '.jpg';
                    that.modal1 = true;
                }
            })
        }
    }
</script>
<style>
    .map1 #myChart1 {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        background: var(--bg-darkColor);
    }
    .pic-container{
        height:500px;
        width:100%;
        margin:auto;
        overflow-y:scroll;
    }
    .pic-container::-webkit-scrollbar{
        display:none;
    }
    .ivu-modal{
        width:400px !important;
        top:40px !important;
    }
</style>