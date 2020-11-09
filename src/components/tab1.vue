<template>
    <h1>我是TAB1</h1>
</template>

<script>
    export default {
        beforeCreate() {
            this.$Loading.start();
        },
        mounted() {
            this.$Loading.finish();
        }
    }
</script>

<style scoped>
h1{
    text-align:center !important;
    margin-top:40px
}
</style>