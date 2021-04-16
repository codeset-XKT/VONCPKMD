<template>
    <div class="preloading  animated">
        <div class="loading animated">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                count: 0,
                progress: 0,
                imgLength: 0
            }
        },
        mounted() {
            // this.preload();
            var $ = {};

            $.Particle = function(opt) {
                this.radius = 7;
                this.x = opt.x;
                this.y = opt.y;
                this.angle = opt.angle;
                this.speed = opt.speed;
                this.accel = opt.accel;
                this.decay = 0.01;
                this.life = 1;
            };

            $.Particle.prototype.step = function(i) {
                this.speed += this.accel;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                this.angle += $.PI / 64;
                this.accel *= 1.01;
                this.life -= this.decay;

                if (this.life <= 0) {
                    $.particles.splice(i, 1);
                }
            };

            $.Particle.prototype.draw = function(i) {
                $.ctx.fillStyle = $.ctx.strokeStyle = 'hsla(' + ($.tick + (this.life * 120)) + ', 100%, 60%, ' + this.life + ')';
                $.ctx.beginPath();
                if ($.particles[i - 1]) {
                    $.ctx.moveTo(this.x, this.y);
                    $.ctx.lineTo($.particles[i - 1].x, $.particles[i - 1].y);
                }
                $.ctx.stroke();

                $.ctx.beginPath();
                $.ctx.arc(this.x, this.y, Math.max(0.001, this.life * this.radius), 0, $.TWO_PI);
                $.ctx.fill();

                var size = Math.random() * 1.25;
                $.ctx.fillRect(~~(this.x + ((Math.random() - 0.5) * 35) * this.life), ~~(this.y + ((Math.random() - 0.5) * 35) * this.life), size, size);
            }

            $.step = function() {
                $.particles.push(new $.Particle({
                    x: $.width / 2 + Math.cos($.tick / 20) * $.min / 2,
                    y: $.height / 2 + Math.sin($.tick / 20) * $.min / 2,
                    angle: $.globalRotation + $.globalAngle,
                    speed: 0,
                    accel: 0.01
                }));

                $.particles.forEach(function(elem, index) {
                    elem.step(index);
                });

                $.globalRotation += $.PI / 6;
                $.globalAngle += $.PI / 6;
            };

            $.draw = function() {
                $.ctx.clearRect(0, 0, $.width, $.height);

                $.particles.forEach(function(elem, index) {
                    elem.draw(index);
                });
            };

            $.init = function() {
                $.canvas = document.createElement('canvas');
                $.ctx = $.canvas.getContext('2d');
                $.width = 300;
                $.height = 300;
                $.canvas.width = $.width * window.devicePixelRatio;
                $.canvas.height = $.height * window.devicePixelRatio;
                $.canvas.style.width = $.width + 'px';
                $.canvas.style.height = $.height + 'px';
                $.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
                $.min = $.width * 0.5;
                $.particles = [];
                $.globalAngle = 0;
                $.globalRotation = 0;
                $.tick = 0;
                $.PI = Math.PI;
                $.TWO_PI = $.PI * 2;
                $.ctx.globalCompositeOperation = 'lighter';
                document.getElementsByClassName('loading')[0].appendChild($.canvas);
                $.loop();
            };

            $.loop = function() {
                requestAnimationFrame($.loop);
                $.step();
                $.draw();
                $.tick++;
            };

            $.init();
            this.preload();
        },
        methods: {
            preload() {
                let imgs = [
                    "../static/img/cured.png",
                    "../static/img/death.png",
                    "../static/img/sure.png",
                    "../static/img/time.png",
                    "../static/img/city.png",
                ];
                this.imgLength = imgs.length;
                for (let img of imgs) {
                    let image = new Image();
                    image.src = img;
                    image.onload = () => {
                        this.count++;
                        this.progress = Math.floor(this.count / this.imgLength * 100);
                    }
                }
            }
        },
        watch: {
            count() {
                var _this = this;
                if (this.count == this.imgLength) {
                    document.getElementsByClassName('loading')[0].classList.add('fadeOut');
                    setTimeout(() => {
                        _this.$router.push('/main');
                    }, 3000);
                }
            }
        }
    }
</script>

<style scoped>
    .bg {
        position: fixed;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.3;
    }
    
    .preloading {
        position: fixed;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background: var(--bg-darkColor);
    }
    
    .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        animation-delay: 2.5s;
    }
    
    .loading img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        animation: 2s rota linear infinite;
    }
    
    @keyframes rota {
        0% {
            transform: translateX(-50%) translateY(-50%) rotate(0);
        }
        25% {
            transform: translateX(-50%) translateY(-50%) rotate(15deg);
        }
        50% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
        }
        75% {
            transform: translateX(-50%) translateY(-50%) rotate(-15deg);
        }
        100% {
            transform: translateX(-50%) translateY(-50%) rotate(0);
        }
    }
    
    canvas {
        position: absolute;
        left: 50%;
        margin: auto;
        top: 50%;
    }
</style>