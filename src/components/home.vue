<template>
    <div class="home">
        <Tooltip content="返回顶部"  class="fix-top">
            <Icon type="md-arrow-dropup-circle" size="60" color="#ccc" @click="returnTotop"/>
        </Tooltip>
        <div class="bg1">
            <img src="../assets/bg1.jpg" alt="" class="fadeIn animated" width="100%" height="100%" style="vertical-align: middle;">
        </div>
        <div class="left animated bounceInLeft">
            <img src="../assets/logo.png" alt="" width="150px">
            <p style="font-size: 20px;margin-top: 20px;">新冠肺炎交互数据可视化平台</p>
            <small style="color: #bbb;">Visualization of novel coronavirus pneumonia interaction data</small>
            <div>
                <button type="primary" class="tech">
                    Vue+Earth+Echarts+PyHadoop+PySpark+Flask
                    <span class="btn-tx1"></span>
                </button>
            </div>
        </div>
        <div class="realtime-data animated fadeInUp" v-show="finished">
            <img src="../assets/logo.png" class="real-logo">
           <div class="data-container">
            <p class="t"><img src="../assets/data-logo.png" alt="" width="40px" style="vertical-align: middle;"> 国内实时疫情数据</p>
            <div class="data-row">
                <div>
                    <p class="real-add">较上日<span style="color:rgb(211, 51, 23)">{{add_allConfirm>0?'+'+add_allConfirm:add_allConfirm}}</span></p>
                    <p class="real-num" style="color:rgb(211, 51, 23)">{{allConfirm}}</p>
                    <p class="real-name">累计确诊</p>
                </div>
                <div>
                    <p class="real-add">较上日<span style="color: rgb(34, 128, 34);">{{add_heal>0?'+'+add_heal:add_heal}}</span></p>
                    <p class="real-num" style="color: rgb(34, 128, 34);">{{heal}}</p>
                    <p class="real-name">累计治愈</p>
                </div>
            </div>
            <div class="data-row">
                <div>
                    <p class="real-add">较上日<span style="color: #555;">{{add_dead>0?'+'+add_dead:add_dead}}</span></p>
                    <p class="real-num"  style="color: #555;">{{dead}}</p>
                    <p class="real-name">累计死亡</p>
                </div>
                <div>
                    <p class="real-add">较上日<span style="color: orange;">{{add_nowConfirm>0?'+'+add_nowConfirm:add_nowConfirm}}</span></p>
                    <p class="real-num" style="color: orange;">{{nowConfirm}}</p>
                    <p class="real-name">现有确诊</p>
                </div>
            </div>
            <div class="data-row">
                <div>
                    <p class="real-add">较上日<span style="color: pink;">{{add_noInfect>0?'+'+add_noInfect:add_noInfect}}</span></p>
                    <p class="real-num" style="color: pink;">{{noInfect}}</p>
                    <p class="real-name">无症状感染者</p>
                </div>
                <div>
                    <p class="real-add">较上日<span style="color: rgb(97, 200, 235);">{{add_importedCase>0?'+'+add_importedCase:add_importedCase}}</span></p>
                    <p class="real-num" style="color: rgb(97, 200, 235);">{{importedCase}}</p>
                    <p class="real-name">境外输入</p>
                </div>
            </div>
            <p class="copyright">数据来源于腾讯新闻</p>
            <p style="margin-left: 20%;text-align: left;margin-top: 10px;">截至:{{deadline}}</p>
           </div>
        </div>
        <section class="s1">
            <Divider />
            <button type="primary" class="tech" style="font-size: 20px;font-weight: 1000;width: 250px;margin-top: 100px;">
                平台特点
                <span class="btn-tx1"></span>
            </button>
            <div class="s1-1">
                <div>
                    <div class="ld">
                        <div>
                            <img src="../assets/ld1.png" alt="" width="30px">
                        </div>
                        <h2>动态交互式可视化</h2>
                        <p>基于Vue的SPA平台，用交互机制换取空间，采用ajax动态更新数据，局部更新视图，使可视化交互更加流畅,体验更好！</p>
                    </div>
                </div>
                <div>
                    <div class="ld">
                        <div>
                            <img src="../assets/ld2.png" alt="" width="30px">
                        </div>
                        <h2>丰富的数据展示</h2>
                        <p>利用Echarts中各色各样的图表展示不同类型的数据，以时间线展示疫情发展趋势，多维度动态演示与时空分析！</p>
                    </div>
                </div>
                <div>
                    <div class="ld">
                        <div>
                            <img src="../assets/ld3.png" alt="" width="30px">
                        </div>
                        <h2>多维度的可视分析</h2>
                        <p>针对疫情数据的多维时空特征构建病例数量数据集，在数据预处理的基础上，提出多种新冠肺炎疫情可视化模型！</p>
                    </div>
                </div>
            </div>
        </section>
        <Divider />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                allConfirm: null,
                nowConfirm: null,
                dead: null,
                heal: null,
                importedCase: null,
                noInfect: null,
                add_allConfirm: null,
                add_nowConfirm: null,
                add_dead: null,
                add_heal: null,
                add_importedCase: null,
                add_noInfect: null,
                deadline: null,
                finished: false
            }
        },
        beforeCreate() {
            this.$Loading.start();
        },
        mounted() {
            this.$Loading.finish();
            var that = this;
            $.ajax({
                type: "get",
                url: "/api/g2/getOnsInfo?name=disease_h5",
                dataType: "json",
                success: function(res) {
                    let data = JSON.parse(res.data);
                    console.log(JSON.parse(res.data));
                    that.allConfirm = data.chinaTotal.confirm;
                    that.nowConfirm = data.chinaTotal.nowConfirm;
                    that.dead = data.chinaTotal.dead;
                    that.heal = data.chinaTotal.heal;
                    that.importedCase = data.chinaTotal.importedCase;
                    that.noInfect = data.chinaTotal.noInfect;
                    that.add_allConfirm = data.chinaAdd.confirm;
                    that.add_nowConfirm = data.chinaAdd.nowConfirm;
                    that.add_dead = data.chinaAdd.dead;
                    that.add_heal = data.chinaAdd.heal;
                    that.add_importedCase = data.chinaAdd.importedCase;
                    that.add_noInfect = data.chinaAdd.noInfect;
                    that.deadline = data.lastUpdateTime;
                    that.finished = true;
                }
            });
        },
        methods: {
            returnTotop() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            },
        }
    }
