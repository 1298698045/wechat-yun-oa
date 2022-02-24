<template>
    <div class="wrapper">
        <div class="header">
            <van-search :value="searchVal" placeholder="姓名/部门/职位" />
        </div>
        <div class="center">
            <div class="content">
                <div class="row" v-for="(item,index) in listData" :key="index" @click="handlerDetail(item)">
                    <div class="avatar">

                    </div>
                    <div class="cont">
                        <p class="name">{{item.ModifiedBy}}</p>
                        <p class="depart">
                            {{item.DeptId}}
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
            searchVal: '',
            sessionkey:wx.getStorageSync('sessionkey'),
            listData: [],
            pageSize: 10,
            pageNumber: 1,
            isPage: false,
        }
    },
    onLoad(){
        this.getList();
    },
    methods:{
        getList(){
            this.$httpWX.get({
                url:this.$api.message.queryList,
                data:{
                    method:this.$api.human.employeeRoster,
                    SessionKey:this.sessionkey,
                    entityType: 'a0V',
                    rows: this.pageSize,
                    page: this.pageNumber
                }
            }).then(res=>{
                let total = res.total
                let result = []
                if(this.pageNumber*this.pageSize<=total){
                    this.isPage = true
                }else {
                    this.isPage = false
                }
                if(this.pageNumber==1){
                    result = res.rows;
                }else {
                    result = this.listData.concat(res.rows)
                }
                this.listData = result;

            })
        },
        handlerDetail(item){
            wx.navigateTo({
                url: '/pages/human/employeeRoster/detail/main?id='+item.LIST_RECORD_ID
            });
        }
    },
        // 下拉刷新
    onPullDownRefresh() {
        // this.current_scroll = '推荐';
        this.pageNumber = 1;
        this.getList();
        wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.isPage){
            this.pageNumber++;
            this.getList();
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