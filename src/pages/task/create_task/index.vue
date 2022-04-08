<template>
    <div class="wrapper">
        <div class="container">
            <div class="form">
                <div v-for="(item,index) in listData" :key="index">
                    <div class="cell" v-if="item.type=='project'">
                        <picker :value="projectIdx" range-key="name" :range="projectList" @change="function(val){changeProject(val,item)}">
                            <div class="row">
                                <div class="l_label">
                                    {{item.name}}
                                </div>
                                <div class="c_input">
                                    <input type="text" :disabled="true" :value="projectList[projectIdx].name" class="inp">
                                </div>
                                <div class="r_icon">
                                    <van-icon name="arrow" color="#999" />
                                </div>
                            </div>
                        </picker>
                    </div>
                    <div class="cell" v-if="item.type=='text'">
                        <div class="richText">
                            <textarea placeholder="请输入任务标题" @input="(e)=>{handleTextarea(e,item)}" v-model="item.value"  maxlength="200"></textarea>
                        </div>
                    </div>
                    <div class="cell" v-if="item.type=='issuetype'">
                        <picker :value="item.idx" range-key="name" :range="item.issueTypes.nodes" @change="(e)=>{handlePickerType(e,item)}">
                            <div class="row">
                                <div class="l_label">
                                    {{item.name}}
                                </div>
                                <div class="c_input">
                                    <input type="text" :disabled="true" :value="item.issueTypes.nodes[item.idx].name" class="inp">
                                </div>
                                <div class="r_icon">
                                    <van-icon name="arrow" color="#999" />
                                </div>
                            </div>
                        </picker>
                    </div>
                    <div class="cell" v-if="item.type=='user'" @click="queryUsers(item)">
                        <div class="row">
                            <div class="l_label">
                                {{item.name}}
                            </div>
                            <div class="c_input" @click="getOpenModal">
                                <input type="text" placeholder="请选择" :disabled="true" :value="item.user.name" class="inp">
                            </div>
                            <div class="r_icon">
                                <van-icon name="arrow" color="#999" />
                            </div>
                        </div>
                    </div>
                    <div class="cell" v-if="item.type=='date'">
                        <picker class="picker" mode="multiSelector" :value="item.multiIndex"  @change="((val)=>{bindMultiPickerChange(val,item)})"
                        :range="newMultiArrayList">
                            <div class="row">
                                <div class="l_label">
                                    {{item.name}}
                                </div>
                                <div class="c_input">
                                    <input type="text" placeholder="请选择" :disabled="true" :value="item.value" class="inp">
                                </div>
                                <div class="r_icon">
                                    <van-icon name="arrow" color="#999" />
                                </div>
                            </div>
                        </picker>
                    </div>
                    <div class="cell" v-if="item.type=='description'">
                        <div class="row">
                            <div class="l_label">
                                {{item.name}}
                            </div>
                            <div class="c_input">
                                <input type="text" @input="(e)=>{handleTextarea(e,item)}" v-model="item.value" placeholder="添加备注" class="inp">
                            </div>
                            <div class="r_icon">
                                <van-icon name="arrow" color="#fff" />
                            </div>
                        </div>
                    </div>
                    <div class="cell" v-if="item.type=='priority'">
                        <div class="row">
                            <div class="l_label">
                                {{item.name}}
                            </div>
                            <div class="c_input" @click="handleOpenPriority(item,index)">
                                <input type="text" placeholder="选择优先级" :value="item.value" :disabled="true" class="inp">
                            </div>
                            <div class="r_icon">
                                <van-icon name="arrow" color="#999" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" :class="{'bottomActive':isModelmes,'footImt':!isModelmes}">
            <div class="btn">
                <van-button type="info" block @click="handleComplete">完成</van-button>
            </div>
        </div>
        <van-popup
            :show="isShow"
            position="bottom"
            custom-style="width:100%;height: 80vh;"
            z-index="99999"
            @close="onClosePopup"
        >
            <div class="popupWrap">
                <van-search :value="lksrch" placeholder="请输入搜索关键词" @change="handleChangeSearch" />
                <ul class="uls">
                    <li @click="getPopupSel(item,index)" v-for="(item,index) in userList" :key="index">
                        <p>{{item.Name}}</p>
                        <p v-if="popupIdx==index">
                            <i-icon type="right" />
                        </p>
                    </li>
                </ul>
            </div>
        </van-popup>
        <van-popup
            :show="isPriority"
            position="bottom"
            z-index="99999"
            @close="closePriority"
            custom-style="width:100%;height: auto;"
        >
            <div class="popupWrap">
                <div class="head">
                    <p class="close" @click="closePriority">
                        关闭
                    </p>
                    <p class="title">
                        优先级
                    </p>
                </div>
                <div class="bd">
                    <div class="row" v-for="(item,index) in levels" :key="index">
                        <div class="color">
                            <img :src="imgUrl+item.iconUrl" alt="">
                        </div>
                        <div class="r_level" @click="handleSelectLevel(item,index)">
                            {{item.name}}
                            <div class="icon" v-if="levelIdx===index">
                                <van-icon name="success" color="#3399ff" size="20" />
                            </div>
                            <div class="icon" v-else>
                                <van-icon name="success" color="#fff" size="20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import {newMultiArray} from '@/utils/multiArray';