</script>

<style scoped>
    .fix-top {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 999;
        opacity: .8;
    }
    
    .bg1 {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        filter: brightness(.4);
        overflow: hidden;
    }
    
    .bg1 img {
        vertical-align: middle;
    }
    
    .tech {
        position: relative;
        margin-top: 20px;
        padding: 20px;
        border: none;
        border-radius: 10rem;
        background: var(--bg-color);
        color: #eee;
        overflow: hidden;
        outline: none;
        transition: all 0.3s ease;
    }
    
    .left {
        position: absolute;
        top: calc(50% - 133px);
        margin-left: 100px;
        animation-duration: 2s;
        font-family: "Hiragino Sans GB";
    }
    
    .right {
        position: absolute;
        right: 20px;
        bottom: -120px;
        z-index: 99;
        animation-duration: 2s;
    }
    
    .btn-tx1 {
        display: block;
        position: absolute;
        top: 50%;
        left: -20px;
        background: rgba(255, 255, 255, .4);
        height: 100px;
        width: 15px;
        transform: translateY(-50%) rotate(-30deg);
        transition: all 1s ease-in-out;
    }
    
    .tech:hover .btn-tx1 {
        left: calc(100% + 20px);
    }
    
    .tech:hover {
        color: #fff;
    }
    
    .s1 {
        position: relative;
        top: 0;
        margin-top: calc(100vh - 80px);
        overflow: hidden;
        background: var(--bg-darkColor);
        padding-bottom: 80px;
    }
    
    .s1 h1 {
        margin-top: 50px;
        font-weight: 500;
    }
    
    .s1-1 {
        display: flex;
        flex-direction: row;
        width: 80%;
        margin-left: 10%;
    }
    
    .s1-1>div {
        position: relative;
        width: 25%;
        margin-top: 80px;
        margin-left: calc(25%/4);
        text-align: center;
        height: 20vw;
        background: var(--bg-color);
        border-radius: 10px;
        margin-bottom: 30px;
        overflow: hidden;
    }
    
    .ld {
        position: relative;
        top: 100%;
        transform: translateY(-100%);
        background: #fff;
    }
    
    .ld h2 {
        padding-top: 50px;
        padding-bottom: 10px;
        color: #333;
        font-weight: normal;
    }
    
    .ld p {
        text-align: left;
        padding: 15px;
        color: #888;
        padding-bottom: 30px;
    }
    
    .ld>div {
        position: absolute;
        top: 0;
        left: 50%;
        background: var(--bg-color);
        transform: translateX(-50%) translateY(-50%);
        padding: 15px;
        border: 4px solid #fff;
        border-radius: 50%;
    }
    
    .ld img {
        vertical-align: middle;
    }
    
    .ivu-divider-horizontal {
        margin-top: 0px;
        margin-bottom: 0px;
        height: 4px;
    }
    
    .realtime-data {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 99;
        height: 600px;
        width: 500px;
        border-top-left-radius: 15px;
        background: linear-gradient(-150deg, #4ad8c3bb, #83a2f1b7);
    }
    
    .realtime-data .t {
        font-size: 20px;
        font-weight: bolder;
    }
    
    .data-row {
        width: 80%;
        margin-left: 10%;
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        justify-content: space-around;
    }
    
    .real-add {
        color: #eee;
    }
    
    .real-num {
        font-size: 18px;
        font-weight: bolder;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    
    .real-name {
        background: rgba(238, 238, 238, 0.61);
        padding: 5px;
        color: #333;
        border-radius: 5px;
        width: 100px;
    }
    
    .data-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .copyright {
        text-align: left;
        margin-left: 20%;
        margin-top: 60px;
    }
    
    .real-logo {
        position: absolute;
        left: 30px;
        bottom: 30px;
        width: 100px;
        transform: rotate(30deg);
        opacity: .5;
    }
</style>