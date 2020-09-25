<template>
    <div class="wrap">
        <div class="center">
            <div class="content" @click="getDetail">
                <div class="row">
                    <div class="avatar">
                        <p>崔曼</p>
                    </div>
                    <div class="rBox">
                        <div class="top">
                            <p class="name">崔曼</p>
                            <p><i-icon type="more" color="#999999" size="20" /></p>
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
                <div class="more_btn">
                    <div class="btn">转发</div>
                    <div class="btn">评论</div>
                    <div class="btn">赞</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    onLoad(){

    },
    methods:{
        getDetail(){
            const url = '/pages/community/detail/main';
            wx.navigateTo({url:url});
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
            padding: 0 33rpx;
            background: #fff;
            margin-top: 33rpx;
            .row{
                display: flex;
                align-items: center;
                padding-top: 26rpx;
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
                border-bottom: 1rpx solid #e2e3e5;
            }
            .more_btn{
                font-size: 28rpx;
                color: #526992;
                padding: 24rpx 0;
                display: flex;
                justify-content: space-around;
            }
        }
    }
</style>