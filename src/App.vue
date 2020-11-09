<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
     :root {
        --bg-color: linear-gradient(-150deg, #4ad8c3, #83a2f1);
        /* --bg-darkColor:linear-gradient(-150deg, #4ad8c35e, #83a2f150); */
        --bg-darkColor: linear-gradient(-150deg, #1c4f48, #28354b);
    }
    
    body {
        overflow-x: hidden !important;
        background: #181f2c;
    }
    
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>