<template>
    <div class="news">
        <div class="to-rumor animated fadeInRight"><a href="/#/main/tab4/rumor">疫情谣言</a></div>
        <div class="product-section product-features">
            <div class="product-title animated fadeInDown"><img src="../assets/news-icon.png" alt="" width="50px" style="vertical-align: middle;"> 疫情新闻</div>
            <div class="product-wrapper animated fadeInUp">
                <div class="product-body swiper-container">
                    <ul class="features-slide swiper-wrapper">
                        <li class="features-item swiper-slide" v-for="item in pageData">
                            <h3><img src="../assets/time.png" alt="" width="18px" style="vertical-align: middle;margin-bottom: 4px"> {{item.realPublishTime.substring(0,11)}}</h3>
                            <i></i>
                            <a class="features-info">
                                <p class="features-info-i"></p>
                                <p class="features-info-s"><img src="../assets/title-icon.png" alt="" width="20px" style="vertical-align: middle;"> <span style="vertical-align: middle;">{{item.title}} </span></p>
                                <p style="margin-top: 10px;"><img src="../assets/from-icon.png" alt="" width="20px" style="vertical-align: middle;"> <span style="color: var(--bg-color);vertical-align: middle">来源：{{item.authorName}}</span></p>
                                <Button type="success" class="more"><a :href="item.url" target="_blank" style="color: white;">查看详情</a></Button>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next swiper-button-disabled"></div>
                <Page :total="newsTotal" style="margin:30px; transform: translateY(50px)" @on-change='changePage'/>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                newsData: [],
                pageData: [{
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }, {
                    realPublishTime: ''
                }],
                newsTotal: null
            }
        },
        methods: {
            changePage(current_page) {
                this.pageData = this.newsData.slice((current_page - 1) * 10, current_page * 10);
                this.mySwiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒
            }
        },
        mounted() {
            this.mySwiper = new Swiper(".swiper-container", {
                observer: true, //修改swiper自己或子元素时，自动初始化swiper 
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                slidesPerView: 4, //默认是显示4个
                initialSlide: 0, //默认从第几个显示
                spaceBetween: 0, //间距
                speed: 1000, //速度
                prevButton: ".swiper-button-prev", //左右按钮
                nextButton: ".swiper-button-next"
            });
            var that = this;
            var url = "https://cdn.mdeer.com/contentdtos.js?callback=callbackcontentdtos&t=";
            $.getScript(url + (new Date()));
            window.callbackcontentdtos = function(res) {
                that.newsData = res;
                that.pageData = that.newsData.slice(0, 10);
                that.newsTotal = res.length;
            }
        }
    }
</script>
<style scoped>
    @import '../../static/css/swiper-3.4.2.min.css';
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: "微软雅黑";
        font-size: 14px;
        font-weight: normal;
        font-style: normal
    }
    
    *:focus {
        outline: none
    }
    
    a {
        text-decoration: none
    }
    
    ul {
        list-style: none
    }
    
    .news {
        top: 0;
        position: fixed;
        height: 100%;
        width: 100%;
        background: var(--bg-darkColor);
    }
    
    .product-section {
        padding-bottom: 50px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
    }
    
    .product-title {
        padding: 50px 10px 30px;
        font-weight: normal;
        font-size: 36px;
        line-height: 46px;
        color: #252b3a;
        text-align: center;
        color: #ffffff;
        margin-bottom: 50px;
    }
    
    .product-wrapper {
        max-width: 1400px;
        padding-left: 10px;
        padding-right: 10px;
        margin-left: auto;
        margin-right: auto;
        position: relative
    }
    
    .swiper-container {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        z-index: 1
    }
    
    .product-features .product-body {
        margin: 0px 25px
    }
    
    .product-features .product-body:after {
        content: "";
        width: 100%;
        height: 3px;
        background: url(../assets/productBase-features-model.png) no-repeat;
        background-size: 100% auto;
        background-position: center;
        position: absolute;
        top: 50px;
        left: 0;
        z-index: 0
    }
    
    .features-item {
        position: relative;
        float: left
    }
    
    .features-slide .features-item>* {
        text-align: center
    }
    
    .features-item h3 {
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 50px;
        color: #ffffff;
        opacity: 0.7;
        transition: all 0.1s
    }
    
    .features-item i {
        position: absolute;
        width: 75%;
        height: 33px;
        background: url(../assets/productBase-features-timeline.png) no-repeat;
        background-size: contain;
        background-position: right center;
        left: -25%;
        margin-left: 10px;
        top: 35px;
        z-index: 3
    }
    
    .features-item .features-info {
        display: block;
        margin: 0 auto;
        padding: 20px 53px;
        transition: all 0.3s;
        border-radius: 2px;
        text-align: left;
    }
    
    .features-info-s {
        height: 50px;
        text-overflow: ellipsis;
    }
    
    .features-item .features-info .features-info-i {
        font-size: 14px;
        color: #A0A2A8;
        line-height: 22px;
        margin-bottom: 10px
    }
    
    .features-item .features-info .features-info-s {
        font-size: 16px;
        color: #FFFFFF;
        line-height: 24px;
        overflow: hidden
    }
    
    .features-item.dark i {
        background: url(../assets/productBase-features-timeline-dark.png) no-repeat;
        background-size: contain;
        background-position: right center
    }
    /*鼠标悬浮效果*/
    
    .features-item:hover h3 {
        font-size: 22px;
        line-height: 28px;
        opacity: 0.9
    }
    
    .features-item:hover i {
        width: 75%;
        margin-left: 13px;
        background: url(../assets/productBase-features-timeline-hover.png) no-repeat;
        background-size: contain;
        background-position: right center
    }
    
    .features-item:hover a {
        background: url(../assets/productBase-features-info.png) no-repeat;
        background-size: 100% 100%
    }
    /*左右按钮*/
    
    .product-features .swiper-button-prev {
        width: 30px;
        height: 40%;
        left: -15px;
        top: 60%;
        background: none
    }
    
    .product-features .swiper-button-prev:after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 15px;
        height: 30px;
        background: url(../assets/productBase-features-left.png) no-repeat;
        background-size: 100% 100%;
        top: 50%;
        margin-top: -15px;
        left: 50%;
        margin-left: -7px
    }
    
    .product-features .swiper-button-next {
        width: 30px;
        height: 40%;
        right: -15px;
        top: 60%;
        background: none
    }
    
    .product-features .swiper-button-next:after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 15px;
        height: 30px;
        background: url(../assets/productBase-features-right.png) no-repeat;
        background-size: 100% 100%;
        top: 50%;
        margin-top: -15px;
        left: 50%;
        margin-left: -7px
    }
    
    .more {
        width: 100px;
        margin-top: 10px;
    }
    
    .to-rumor {
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
    
    .to-rumor a {
        font-size: 16px;
        color: white;
        font-weight: bold;
    }
    
    .to-rumor:hover {
        right: -20px;
    }
</style>