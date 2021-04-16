<template>
    <div class="product-section product-features">
	<div class="product-title">新特性</div>
	<div class="product-wrapper">
		<div class="product-body swiper-container">
			<ul class="features-slide swiper-wrapper">
				<li class="features-item swiper-slide">
					<h3>2017-01-30</h3>
					<i></i>
					<a class="features-info">
						<p class="features-info-i"></p>
						<p class="features-info-s"> 支持通过VPC与弹性云服务器进行混合组网 </p>

					</a>
				</li>

				<li class="features-item swiper-slide">
					<h3>2017-03-30</h3>
					<i></i>
					<a class="features-info">
						<p class="features-info-i"></p>
						<p class="features-info-s"> 支持云硬盘在线挂载、卸载，弹性扩容 </p>

					</a>
				</li>

				<li class="features-item swiper-slide">
					<h3>2017-07-30</h3>
					<i></i>
					<a class="features-info">
						<p class="features-info-i"></p>
						<p class="features-info-s"> 支持裸金属服务器自动化发放 </p>

					</a>
				</li>

				<li class="features-item swiper-slide">
					<h3>2017-11-30</h3>
					<i></i>
					<a class="features-info">
						<p class="features-info-i"></p>
						<p class="features-info-s"> 支持私有镜像，支撑企业业务部署 </p>

					</a>
				</li>

				<li class="features-item swiper-slide">
					<h3>2018-08-30</h3>
					<i></i>
					<a class="features-info">
						<p class="features-info-i"></p>
						<p class="features-info-s">支持VMware和XenServer等第三方虚拟化</p>

					</a>
				</li>

				<li class="features-item swiper-slide dark">
					<h3>即将上线</h3>
					<i></i>
					<a class="features-info">
						<p class="features-info-i"></p>
						<p class="features-info-s"> 本地硬盘自定义RAID等功能 </p>

					</a>
				</li>
			</ul>
		</div>
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next swiper-button-disabled"></div>
	</div>
</div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted() {
            var mySwiper = new Swiper(".swiper-container", {
                slidesPerView: 4, //默认是显示4个
                initialSlide: 999, //默认从第几个显示，999是为了让右边没有
                spaceBetween: 0, //间距
                speed: 1000, //速度
                prevButton: ".swiper-button-prev", //左右按钮
                nextButton: ".swiper-button-next"
            });
        }
    }
</script>
<style scoped>
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
    
    .product-section {
        padding-bottom: 50px;
        position: relative;
        background: url(../images/productBase-features-bag.jpg) no-repeat;
        background-size: cover
    }
    
    .product-title {
        padding: 50px 10px 30px;
        font-weight: normal;
        font-size: 36px;
        line-height: 46px;
        color: #252b3a;
        text-align: center;
        color: #ffffff
    }
    
    .product-wrapper {
        max-width: 1200px;
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
        background: url(../images/productBase-features-model.png) no-repeat;
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
        background: url(../images/productBase-features-timeline.png) no-repeat;
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
        border-radius: 2px
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
        background: url(../images/productBase-features-timeline-dark.png) no-repeat;
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
        background: url(../images/productBase-features-timeline-hover.png) no-repeat;
        background-size: contain;
        background-position: right center
    }
    
    .features-item:hover a {
        background: url(../images/productBase-features-info.png) no-repeat;
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
        background: url(../images/productBase-features-left.png) no-repeat;
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
        background: url(../images/productBase-features-right.png) no-repeat;
        background-size: 100% 100%;
        top: 50%;
        margin-top: -15px;
        left: 50%;
        margin-left: -7px
    }
</style>