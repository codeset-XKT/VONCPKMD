<template>
    <div class="tab1">
        <router-view class="view"></router-view>
        <button class="router-btn" @click="changeRouter()">切换</button>
    </div>
</template>
<script>
  export default {
    name: 'App',
    data(){
        return {
            transitionName:'',
            routers:['chinaCurrent','chinaTrend'],
            routerIndex:0
        }
    },
    methods:{
        changeRouter(){
            this.routerIndex++;
            this.routerIndex = this.routerIndex%2;
            this.$router.push(this.routers[this.routerIndex]);
        }
    },
  }
</script>

<style scoped>
  .router-btn{
    position:fixed;
    right:20px;
    bottom:20px;
    width:100px;
  }
</style>
