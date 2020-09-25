<template>
    <div class="wrap">
        <div class="center">
            <div class="content">
                <div class="row">
                    <div class="avatar">
                        <p>崔曼</p>
                    </div>
                    <div class="rBox">
                        <div class="top">
                            <p class="name">崔曼</p>
                        </div>
                        <div class="info">
                            信息中心    04-04  10:30
                        </div>
                    </div>
                </div>
                <p class="text">1.医院召开全体人员培训；
                    2.学习规章制度；
                    3.财务流程；
                </p>
            </div>
            <div class="comment_wrap">
                <div class="row_box">
                    <div class="tabs">
                        <p :class="{'active':idx==index}" v-for="(item,index) in tabs" :key="index" @click="getTab(item,index)">{{item}}</p>
                    </div>
                    <div class="zan">
                        <p>赞 401</p>
                    </div>
                </div>
                <div class="comment">
                    <div class="box">
                        <div class="avatar">崔曼</div>
                        <div class="left_cont">
                            <p class="name">崔曼</p>
                            <p class="text">内容很不错</p>
                            <p class="info">信息中心    04-04  10:30</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            idx:0,
            tabs:['转发 321','评论 56']
        }
    },
    methods:{
        getTab(item,index){
            this.idx = index;
        }
    }
}
</script>
<style lang="scss">
    .wrap{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .content{
            padding: 26rpx 33rpx;
            background: #fff;
            margin-top: 33rpx;
            .row{
                display: flex;
                align-items: center;
                .avatar{
                    width: 75rpx;
                    height: 75rpx;
                    line-height: 75rpx;
                    text-align: center;
                    border-radius: 50%;
                    background: #3399ff;
                    font-size: 21rpx;
                    color: #fff;
                }
                .rBox{
                    flex: 1;
                    margin-left: 20rpx;
                    .top{
                        display: flex;
                        justify-content: space-between;
                        .name{
                            font-size: 28rpx;
                            color:#333333;
                        }
                    }
                    .info{
                        font-size: 22rpx;
                        color: #999999;
                    }
                }
            }
            .text{
                padding: 28rpx 0;
                font-size: 28rpx;
                color: #333333;
            }
        }
        .comment_wrap{
            margin-top: 17rpx;
            background: #fff;
            .row_box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1rpx solid #e2e3e5;
                padding: 0 38rpx;
                font-size: 29rpx;
                color: #333333;
                font-weight: bold;
                .tabs{
                    display: flex;
                    p{
                        width: 146rpx;
                        text-align: center;
                        padding: 30rpx 0;
                    }
                    p.active{
                        border-bottom: 4rpx solid #3399ff;
                    }
                }
            }
            .comment{
                padding: 0 38rpx;
                .box{
                    display: flex;
                    padding: 26rpx 0;
                    .avatar{
                        width: 75rpx;
                        height: 75rpx;
                        line-height: 75rpx;
                        text-align: center;
                        border-radius: 50%;
                        background: #3399ff;
                        font-size: 21rpx;
                        color: #ffffff;
                    }
                    .left_cont{
                        flex: 1;
                        margin-left: 20rpx;
                        .name{
                            font-size: 28rpx;
                            color: #3399ff;
                        }
                        .text{
                            font-size: 32rpx;
                            color: #333333;
                            padding: 18rpx 0;
                        }
                        .info{
                            font-size: 22rpx;
                            color: #644d4d;
                        }
                    }
                }
            }
        }
    }
</style>