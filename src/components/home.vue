<template>
    <div class="home">
        <Tooltip content="返回顶部"  class="fix-top">
            <Icon type="md-arrow-dropup-circle" size="60" color="#ccc" @click="returnTotop"/>
        </Tooltip>
        <div class="bg1">
            <img src="../assets/bg1.jpg" alt="" class="fadeIn animated" width="100%" height="100%">
        </div>
        <div class="left animated bounceInLeft">
            <img src="../assets/logo.png" alt="" width="150px">
            <p style="font-size: 20px;margin-top: 20px;">新冠肺炎知识图谱数据可视化平台</p>
            <small style="color: #bbb;">Visualization of novel coronavirus pneumonia knowledge map data</small>
            <div>
                <button type="primary" class="tech">
                    Vue+Earth+Echarts+PyHadoop+PySpark+Flask
                    <span class="btn-tx1"></span>
                </button>
            </div>
        </div>
        <img src="../assets/p1.jpg" alt="" width="550px" class="right animated bounceInRight">
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
                        <p>基于Vue的SPA平台，用交互机制换取空间，采用axios动态更新数据，局部更新视图，使可视化交互更加流畅,体验更好！</p>
                    </div>
                </div>
                <div>
                    <div class="ld">
                        <div>
                            <img src="../assets/ld2.png" alt="" width="30px">
                        </div>
                        <h2>丰富的数据展示</h2>
                        <p>利用Echarts中各色各样的图表展示不同类型的数据，以时间线展示疫情发展趋势，结合WebGIS打造三维疫情地图！</p>
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
        beforeCreate() {
            this.$Loading.start();
        },
        mounted() {
            this.$Loading.finish();
        },
        methods:{
            returnTotop() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                console.log(1)
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
        margin-top: calc(100vh - 60px);
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
</style>