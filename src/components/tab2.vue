<template>
    <div>
        <China v-on:thisIsChina="thisIsWorld" v-if="isChina"></China>
        <World v-on:thisIsChina="thisIsChina" v-else></World>
        <div class="back" @click="thisIsWorld" v-if="isChina">返回</div>
    </div>
</template>

<script>
import China from '../components/tab2_china.vue';
import World from '../components/tab2_world.vue';
export default{
    components:{China,World},
    data(){
        return{
            isChina:false
        }
    },
    methods:{
        thisIsChina(data){
            // this.isChina = data;
            console.log(data);
            this.isChina = true;
        },
        thisIsWorld(){
            this.isChina = false;
        }
    }
}
</script>
<style scoped> 
.back{
    position:absolute;
    left:21%;
    top:120px;
    margin-left:20px;
    transform: translateY(-50%);
    padding:5px;
    width:80px;
    cursor:pointer;
    background: linear-gradient(-150deg, #3db3a1, #6982c0);
    border:1.5px solid #ddd;
    z-index:99;
    border-radius:5px;
    color:#ddd;
    transition:all 0.5 ease;
}
.back:hover{
    color:#fff;
    border-color:#fff;
    background:var(--bg-color);
}
</style>