export default {
    data() {
        return {
            list:[
                {
                    val: '123',
                    label:'项目',
                    id: 1
                }
            ],
            idx: 0,
            multiIndex: [0, 0, 0, 0, 0],
            value:"",
            isPriority: false, // 优先级
            levels:[
                '较低','普通','紧急','非常紧急'
            ],
            levelIdx: -1,
            color: ['#999','#3399ff','orange','red'],
            isShow:false,
            lksrch: "",
            popupIdx: "",
            listData: [],
            projectList: [],
            projectIdx: 0,
            userList: [],
            userId: "",
            params:{
                recordRep:{
                    objTypeCode: 4200,
                    fields:{}
                },
            },
            recordLevel: ""
        }
    },
    computed:{
        sessionkey(){
            return wx.getStorageSync('sessionkey');
        },
        newMultiArrayList(){
            return newMultiArray();
        },
        isModelmes(){
            return  wx.getStorageSync('isModelmes');
        },
        imgUrl(){
            return "https://wx.phxinfo.com.cn/static/img";
        }
    },
    onLoad(){
        this.queryProject();
        this.queryLayout();
    },
    methods:{
        queryProject(){
            this.$httpWX.get({
                url:this.$api.message.queryList,
                data:{
                    method: this.$api.task.project,
                    SessionKey: this.sessionkey,
                    Lktp: 20290
                }
            }).then(res=>{
                this.projectList = res.data.allProjects.nodes;
            })
        },
        // 项目
        changeProject(val,item){
            console.log(val,item)
            this.projectIdx = val.mp.detail.value;
            this.params.recordRep.fields[item.fieldId] = {
                Id: this.projectList[this.projectIdx].id,
                Name: this.projectList[this.projectIdx].name
            };
            console.log(this.params,'params')
        },
        handleTextarea(e,item){
            this.params.recordRep.fields[item.fieldId] = item.value;
        },
        // 类型
        handlePickerType(e,item){
            console.log(e,item)
            item.idx = e.mp.detail.value;
            this.params.recordRep.fields[item.fieldId] = item.issueTypes.nodes[item.idx].id;
        },
        bindPickerChange(e,item){

        },
        queryUsers(item){
            this.$httpWX.get({
                url:this.$api.message.queryList,
                data:{
                    method: this.$api.task.users,
                    SessionKey: this.sessionkey,
                    Lktp: 8
                }
            }).then(res=>{
                this.userList = res.listData;
            })
        },
        queryLayout(){
            this.$httpWX.get({
                url:this.$api.message.queryList,
                data:{
                    method: this.$api.task.formLayout,
                    SessionKey: this.sessionkey,
                    projectId: "ee35bacd-8991-439d-9038-5db96744234e"
                }
            }).then(res=>{
                this.listData = res.data.issueCreateFields.fields.nodes;
                this.listData.forEach(item=>{
                    this.$set(item,'value','');
                    if(item.type=='issuetype'){
                        this.$set(item,'idx',0)
                    }
                    if(item.type=='user' && item.fieldId=='CreatedBy'){
                        item.value = {
                            name: item.user.name,
                            id: item.user.id
                        }
                    }
                })
            })
        },
        bindMultiPickerChange(v,item){
            console.log(v,item)
            item.multiIndex = v.mp.detail.value;
            item.value = this.getCurrentTime(item.multiIndex);
            this.params.recordRep.fields[item.fieldId] = item.value;
        },
        getCurrentTime(index){
            const year = this.newMultiArrayList[ 0 ][ index[ 0 ] ];
            const month = this.newMultiArrayList[ 1 ][ index[ 1 ] ];
            const day = this.newMultiArrayList[ 2 ][ index[ 2 ] ];
            const hour = this.newMultiArrayList[ 3 ][ index[ 3 ] ];
            const minute = this.newMultiArrayList[ 4 ][ index[ 4 ] ];
            let time = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            time = this.RemoveChinese(time);
            return time;
        },
        RemoveChinese(strValue){ 
            if(strValue != null && strValue != ""){ 
                var reg =/[\u4e00-\u9fa5]/g; 
                return strValue.replace(reg, "");
            }else{
                return "";
            }
        },
        // 选择优先级
        handleSelectLevel(item,index){
            this.levelIdx = index;
            this.listData[this.recordLevel].value = item.name;
            this.params.recordRep.fields[this.listData[this.recordLevel].fieldId] = item.id;
            this.isPriority = false;
        },
        handleOpenPriority(item,index){
            this.recordLevel = index;
            this.levels = item.priorities.nodes;
            this.isPriority = true;
        },
        closePriority(){
            this.isPriority = false;
        },
        // 选择人
        getPopupSel(item,index){
            this.popupIdx = index;
            this.isShow = false;
        },
        onClosePopup(){
            this.isShow =  false;
        },
        handleChangeSearch(e){
            this.lksrch = e.mp.detail;
            // this.getLookup().then(res=>{
            //     this.list[this.searchIdx].temp = res.listData;
            // });
        },
        // 打开选择人
        getOpenModal(){
            this.isShow = true;
        },
        // 完成
        handleComplete(){

        }
    }
}
</script>
<style lang="scss">
    page{
        background: #fff;
    }
    .wrapper{
        .container{
            .form{
                .cell{
                    background: #fff;
                    border-bottom: 1rpx solid #e2e3e5;
                    padding: 0 20rpx;
                    .row{
                        padding: 20rpx 0;
                        display: flex;
                        align-items: center;
                        .l_label{
                            width: 130rpx;
                            color: #666;
                        }
                        .c_input{
                            flex: 1;
                            padding-left: 20rpx;
                            .inp{
                                width: 100%;
                                height: 50rpx;
                            }
                        }
                        .r_icon{

                        }
                    }
                    .richText{
                        padding: 20rpx 0;
                        textarea{
                            width: 100%;
                            height: 200rpx;
                            min-height: 200rpx;
                        }
                    }
                }
            }
        }
        .popupWrap{
            .head{
                padding: 15rpx 20rpx;
                box-shadow: 0 3rpx 10rpx 0 rgba(0,0,0,.1);
                position: relative;
                text-align: center;
                color: #333;
                .title{
                    text-align: center;
                    font-weight: bold;
                    font-size: 32rpx;
                }
                .close{
                    display: inline-block;
                    position: absolute;
                    top: 15rpx;
                    left: 20rpx;
                    font-size: 28rpx;
                }
            }
            .bd{
                .row{
                    display: flex;
                    align-items: center;
                    padding-left:30rpx;
                    .color{
                        width: 30rpx;
                        height: 30rpx;
                        border-radius: 50%;
                        // border: 5rpx solid #999;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                    .r_level{
                        color: #333;
                        font-size: 28rpx;
                        border-bottom: 1rpx solid #e2e3e5;
                        margin-left: 20rpx;
                        flex: 1;
                        padding: 20rpx 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding-right: 20rpx;
                        box-sizing: border-box;
                    }
                }
            }
            // 选择人
            .uls{
                li{
                    padding: 33rpx ;
                    color: #333333;
                    font-size: 28rpx;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .footer{
            width: 100%;
            position: fixed;
            bottom: 20rpx;
            background: #fff;
            border-top: 1rpx solid #e2e3e5;
            box-shadow: 0 3rpx 10rpx 0 rgba(0,0,0,.1);
            .btn{
                padding: 20rpx;
            }
        }
    }
</style>