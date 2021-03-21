<template>
    <div style="color:#eee">
    
    <Menu mode="horizontal" :theme="theme1" :active-name="activeItem()" class="slideInDown animated">
        <span style="float: left;margin-left: 20px;">
            <img src="../assets/logo.png" alt="" width="30" style="vertical-align: middle;margin-right: 10px;">
            <span style="vertical-align: middle;">新冠肺炎知识图谱数据可视化平台</span s>
            <Divider type="vertical" />
            <AutoComplete
                v-model="value1"
                icon="ios-search"
                :data="data1"
                @on-search="handleSearch1"
                placeholder="请输入关键词"
                style="width:300px;margin-left: 30px;">
            </AutoComplete>
        </span>
        <Dropdown style="margin-right: 40px;float: right;">
            <Button type="primary">
                <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem>驴打滚</DropdownItem>
                <DropdownItem>炸酱面</DropdownItem>
                <DropdownItem disabled>豆汁儿</DropdownItem>
                <DropdownItem>冰糖葫芦</DropdownItem>
                <DropdownItem divided>北京烤鸭</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <MenuItem name="5"  style="margin-right: 20px;" to="/main/tab4">
            <Icon type="md-download" />
            报表下载
        </MenuItem>
        <MenuItem name="4" to="/main/tab3">
            <Icon type="ios-paper" />
            知识图谱
        </MenuItem>
        <MenuItem name="3" to="/main/tab2">
            <Icon type="logo-python" />
            时空分析
        </MenuItem>
        <MenuItem name="2" to="/main/tab1">
            <Icon type="md-pulse" />
            趋势挖掘
        </MenuItem>
        <MenuItem name="1" to="/main/home">
            <Icon type="md-home" />
            首页
        </MenuItem>
    </Menu>
    <br>
    <router-view/>
    <footer v-if="showFooter()" :id="this.$route.path">
        <Row>
            <Col span="10" offset="2" class="footer-left">
                <img src="../assets/logo.png" alt="" width="50px"><span>新冠肺炎知识图谱数据可视化平台</span>
                <p style="margin-top: 40px;font-size: 12px;color: #999;">平台致力于挖掘分析新冠肺炎疫情大数据，利用知识图谱等相关技术构建疫情大数据可视化模型，将疫情大数据以一种直观、容易理解和操纵的方式呈现给用户，展示新冠肺炎的疫情动态、发展趋势以及与相关知识载体之间的联系。</p>
                <p style="margin-top: 40px;margin-bottom: 40px;font-size: 12px;color: #999;">©VONCPKMD 2020-2021<br>转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源。</p>
            </Col>
            <Col span="8" offset="2" class="footer-right">
                <p style="font-size: 20px;font-weight: 1000;margin-top: 50px;color: #aaa;">技术支持</p>
                <p style="margin-top: 40px;color: #aaa;">Vue &nbsp; Echarts &nbsp; Earth &nbsp; Pyhadoop &nbsp; PySpark</p>
                <div>
                    <img src="../assets/s1.jpg" alt="" width="40px">
                    <img src="../assets/s2.jpg" alt="" width="40px">
                    <img src="../assets/s3.jpg" alt="" width="40px">
                    <img src="../assets/s4.jpg" alt="" width="40px">
                    <img src="../assets/s5.jpg" alt="" width="40px">
                </div>
            </Col>
        </Row>
    </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                theme1: 'dark',
                value1: '',
                data1: []
            }
        },
        methods: {
            handleSearch1(value) {
                this.data1 = !value ? [] : [
                    value,
                    value + value,
                    value + value + value
                ];
            },
            showFooter(){
                if(this.$route.path=='/main/tab4'||this.$route.path=='/main/home'){
                    return true;
                }else{
                    return false;
                }
            },
            activeItem(){ //导航栏栏目显示
                switch(this.$route.path){
                    case '/main/home':
                        return '1';
                        break;
                    case '/main/tab1/':
                        return '2';
                        break;
                    case '/main/tab1/chinaCurrent':
                        return '2';
                        break;
                    case '/main/tab1/chinaTrend':
                        return '2';
                        break;
                    case '/main/tab2':
                        return '3';
                        break;
                    case '/main/tab3':
                        return '4';
                        break;
                    case '/main/tab4':
                        return '5';
                        break;
                    default:
                        return '1';
                        break;
                }
            }
        }
    }
</script>

<style scode>
    span {
        color: #eee;
    }
    
    .ivu-menu-dark {
        /* background: rgba(0, 0, 0, .3) !important; */
        background: none !important;
    }
    
    .ivu-menu-item {
        float: right !important;
    }
    
    .ivu-select-item {
        text-align: left;
    }
    
    .ivu-input {
        height: auto;
    }
    
    footer {
        background: var(--bg-darkColor);
    }
    
    .footer-left>* {
        vertical-align: middle;
        color: #aaa;
    }
    
    .footer-left {
        margin-top: 40px;
        text-align: left;
    }
    
    .footer-left span {
        margin-left: 10px;
        color: #aaa;
    }
    
    .footer-right>* {
        text-align: left;
    }
    
    .footer-right img {
        border-radius: 5px;
        margin-top: 40px;
        margin-right: 10px;
        opacity: .8;
    }
    
    .ivu-divider,
    .ivu-divider-vertical {
        top: 0;
    }
</style>