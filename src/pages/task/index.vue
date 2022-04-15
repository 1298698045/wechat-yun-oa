<template>
    <div class="wrapper">
        <todoList ref="todoList" v-if="current=='tab1'" :isModelmes="isModelmes" />
        <div class="project" v-if="current=='tab3'">
            <div class="cell" v-for="(item,index) in projectList" :key="index">
                <div class="l_img">
                    <img :src="pathUrl+item.AvatarUrl" alt="">
                </div>
                <div class="name">
                    {{item.Name}}
                </div>
                <div class="more">
                    <van-icon name="ellipsis" />
                </div>
            </div>
        </div>
        <div class="footer" :class="{'bottomActive':isModelmes,'footImt':!isModelmes}">
            <div>
                <i-tab-bar :current="current" color="#049bfb" @change="handleChangeBar">
                    <i-tab-bar-item key="tab1" :img="imgUrl+'04.2.1.Clock_1.png'" :current-img="imgUrl+'04.2.1.Clock_2.png'" title="待办"></i-tab-bar-item>
                    <i-tab-bar-item key="tab2" :img="imgUrl+'04.2.1.Statistics_1.png'" :current-img="imgUrl+'04.2.1.Statistics_2.png'" title="日历"></i-tab-bar-item>
                    <i-tab-bar-item key="tab3" :img="imgUrl+'04.2.1.Apply_1.png'" :current-img="imgUrl+'04.2.1.Apply_2.png'" title="项目"></i-tab-bar-item>
                </i-tab-bar>
            </div>
        </div>
    </div>
</template>
<script>
import todoList from '@/components/task/todo_list.vue';
export default {
    components:{
        todoList
    },
    data() {
        return {
            current:"tab1",
            projectList: []
        }
    },
    onLoad(){
        Object.assign(this.$options.data(),this.data);
    },
    onShow(){
        this.$refs.todoList.pageNumber = 1;
        this.$refs.todoList.current = 'tab1';
        this.$refs.todoList.tag = 'neq'
        this.$refs.todoList.getQuery('neq');
    },
    computed:{
        isModelmes(){
            return wx.getStorageSync('isModelmes');
        },
        sessionkey(){
            return wx.getStorageSync('sessionkey');
        },
        imgUrl(){
            return this.$api.photo.url;
        },
        pathUrl(){
            return "https://wx.phxinfo.com.cn";
        },
    },
    methods: {
        handleChangeBar(e){
            this.current = e.mp.detail.key;
            if(this.current=='tab3'){
                this.getProject();
            }
        },
        getProject(){
            this.$httpWX.get({
                url:this.$api.message.queryList,
                data:{
                    method:this.$api.task.projectAll,
                    SessionKey: this.sessionkey
                }
            }).then(res=>{
                this.projectList = res.rows;
            })
        }
    }
}
</script>
<style lang="scss">
    .wrapper{
        padding-bottom: 160rpx;
        .project{
            margin: 30rpx 0;
            background: #fff;
            padding-left: 20rpx;
            .cell{
                display: flex;
                align-items: center;
                padding: 20rpx 20rpx 20rpx;
                border-bottom: 1rpx solid #e2e3e5;
                .l_img{
                    width: 40rpx;
                    height: 40rpx;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .name{
                    flex: 1;
                    margin-left: 20rpx;
                    font-size: 32rpx;
                    color: #333;
                }
            }
        }
    }
    .footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #fff;
    }
</style>