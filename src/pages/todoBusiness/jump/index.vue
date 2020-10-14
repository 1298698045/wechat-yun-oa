<template>
  <div class="wrap">
    <view class="boxWrap">
      <div class="box" v-for="(item,index) in list" :key="index">
        {{item.name}}
        <i-icon type="enter" size="20" color="#999999" />
      </div>
    </view>
    <div class="center">
      <div class="node_wrap">
        <p>节点一</p>
      </div>
      <div class="mailList">
        <p>张三</p>
      </div>
      <div class="btn">添加</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[
        {
          name:"组织架构"
        },
        {
          name:"技术部门"
        },
        {
          name:"技术部门"
        },
        {
          name:"技术部门"
        },
        {
          name:"技术部门"
        },
      ]
    }
  }
}
</script>
<style lang="scss">
  .wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .boxWrap{
      background: #fff;
      padding:20rpx 32rpx;
      font-size: 28rpx;
      color: #666666;
      border-bottom: 1rpx solid #eaebeb;
      display: flex;
      flex-wrap: wrap;
    }
    .center{
      margin-top: 16rpx;
      .node_wrap{
        background: #fff;
        p{
          font-size: 24rpx;
          padding: 40rpx 32rpx;
          border-bottom: 1rpx solid #e2e3e5;
        }
      }
      .mailList{
        background: #fff;
        margin-top: 16rpx;
        p{
          font-size: 24rpx;
          padding: 40rpx 32rpx;
          border-bottom: 1rpx solid #e2e3e5;
        }
      }
      .btn{
        text-align: center;
        padding: 20rpx 0;
        background: #3399ff;
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #fff;
      }
    }
  }
</style>