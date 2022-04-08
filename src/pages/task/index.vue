<template>
    <div class="wrapper">
        <todoList v-if="current=='tab1'" :isModelmes="isModelmes" />
        <div class="footer" :class="{'bottomActive':isModelmes,'footImt':!isModelmes}">
            <div>
                <i-tab-bar :current="current" color="#049bfb" @change="handleChangeBar">
                    <i-tab-bar-item key="tab1" :img="imgUrl+'04.2.1.Clock_1.png'" :current-img="imgUrl+'04.2.1.Clock_2.png'" title="待办"></i-tab-bar-item>
                    <i-tab-bar-item key="tab2" :img="imgUrl+'04.2.1.Apply_1.png'" :current-img="imgUrl+'04.2.1.Apply_2.png'" title="项目"></i-tab-bar-item>
                    <i-tab-bar-item key="tab3" :img="imgUrl+'04.2.1.Statistics_1.png'" :current-img="imgUrl+'04.2.1.Statistics_2.png'" title="日历"></i-tab-bar-item>
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
            current:"tab1"
        }
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
        }
    },
    methods: {
        handleChangeBar(e){
            this.current = e.mp.detail.key;
        }
    }
}
</script>
<style lang="scss">
    .footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #fff;
    }
</style>