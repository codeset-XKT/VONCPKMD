<template>
    <div class="rumor">
    <div class="to-news animated fadeInRight"><a href="/#/main/tab4/news">疫情新闻</a></div>
    <div class="animated fadeInDown rumor-top"><img src="../assets/bb.png" alt="" width="50px" style="vertical-align: middle;"> 疫情谣言</div>
    <div class="swiper">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in pageData">
                    <img :src="item.rumorType==0?'../../static/img/yy-logo.png':item.rumorType==1?'../../static/img/kx-logo.png':'../../static/img/swdl-logo.png'" alt="" width="100px" class="result">
                    <div class="order"><span class="order-span">{{index+1}}</span></div>
                    <div class="data-from">
                        <p>数据来源：丁香园</p>
                        <img src="../assets/dxy-logo.png" alt="" width="120px">
                    </div>
                    <h3><img src="../assets/bb.png" alt="" width="40px" style="vertical-align: middle;"> {{item.title}}</h3>
                    <div class="more-info">
                        <img src="../assets/logo.png" alt="" width="100px" class="pt-logo">
                        <p class="rumor-title">{{item.mainSummary}}</p>
                        <p class="rumor-text">{{item.body}}</p>      
                    </div>              
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
        <Page :total="rumorTotal" @on-change='changePage' style="margin-top: 30px;" />
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rumorData: [],
                pageData: [],
                swiper: null,
                rumorTotal: null
            }
        },
        methods: {
            changePage(current_page) {
                this.pageData = this.rumorData.slice((current_page - 1) * 10, current_page * 10);
                this.swiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒
            }
        },
        mounted() {
            var that = this;
            that.swiper = new Swiper('.swiper-container', {
                observer: true, //修改swiper自己或子元素时，自动初始化swiper 
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: true,
                loop: false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
            $.ajax({
                url: "https://file1.dxycdn.com/2020/0130/454/3393874921745912507-115.json?t=" + new Date(),
                type: "get",
                dataType: "json",
                success: function(data) {
                    that.rumorData = data.data;
                    that.pageData = that.rumorData.slice(0, 10);
                    that.rumorTotal = data.data.length;
                },
                error: function(err) {
                    console.log(err)
                }
            });

        }
    }
</script>

<style scoped>
    @import '../../static/css/swiper-3.4.2.min.css';
    .rumor {
        top: 0;
        position: fixed;
        height: 100%;
        width: 100%;
        background: var(--bg-darkColor);
    }
    
    .to-news {
        position: absolute;
        right: -130px;
        top: 120px;
        padding: 10px;
        padding-right: 20px;
        background: var(--bg-color);
        width: 150px;
        border-radius: 0.3rem;
        border: 2px solid white;
        transition: all 0.4s ease;
        cursor: pointer;
    }
    
    .to-news a {
        font-size: 16px;
        color: white;
        font-weight: bold;
    }
    
    .to-news:hover {
        right: -20px;
    }
    
    .swiper {
        position: relative;
        top: 25%;
        left: 5%;
        width: 90%;
        height: 60%;
    }
    
    .swiper-container {
        width: 100%;
        height: 100%;
    }
    
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: var(--bg-color);
        border-radius: 0.5rem;
        transition: 300ms;
        transform: scale(0.8);
        overflow: hidden;
    }
    
    .swiper-slide h3 {
        margin-top: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
        transform: scale(1);
    }
    
    .more-info {
        background: rgba(255, 255, 255, 0.904);
        color: #333;
        margin: 15px;
        padding: 15px;
        border-radius: 5px;
        position: relative;
        margin-top: 10px;
    }
    
    .rumor-title {
        color: rgb(45, 140, 240);
        text-align: left;
        font-weight: bold;
    }
    
    .rumor-text {
        color: rgb(45, 140, 240);
        font-size: 16px;
        text-align: left;
        margin-top: 5px;
    }
    
    .pt-logo {
        position: absolute;
        left: 10px;
        bottom: 10px;
        transform: rotate(30deg);
        opacity: .3;
    }
    
    .order {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 140px;
        height: 70px;
        background-size: cover;
        background-repeat: no-repeat;
        transform: skew(45deg) translateX(-70px);
        background: tomato;
        border-top: 4px solid white;
        border-right: 6px solid white;
        opacity: .8;
        z-index: 999;
    }
    
    .order-span {
        position: absolute;
        bottom: 15px;
        left: 75px;
        transform: skew(-45deg);
        font-weight: bold;
        padding: 2px;
        border-radius: 10rem;
        background: white;
        height: 30px;
        width: 30px;
        color: tomato;
    }
    
    .data-from {
        position: absolute;
        right: 10px;
        bottom: 0px;
    }
    
    .data-from p {
        font-size: 15px;
        font-weight: bold;
        text-align: right;
        margin-bottom: 5px;
    }
    
    .result {
        position: absolute;
        bottom: 50px;
        right: 10px;
        z-index: 99;
        width: 100px;
        height: 100px;
    }
    
    .rumor-top {
        position: absolute;
        top: 80px;
        width: 100%;
        margin: auto;
        font-size: 30px;
    }
</style>