<template>
    <router-view></router-view>
    <!-- <div style="background:var(--bg-darkColor)">
        <div style="background: #eee;margin-top: 100px;" class="bbxz">
            <img src="../assets/bb.png" alt="">
            <p>疫情报表下载</p>
            <div class="time-picker">
                <RadioGroup v-model="duration" type="button" style="margin-right: 20px;">
                    <Radio label="周报"></Radio>
                    <Radio label="月报"></Radio>
                </RadioGroup>
                <DatePicker type="date" placeholder="起始日期" style="width: 200px;margin-right: 10px;" disabled></DatePicker>
                <DatePicker type="date" placeholder="截至日期" style="width: 200px;margin-right: 10px"></DatePicker>
                <Button type="primary" style="height: 30.8px;">生成报表</Button>
            </div>
            <Row style="padding-top: 50px;">
                <Col span="8" offset="3" style="transform: scale(1);" v-for="(i,index) in 2" :key="index">
                    <div class="report-formV">
                        <img src="../assets/logo.png" alt="" width="80px" class="sy">
                        <h1>疫情数值报表</h1>
                        <p>COVID-19 Weekly <small style="float: right;">2020.11.1 - 2020.11.8</small></p>
                        <Button type="success" style="width: 80%;margin-top: 30px;">Success</Button>
                        <div class="gn" v-for="item in 2">
                            <h1>{{item=='1'?'国内':'国外'}}疫情状况</h1>
                            <div>
                                <div>
                                    <h2 style="color: tomato;">14215</h2>
                                    <p style="color:#333;font-weight: 800;">现存确诊</p>
                                    <p style="color: #999;font-size: 13px;margin-top: 10px;">较上周 <span style="color: tomato;">-100</span> </p>
                                </div>
                                <hr style="width: 2px;height: 60px; background: #eee;border-radius: 10rem;border:1px solid #fff;"></hr>
                                <div>
                                    <h2 style="color: orange;">215</h2>
                                    <p style="color:#333;font-weight: 800;">境外输入</p>
                                    <p style="color: #999;font-size: 13px;margin-top: 10px;">较上周 <span style="color: orange;">-100</span> </p>
                                </div>
                                <hr style="width: 2px;height: 60px; background: #eee;border-radius: 10rem;border:1px solid #fff;"></hr>
                                <div>
                                    <h2 style="color: #4d86a1;">14215</h2>
                                    <p style="color:#333;font-weight: 800;">现存重症</p>
                                    <p style="color: #999;font-size: 13px;margin-top: 10px;">较上周 <span style="color: #4d86a1;">-100</span> </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h2 style="color:#9d424a;">44215</h2>
                                    <p style="color:#333;font-weight: 800;">累计确诊</p>
                                    <p style="color: #999;font-size: 13px;margin-top: 10px;">较上周 <span style="color: #9d424a;">-100</span> </p>
                                </div>
                                <hr style="width: 2px;height: 60px; background: #eee;border-radius: 10rem;border:1px solid #fff;"></hr>
                                <div>
                                    <h2 style="color: #4a557b;">14215</h2>
                                    <p style="color:#333;font-weight: 800;">累计死亡</p>
                                    <p style="color: #999;font-size: 13px;margin-top: 10px;">较上周 <span style="color: #4a557b;">-100</span> </p>
                                </div>
                                <hr style="width: 2px;height: 60px; background: #eee;border-radius: 10rem;border:1px solid #fff;"></hr>
                                <div>
                                    <h2 style="color: #3abd9f;">34215</h2>
                                    <p style="color:#333;font-weight: 800;">累计治愈</p>
                                    <p style="color: #999;font-size: 13px;margin-top: 10px;">较上周 <span style="color: #3abd9f;">-100</span> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>

    </div> -->
</template>

<script>
    export default {
        data() {
            return {
                duration: '周报',
            }
        },
        beforeCreate() {
            this.$Loading.start();
        },
        mounted() {
            this.$Loading.finish();
        }
    }
</script>
<style scoped>
    .bbxz {
        position: relative;
    }
    
    .bbxz>img {
        position: absolute;
        width: 80px;
        top: 0;
        transform: translateY(-50px);
        left: 100px;
    }
    
    .bbxz>p {
        position: absolute;
        top: 0;
        transform: translateY(calc(-100% - 5px));
        left: 180px;
        font-size: 16px;
        font-weight: 800;
    }
    
    .report-formV {
        background: var(--bg-color);
        padding: 20px;
        padding-top: 40px;
        margin-bottom: 40px;
        border-radius: 10px;
    }
    
    .report-formV * {
        color: #fff;
        text-align: left;
    }
    
    .report-formV>h1 {
        font-size: 35px;
    }
    
    .report-formV>p {
        font-size: 20px;
    }
    
    .gn {
        background: #fff;
        padding: 20px;
        margin-top: 20px;
        border-radius: 20px;
    }
    
    .gn>h1 {
        color: #6182c4;
    }
    
    .gn>div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 20px;
        align-items: center;
    }
    
    .gn>div>div * {
        text-align: center;
    }
    
    .gn>div>div h2 {
        font-size: 25px;
    }
    
    .time-picker {
        position: absolute;
        top: -45px;
        right: 40px;
    }
    
    .ivu-radio-group-button .ivu-radio-wrapper-checked {
        background: var(--bg-color) !important;
        transition: background 3s ease;
        color: #fff !important;
        border: none !important;
        box-shadow: none !important;
    }
    
    .ivu-radio-focus,
    .ivu-radio-default {
        background: #fff !important;
        border-radius: 4px;
        border: none !important;
    }
    
    .ivu-radio-wrapper {
        transition: background 3s ease;
        border: none !important;
    }
    
    .ivu-radio-group-button .ivu-radio-wrapper:after {
        width: 0;
    }
    
    .ivu-radio-group-button .ivu-radio-wrapper:hover {
        color: #515a6e;
    }
    
    .sy {
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 0;
        opacity: .3;
        transform: rotate(30deg);
    }
</style>