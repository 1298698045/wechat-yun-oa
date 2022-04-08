<template>
  <div class="todoList">
    <div class="todolist_bd">
      <div class="box">
        <div class="left">
          <checkbox></checkbox>
        </div>
        <div class="right">
          <p class="name">测试</p>
          <div class="desc">
            <p class="time">
              <van-icon name="completed" />
              2022-01-02 - 2022-02-02
            </p>
            <p class="project">
              项目：空白项目
            </p>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="left">
          <checkbox></checkbox>
        </div>
        <div class="right">
          <p class="name">测试</p>
        </div>
      </div>
    </div>
    <div
      class="clues-add-button"
      @click="handleAddTask"
      :class="{ active: isModelmes }"
    >
      <i class="iconfont icon-icon-add-3-copy"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "todoList",
  props: ['isModelmes'],
  data() {
    return {};
  },
  methods:{
      handleAddTask(){
          wx.navigateTo({
              url: '/pages/task/create_task/main'
          })
      }
  }
};
</script>
<style lang="scss">
    @font-face {
        font-family: "iconfont";
        src: url(data:font/truetype;charset=utf-8;base64,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)
            format("truetype");
        font-weight: normal;
        font-style: normal;
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .icon-icon-add-3-copy:before {
        content: "\e691";
    }
    .clues-add-button.active{
        bottom: 100px;
    }
    .clues-add-button {
        position: fixed;
        right: 20px;
        // bottom: 80px;
        bottom: 40px;
        background: #049bfb;
        width: 48px;
        height: 48px;
        z-index: 1002;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0rpx 5rpx 12rpx 0rpx rgba(0, 0, 0, 0.3);
        i{
            font-size: 35rpx;
        }

    }
    .todoList{
      .todolist_bd{
        padding: 0 20rpx;
        .box{
          background: #fff;
          border-radius: 15rpx;
          padding: 20rpx;
          box-sizing: border-box;
          margin-top: 20rpx;
          display: flex;
          .left{

          }
          .right{
            padding-left: 20rpx;
            .name{
              font-size: 32rpx;
              color: #333;
              font-weight: bold;
            }
            .desc{
              padding-top: 15rpx;
              display: flex;
              font-size: 24rpx;
              color: #666666;
              .project{
                padding-left: 15rpx;
              }
            }
          }
        }
      }
    }
</style>