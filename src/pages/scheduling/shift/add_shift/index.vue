<template>
    <div class="wrapper">
        <div class="panel">
            <van-cell-group>
                <van-field
                    label-class="filed_label"
                    label="名称"
                    :value="shift.name"
                    placeholder="请输入班次名称"
                    :border="false"
                    @change="changeShiftName"
                    input-align="right"
                />
            </van-cell-group>
            <div class="timeSlot">
                <div class="timeBlock">
                    <!-- <div class="box">
                        <div class="left">
                            
                        </div>
                        <div class="right"></div>
                    </div> -->
                    <div class="timeWrap">
                        <picker
                            class="picker"
                            mode="multiSelector"
                            :value="multiIndex"
                            @change="bindMultiPickerChange"
                            :disabled="checked"
                            :range="newMultiArray"
                            >
                            <input
                                type="text"
                                v-if="month == ''"
                                placeholder="开始时间"
                                disabled
                                placeholder-class="placeholder"
                            />
                            <div class="box">
                                <p>
                                {{ month }}{{ day }} <span v-if="!checked">{{ startDay }}</span>
                                </p>
                                <p>{{ !checked ? hours : startDay }}</p>
                            </div>
                        </picker>
                        <div class="imgBox">
                        <img src="https://wx.phxinfo.com.cn/img/wechat/2845.png" alt="" />
                        </div>
                        <picker
                            class="picker"
                            mode="multiSelector"
                            :value="endmultiIndex"
                            @change="endbindMultiPickerChange"
                            :disabled="checked"
                            :range="newMultiArray"
                            >
                            <input
                                type="text"
                                v-if="endMonth == ''"
                                placeholder="结束时间"
                                disabled
                                placeholder-class="placeholder"
                            />
                            <div class="box rBox">
                                <p>
                                {{ endMonth }}{{ endDay }}
                                <span v-if="!checked">{{ endWeek }}</span>
                                </p>
                                <p>{{ !checked ? endHours : endWeek }}</p>
                            </div>
                        </picker>
                    </div>
                    <div class="timeWrap" v-if="isTimeTwo">
                        <picker
                            class="picker"
                            mode="multiSelector"
                            :value="multiIndexTwo"
                            @change="bindMultiPickerChangeTwo"
                            :disabled="checkedTwo"
                            :range="newMultiArray"
                            >
                            <input
                                type="text"
                                v-if="monthTwo == ''"
                                placeholder="开始时间"
                                disabled
                                placeholder-class="placeholder"
                            />
                            <div class="box">
                                <p>
                                {{ monthTwo }}{{ dayTwo }} <span v-if="!checked">{{ startDayTwo }}</span>
                                </p>
                                <p>{{ !checkedTwo ? hoursTwo : startDayTwo }}</p>
                            </div>
                        </picker>
                        <div class="imgBox">
                        <img src="https://wx.phxinfo.com.cn/img/wechat/2845.png" alt="" />
                        </div>
                        <picker
                            class="picker"
                            mode="multiSelector"
                            :value="endmultiIndexTwo"
                            @change="endbindMultiPickerChangeTwo"
                            :disabled="checkedTwo"
                            :range="newMultiArray"
                            >
                            <input
                                type="text"
                                v-if="endMonthTwo == ''"
                                placeholder="结束时间"
                                disabled
                                placeholder-class="placeholder"
                            />
                            <div class="box rBox">
                                <p>
                                {{ endMonthTwo }}{{ endDayTwo }}
                                <span v-if="!checkedTwo">{{ endWeekTwo }}</span>
                                </p>
                                <p>{{ !checkedTwo ? endHoursTwo : endWeekTwo }}</p>
                            </div>
                        </picker>
                    </div>
                    <p class="add_time" @click="addTimeSlot">{{!isTimeTwo?'+添加时间段':'删除时间段'}}</p>
                </div>
                <van-cell-group>
                    <van-field
                        label-class="filed_label"
                        label="时长(可修改)"
                        :value="(hourTotal||'')+'小时'"
                        placeholder="请输入班次名称"
                        :border="false"
                        @change="changeShiftName"
                        input-align="right"
                    />
                </van-cell-group>
                <!-- <div class="timeLength">
                    <p class="l_text">
                        时长(可修改)
                    </p>
                    <p class="r_text">
                       {{hourTotal || ''}} 小时
                    </p>
                </div> -->
            </div>
        </div>
        <div class="desc">
            在排班-排班管理-排班设置-工时单位中可切换工时单位
        </div>
        <div class="panel">
            <div class="row">
                <p class="l_text">
                    系数
                </p>
                <p class="r_text">
                    1
                </p>
            </div>
        </div>
        <div class="panel">
            <div class="row">
                <p class="l_text">
                    管床
                </p>
                <p class="r_text">
                    <van-switch :checked="checked" size="20px" @change="changeSwitch" />
                </p>
            </div>
        </div>
        <div class="desc">
            管床开启后，可在排班时对改班次设置管床信息
        </div>
        <div class="panel">
            <picker @change="changeType" :value="typeIdx" range-key="label" :range="typeList">  
                <div class="row">
                    <p class="l_text">
                        类型
                    </p>
                    <p class="r_text">
                        {{typeList[typeIdx].label}}
                        <i-icon type="enter" size="18" />
                    </p>
                </div>
            </picker>
        </div>
        <div class="desc">
            类型为“休息”的班次将不会收到上班提醒
        </div>
        <div class="panel">
            <div class="row">
                <p class="l_text">
                    启用
                </p>
                <p class="r_text">
                    <van-switch :checked="checked" size="20px" @change="changeSwitch" />
                </p>
            </div>
        </div>
        <div class="footer">
            <div class="row">
                <p class="label" :class="{'active':isModelmes}">保存</p>
                <p class="btn" :class="{'active':isModelmes}">保存并继续添加</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            shift: {
                name:''
            },
            checked: false,
            typeList:[
                {
                    id:1,
                    label:'正常上班'
                },
                {
                    id:2,
                    label: '休息'
                }
            ],
            typeIdx:0,
            multiIndex: [0, 0, 0, 0, 0],
            endmultiIndex: [0, 0, 0, 0, 0],
            month: "",
            day: "",
            hours: "",
            endMonth: "",
            endDay: "",
            endHours: "",
            startTime: "2020-06-03 04:00",
            endTime: "2020-06-03 05:00",
            isTimeTwo: false,
            multiIndexTwo: [0, 0, 0, 0, 0],
            endmultiIndexTwo: [0, 0, 0, 0, 0],
            monthTwo: "",
            dayTwo: "",
            hoursTwo: "",
            endMonthTwo: "",
            endDayTwo: "",
            endHoursTwo: "",
            startTimeTwo: "",
            endTimeTwo: "",
            time: '',
            timeTwo: '',
            endTime: '',
            endTimeTwo: ''
        }
    },
    computed:{
        isModelmes(){
            return wx.getStorageSync('isModelmes');
        },
        newMultiArray: () => {
            let array = [];
            const date = new Date();
            const years = [];
            const months = [];
            const days = [];
            const hours = [];
            const minutes = [];
            var d = new Date();
            var y = d.getFullYear();
            for (let i = y; i <= date.getFullYear() + 10; i++) {
                years.push("" + i + "年");
            }
            array.push(years);
            for (let i = 1; i <= 12; i++) {
                if (i < 10) {
                i = "0" + i;
                }
                months.push("" + i + "月");
            }
            array.push(months);
            for (let i = 1; i <= 31; i++) {
                if (i < 10) {
                i = "0" + i;
                }
                days.push("" + i + "日");
            }
            array.push(days);
            for (let i = 0; i < 24; i++) {
                if (i < 10) {
                i = "0" + i;
                }
                hours.push("" + i + "时");
            }
            array.push(hours);
            for (let i = 0; i < 60; i++) {
                if (i < 10) {
                i = "0" + i;
                }
                minutes.push("" + i + "分");
            }
            array.push(minutes);
            return array;
        },
        hourTotal(){
            let total = 0;
            let oneTotal = 0;
            let towTotal = 0;
            if(this.time!=''&&this.endTime!=''){
                oneTotal = this.getCalculationHour(this.time, this.endTime)
                total = oneTotal
            }
            if(this.isTimeTwo){
                if(this.time!=''&&this.endTime!=''&&this.timeTwo!=''&&this.endTime!=''){
                    oneTotal = this.getCalculationHour(this.time, this.endTime)
                    towTotal = this.getCalculationHour(this.timeTwo, this.endTimeTwo)
                    console.log(oneTotal, towTotal)
                    total = oneTotal + towTotal
                }
            }
            // if(this.timeTwo!=''&&this.timeTwo!=''){
            //     towTotal = this.getCalculationHour(this.timeTwo, this.timeTwo)
            //     total = towTotal
            // }
            
            console.log(total,'total')
            return total
        }
    },
    methods:{
        // 两个时间相差的小时
        getCalculationHour(s1, s2) {
            var reDate = /\d{4}-\d{1,2}-\d{1,2} /;
            s1 = new Date((reDate.test(s1) ? s1 : '2017-1-1 ' + s1).replace(/-/g, '/'));
            s2 = new Date((reDate.test(s2) ? s2 : '2017-1-1 ' + s2).replace(/-/g, '/'));
            var ms = s2.getTime() - s1.getTime();
            if (ms < 0) return 0;
            return Math.floor(ms / 1000 / 60 / 60);
        },
        // 添加时间段
        addTimeSlot(){
            this.isTimeTwo = !this.isTimeTwo;
        },
        changeShiftName(e){

        },
        changeSwitch(e){
            this.checked = e.mp.detail
        },
        changeType(e){
            this.typeIdx = e.mp.detail.value;
        },
         bindMultiPickerChange(e) {
            this.multiIndex = e.target.value;
            console.log("当前选择的时间", this.multiIndex);
            const index = this.multiIndex;
            const year = this.newMultiArray[0][index[0]];
            const month = this.newMultiArray[1][index[1]];
            const day = this.newMultiArray[2][index[2]];
            const hour = this.newMultiArray[3][index[3]];
            const minute = this.newMultiArray[4][index[4]];
            this.time = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            this.month = month;
            this.day = day;
            this.hours = this.RemoveChinese(hour) + ":" + this.RemoveChinese(minute);
            this.time = this.RemoveChinese(this.time);
            this.startTime = this.RemoveChinese(this.time);
            this.copyStartTime =
                year + "-" + month + "-" + day + " " + hour + ":" + minute;
            this.copyStartTime = this.RemoveChinese(this.copyStartTime);
            let startTime = year + "-" + month + "-" + day;
            startTime = this.RemoveChinese(startTime);
            this.startDay = this.getWeekDay(startTime);
        },
        bindMultiPickerChangeTwo(e) {
            this.multiIndexTwo = e.target.value;
            console.log("当前选择的时间", this.multiIndexTwo);
            const index = this.multiIndexTwo;
            const year = this.newMultiArray[0][index[0]];
            const month = this.newMultiArray[1][index[1]];
            const day = this.newMultiArray[2][index[2]];
            const hour = this.newMultiArray[3][index[3]];
            const minute = this.newMultiArray[4][index[4]];
            this.timeTwo = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            this.monthTwo = month;
            this.dayTwo = day;
            this.hoursTwo = this.RemoveChinese(hour) + ":" + this.RemoveChinese(minute);
            this.timeTwo = this.RemoveChinese(this.timeTwo);
            this.startTimeTwo = this.RemoveChinese(this.timeTwo);
            let startTime = year + "-" + month + "-" + day;
            startTime = this.RemoveChinese(startTime);
            this.startDayTwo = this.getWeekDay(startTime);
        },
        // 默认日期
        getCurrent(startTime, endTime) {
            console.log(startTime, endTime, "========");
            let date = new Date(startTime.replace(/-/g, "/"));
            this.month = date.getMonth() + 1 + "月";
            this.day = date.getDate() + "日";
            this.hours = `${date.getHours()}:${
                date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
            }`;
            this.startDay = this.getWeekDay(startTime.replace(/-/g, "/"));
            let endDate = new Date(endTime.replace(/-/g, "/"));
            this.endMonth = endDate.getMonth() + 1 + "月";
            this.endDay = endDate.getDate() + "日";
            this.endHours = `${endDate.getHours()}:${
                endDate.getMinutes() < 10
                ? "0" + endDate.getMinutes()
                : endDate.getMinutes()
            }`;
            this.endWeek = this.getWeekDay(endTime.replace(/-/g, "/"));
        },
        RemoveChinese(strValue) {
            if (strValue != null && strValue != "") {
                var reg = /[\u4e00-\u9fa5]/g;
                return strValue.replace(reg, "");
            } else return "";
        },
        getWeekDay(date) {
            var dt = new Date(date).getDay();
            //     var dt = new Date(date.split("-")[0], date.split("-")[1]-1,date = date.split("-")[2]);
            var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            return weekDay[dt];
        },
        endbindMultiPickerChange(e) {
            this.endmultiIndex = e.target.value;
            const index = this.endmultiIndex;
            const year = this.newMultiArray[0][index[0]];
            const month = this.newMultiArray[1][index[1]];
            const day = this.newMultiArray[2][index[2]];
            const hour = this.newMultiArray[3][index[3]];
            const minute = this.newMultiArray[4][index[4]];
            let oldTime = this.RemoveChinese(year + "-" + month + "-" + day + " " + hour + ":" + minute);
            let startStamp = new Date(this.startTime.replace(/-/g,'/')).getTime(); // 开始时间戳
            let endStamp = new Date(oldTime.replace(/-/g,'/')).getTime(); // 结束时间戳
            if(endStamp<startStamp){
                wx.showToast({
                title:'请选择大于开始时间',
                icon:'none',
                duration:2000
                })
                return false;
            }
            this.endTime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            this.endMonth = month;
            this.endDay = day;
            this.endHours =
                this.RemoveChinese(hour) + ":" + this.RemoveChinese(minute);
            this.endTime = this.RemoveChinese(this.endTime);
            this.copyEndTime =
                year + "-" + month + "-" + day + " " + hour + ":" + minute;
            this.copyEndTime = this.RemoveChinese(this.copyEndTime);
            let endTime = year + "-" + month + "-" + day;
            endTime = this.RemoveChinese(endTime);
            this.endWeek = this.getWeekDay(endTime);
            console.log(this.endTime,this.time);
        },
        endbindMultiPickerChangeTwo(e) {
            this.endmultiIndexTwo = e.target.value;
            const index = this.endmultiIndexTwo;
            const year = this.newMultiArray[0][index[0]];
            const month = this.newMultiArray[1][index[1]];
            const day = this.newMultiArray[2][index[2]];
            const hour = this.newMultiArray[3][index[3]];
            const minute = this.newMultiArray[4][index[4]];
            let oldTime = this.RemoveChinese(year + "-" + month + "-" + day + " " + hour + ":" + minute);
            let startStamp = new Date(this.startTimeTwo.replace(/-/g,'/')).getTime(); // 开始时间戳
            let endStamp = new Date(oldTime.replace(/-/g,'/')).getTime(); // 结束时间戳
            if(endStamp<startStamp){
                wx.showToast({
                    title:'请选择大于开始时间',
                    icon:'none',
                    duration:2000
                })
                return false;
            }
            this.endTimeTwo = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            this.endMonthTwo = month;
            this.endDayTwo = day;
            this.endHoursTwo =
                this.RemoveChinese(hour) + ":" + this.RemoveChinese(minute);
            this.endTimeTwo = this.RemoveChinese(this.endTimeTwo);
            let endTimeTwo = year + "-" + month + "-" + day;
            endTimeTwo = this.RemoveChinese(endTimeTwo);
            this.endWeekTwo = this.getWeekDay(endTimeTwo);
            console.log(this.endTimeTwo,this.timeTwo);
        },
    }
}
</script>
<style lang="scss">
    .wrapper{
        .panel{
            background: #fff;
            margin-top: 20rpx;
            .row{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--cell-vertical-padding,10px) var(--cell-horizontal-padding,16px);
                font-size: 26rpx;
                color: #333;
                .r_text{
                    display: flex;
                    align-items: center;
                }
            }
            .filed_label{
                font-weight: bold !important;
            }
            .timeSlot{
                border-top: 1rpx solid #e2e3e5;
                .timeBlock{
                    .timeWrap {
                        display: flex;
                        padding: 10rpx 33rpx;
                        background: #fff;
                        // justify-content: space-around;
                        input {
                            text-align: center;
                            margin-top: 20rpx;
                        }
                        .picker {
                            width: 45%;
                            .placeholder{
                                font-size: 26rpx;
                            }
                        }
                        .box {
                            font-size: 30rpx;
                            color: #333333;
                            // width: 45%;
                            // height: 92rpx;
                            text-align: left;
                            p:nth-child(2) {
                            margin-top: 10rpx;
                            }
                        }
                        .rBox {
                            margin-left: 20rpx;
                        }
                        .imgBox {
                            width: 14rpx;
                            height: 92rpx;
                            img {
                            width: 100%;
                            height: 100%;
                            vertical-align: middle;
                            }
                        }
                    }
                }
                .add_time{
                    padding: 20rpx 32rpx;
                    box-sizing: border-box;
                    font-size: 26rpx;
                    color: #3399ff;
                }
                .timeLength{
                    display: flex;
                    padding: var(--cell-vertical-padding,10px) var(--cell-horizontal-padding,16px);
                    justify-content: space-between;
                    font-size: 26rpx;
                    color: #333;
                    font-weight: bold;
                    border-top: 1rpx solid #e2e3e5;
                }
            }
        }
        .desc{
            padding: 10rpx 32rpx;
            box-sizing: border-box;
            color: #999999;
            font-size: 24rpx;
        }
        .footer{
            width: 100%;
            position: fixed;
            bottom: 0;
            background: #fff;
            z-index: 999;
            .row{
                display: flex;
                border-top: 1rpx solid #e2e3e5;
                .label{
                    font-size: 24rpx;
                    flex: 1;
                    padding: 30rpx 0 30rpx 20rpx;
                    text-align: center;
                    color: #3399ff;
                }
                .label.active{
                    padding-bottom: 40rpx;
                }
                .btn{
                    flex: 1;
                    padding: 30rpx 0;
                    background: #3399ff;
                    color: #fff;
                    font-size: 26rpx;
                    text-align: center;
                }
                .btn.active{
                    padding-bottom: 100rpx;
                }
            }
        }
    }
</style>