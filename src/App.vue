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
    
    body::-webkit-scrollbar {
        /*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
        width: 5px;
        border-radius: 10rem;
        background: var(--bg-darkColor);
    }
    
    body::-webkit-scrollbar-button {
        /*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
        background: #eee;
        height: 5px;
    }
    
    body::-webkit-scrollbar-track {
        /*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
        background: #eee;
    }
    
    body::-webkit-scrollbar-track-piece {
        /*内层轨道，滚动条中间部分（位置4）*/
        background: #eee;
    }
    
    body::-webkit-scrollbar-thumb {
        /*滚动条里面可以拖动的那部分（位置5）*/
        background: var(--bg-color);
        border-radius: 10rem;
    }
    
    body::-webkit-scrollbar-corner {
        /*边角（位置6）*/
        background: #82AFFF;
    }
    
    body::-webkit-scrollbar-resizer {
        /*定义右下角拖动块的样式（位置7）*/
        background: #FF0BEE;
    }
    
    body {
        scrollbar-arrow-color: #f4ae21;
        /**/
        /*三角箭头的颜色*/
        scrollbar-face-color: #333;
        /**/
        /*立体滚动条的颜色*/
        scrollbar-3dlight-color: #666;
        /**/
        /*立体滚动条亮边的颜色*/
        scrollbar-highlight-color: #666;
        /**/
        /*滚动条空白部分的颜色*/
        scrollbar-shadow-color: #999;
        /**/
        /*立体滚动条阴影的颜色*/
        scrollbar-darkshadow-color: #666;
        /**/
        /*立体滚动条强阴影的颜色*/
        scrollbar-track-color: #666;
        /**/
        /*立体滚动条背景颜色*/
        scrollbar-base-color: #f8f8f8;
        /**/
        /*滚动条的基本颜色*/
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
    
    a:hover {
        text-decoration: none !important;
    }
</style>