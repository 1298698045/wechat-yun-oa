<template>
    <div class="wrapper">
        <div class="header">
            <van-search :value="searchVal" placeholder="姓名/部门/职位" />
        </div>
        <div class="center">
            <div class="content">
                <div class="row">
                    <div class="avatar">

                    </div>
                    <div class="cont">
                        <p class="name">测试</p>
                        <p class="depart">
                            北京凤凰世纪科技有限公司
                        </p>
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
            searchVal: ''
        }
    }
}
</script>
<style lang="scss">
page{
    background: #fff;
}
    .wrapper{
        .center{
            .content{
                .row{
                    display: flex;
                    align-items: center;
                    border-bottom: 1rpx solid #e2e3e5;
                    padding: 20rpx ;
                    box-sizing: border-box;
                    .avatar{
                        width: 100rpx;
                        height: 100rpx;
                        border-radius: 5rpx;
                        background: #f4f4f4;
                    }
                    .cont{
                        margin-left: 20rpx;
                        .name{
                            font-size: 30rpx;
                            color: #333;
                        }
                        .depart{
                            font-size: 26rpx;
                            color: #999;
                            padding-top: 10rpx;
                        }
                    }
                }
            }
        }
    }
</style>