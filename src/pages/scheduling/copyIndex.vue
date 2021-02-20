<template>
  <view class="page">
    <div>
        <Calendar
        :months="months"
        :value="value"
        @next="next"
        @prev="prev"
        :events="events"
        lunar
        :clean="false"
        @select="select"
        ref="calendar"
        arrowRight=""
        @selectMonth="selectMonth"
        @selectYear="selectYear"
        :tileContent="tileContent"
        :almanacs="almanacs"
        />
        <button @click="setToday">返回今日</button>
        <button @click="dateInfo">日期信息</button>
        <button @click="renderer">重新渲染年月日期</button>
    </div>
  </view>
</template>

<script scoped>
import Calendar from 'mpvue-calendar';
import 'mpvue-calendar/src/style.css';
  //index.js
  //获取应用实例
  const app = getApp()
  export default {
    data() {
      return {
            date: [],
            selected: 0,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            disabledArray: ['2021-2-1', '2018-6-25'],
            value: [2021, 2, 7],
            begin:[2016, 1, 1],
            end:[2020, 1, 1],
            events: {'2021-2-21': '今日备注', '2021-2-21': '早班'},
            almanacs: {'9-3': '抗战胜利日', '11-17': '学生日'},
            tileContent: [
                {date: '2018-9-22', className: 'holiday', content: '休'},
                {date: '2018-9-23', className: 'holiday', content: '休'}
            ],
        }
    },
    components:{
        Calendar
    },
    onLoad: function() {},
    onShow: function() {
    //   this.getFullYears()    
    },
    methods: {
        prev(year, month, weekIndex) {
            console.log(year, month, weekIndex)
        },
        next(year, month, weekIndex) {
            console.log(year, month, weekIndex)
        },
        selectYear(year) {
            console.log(year)
        },
        selectMonth(month, year) {
            console.log(year, month)
        },
        setToday() {
            this.$refs.calendar.setToday()
        },
        dateInfo() {
            const info = this.$refs.calendar.dateInfo(2018, 8, 23)
            console.log(info)
        },
        renderer() {
            this.$refs.calendar.renderer(2018, 8); //渲染2018年8月份
        },
        select(val, val2) {
            console.log(val)
            console.log(val2)
        },
    },
    watch: {
        events(){
            console.log('events-',123123123123123)
        }
    },
  }
</script>
<style scoped>
</style>