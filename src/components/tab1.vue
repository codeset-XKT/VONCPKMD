<template>
    <div class="tab1">
        <router-view class="view"></router-view>
        <button class="router-btn" @click="changeRouter()">切换视图</button>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                transitionName: '',
                routers: ['chinaCurrent', 'chinaTrend'],
                routerIndex: 0
            }
        },
        methods: {
            changeRouter() {
                this.routerIndex++;
                this.routerIndex = this.routerIndex % 2;
                this.$router.push(this.routers[this.routerIndex]);
            }
        },
    }
</script>

<style scoped>
    .router-btn {
        position: fixed;
        right: 0px;
        bottom: 0px;
        width: 100px;
        padding: 10px;
        background: linear-gradient(-150deg, #3db3a1, #6982c0);
        outline: none;
        border: none;
        color: #ddd;
        cursor: pointer;
        border-top-left-radius: 3px;
        border: 2px solid #ddd;
        border-right: none;
        border-bottom: none;
        transition: all 0.3s ease;
        font-weight: bold;
    }
    
    .router-btn:hover {
        border-color: #fff;
        color: #fff;
    }
</style>