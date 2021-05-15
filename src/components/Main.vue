<template>
    <div style="color:#eee" class="main">
    
    <Menu mode="horizontal" :theme="theme1" :active-name="activeItem()" class="slideInDown animated">
        <div class="nav-mask"></div>
        <span style="float: left;margin-left: 20px;">
            <img src="../assets/logo.png" alt="" width="30" style="vertical-align: middle;margin-right: 10px;">
            <span style="vertical-align: middle;color:#eee">新冠肺炎交互数据可视化平台</span>
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
                <DropdownItem>made</DropdownItem>
                <DropdownItem>by</DropdownItem>
                <DropdownItem disabled>yx142214</DropdownItem>
                <DropdownItem>USC</DropdownItem>
                <DropdownItem divided><a href="https://gitee.com/yx142214" style="font-size:12px">gitee adress</a></DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <MenuItem name="5"  style="margin-right: 20px;" to="/main/tab4">
            <Icon type="ios-list-box-outline" />
            新闻谣言
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
                <img src="../assets/logo.png" alt="" width="50px"><span>新冠肺炎交互数据可视化平台</span>
                <p style="margin-top: 20px;font-size: 12px;color: #999;">平台意义：一是能够让用户直观便捷地观察到疫情的动态趋势实现预警于民，二是设计出合理的可视化方案，借助于人眼快速的视觉感知和人脑的智能认知能力，通过可视化交互加深用户对疫情数据的理解并辅助数据的分析，三是结合知识图谱可视化技术，构建出几种新冠知识图谱并进行交互可视化，以图谱的方式向用户普及新冠相关的知识网络。从而做到疫情的实时追踪与预警，辅助预防、分析和把控新冠肺炎疫情的发展。</p>
                <p style="margin-top: 20px;margin-bottom: 40px;font-size: 12px;color: #999;">©VONCPKMD 2020-2021<br>转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源。</p>
            </Col>
            <Col span="8" offset="2" class="footer-right">
                <p style="font-size: 20px;font-weight: 1000;margin-top: 50px;color: #aaa;">技术支持</p>
                <p style="margin-top: 40px;color: #aaa;">Vue &nbsp; Echarts &nbsp; IviewUI &nbsp; AJAX &nbsp; Animate &nbsp; Swiper</p>
                <div>
                    <img src="../assets/s1.jpg" alt="" width="40px">
                    <img src="../assets/s2.jpg" alt="" width="40px">
                    <img src="../assets/s3.png" alt="" width="40px">
                    <img src="../assets/s4.jpg" alt="" width="40px">
                    <img src="../assets/s5.png" alt="" width="40px">
                    <img src="../assets/s6.png" alt="" width="40px">
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
            showFooter() {
                if (this.$route.path == '/main/tab4' || this.$route.path == '/main/home') {
                    return true;
                } else {
                    return false;
                }
            },
            activeItem() { //导航栏栏目显示
                switch (this.$route.path) {
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
                    case '/main/tab3/map1':
                        return '4';
                        break;
                    case '/main/tab3/map2':
                        return '4';
                        break;
                    case '/main/tab3/map3':
                        return '4';
                        break;
                    case '/main/tab4/news':
                        return '5';
                        break;
                    case '/main/tab4/rumor':
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
    
    .nav-mask {
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.274), rgba(0, 0, 0, 0));
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
        pointer-events: none;
    }
</style>