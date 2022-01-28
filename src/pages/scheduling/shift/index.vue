<template>
    <div class="wrapper">
        <div class="header">
            <i-tabs :current="current" @change="handleChange">
                <i-tab key="tab1" title="正在使用的组"></i-tab>
                <i-tab key="tab2" title="全部组"></i-tab>
            </i-tabs>
        </div>
        <div class="center">
            <div class="tips">
                <p class="text">默认组</p>
                <p class="sort">
                    <van-icon name="sort" color="#3399ff" />
                    班次排序</p>
            </div>
            <div class="content">
                <div class="row">
                    <p class="shift_name">
                        白班<span>8小时</span>
                    </p>
                    <p class="time">
                        09:00-18:00
                    </p>
                </div>
                <p class="more">没有更多了</p>
            </div>
        </div>
        <div class="footer" @click="handleAddShift">
            <div class="btn" :class="{'active':isModelmes}">
                添加班次
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            current: 'tab1'
        }
    },
    computed:{
        isModelmes(){
            return wx.getStorageSync('isModelmes');
        }
    },
    methods:{
        handleChange(e){
            console.log(e);
            this.current = e.mp.detail.key
        },
        handleAddShift(){
            wx.navigateTo({
                url: '/pages/scheduling/shift/add_shift/main'
            })
        }
    }
}
</script>
<style lang="scss">
    page{
        background: #fff;
    }
    .center{
        .tips{
            padding: 20rpx 30rpx;
            box-sizing: border-box;
            background: #f4f4f4;
            display: flex;
            justify-content: space-between;
            font-size: 26rpx;
            .sort{
                color: #3399ff;
            }
        }
        .content{
            padding-left: 30rpx;
            box-sizing: border-box;
            .row{
                padding: 20rpx 0;
                box-sizing: border-box;
                border-bottom: 1rpx solid #e2e3e5;
                .shift_name{
                    font-size: 28rpx;
                    color: #333;
                    font-weight: bold;
                    span{
                        margin-left: 30rpx;
                        font-size: 20rpx;
                        display: inline-block;
                        width: 80rpx;
                        height: 30rpx;
                        line-height: 30rpx;
                        text-align: center;
                        background: rgba(51, 153, 255,.5);
                        color: #3399ff;
                        border-radius: 30rpx;
                    }
                }
                .time{
                    color: #333;
                    font-size: 24rpx;
                    padding-top: 10rpx;
                }
            }
            .more{
                font-size: 28rpx;
                color: #ccc;
                padding: 30rpx 0;
                text-align: center;
            }
        }
    }
    .footer{
            width: 100%;
            position: fixed;
            bottom: 0;
            background: #fff;
            z-index: 999;
            .btn{
                width: 100%;
                padding: 30rpx 0;
                background: #3399ff;
                color: #fff;
                text-align: center;
                font-size: 28rpx;
            }
            .btn.active{
                padding-bottom: 88rpx;
            }
        }
</style>