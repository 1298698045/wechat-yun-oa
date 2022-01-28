<template>
    <div class="wrapper">
        <div class="header">
            <van-notice-bar
                :scrollable="false"
                text="删除人员后将会同步删除本周期的排班"
            />
        </div>
        <div class="center">
            <div class="checkbox_wrap">
                        <van-checkbox-group :value="result" @change="onChange">
                    <movable-area style="width:100%;height:500px;">
                                    <movable-view class="movable-view" 
                                    :damping='2000'
                                    :out-of-bounds="true"
                                    :class="{'active':activeIdx==index}"
                                    v-for="(item,index) in list" :y="item.y+'px'" :key="index"
                                    direction="all" 
                                    :animation="false"
                                    @htouchmove="(e)=>{dragChange(e,item)}" :data-index="index"
                                    >
                            <van-cell-group>
                                        <van-cell
                                            :title="item.name"
                                            value-class="value-class"
                                            :data-name="index"
                                            clickable
                                            @click.stop="toggle"
                                            @touchstart="handleClick(index)"
                                            @touchend="handleMouseUp(item,index)"
                                        >
                                            <van-checkbox
                                                :class="'checkboxes-'+index"
                                                :name="item.id"
                                            />
                                        </van-cell>
                            </van-cell-group>
                                    </movable-view>
                    </movable-area>
                        </van-checkbox-group>
            </div>
        </div>
        <div class="footer">
            <div class="row">
                <p class="label" :class="{'active':isModelmes}">已选择<span>{{result.length}}</span>人</p>
                <p class="btn" :class="{'active':isModelmes}">确定</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

            list: [{
                id:1,
                name:'张三',
            },{
                id:2,
                name: '李四',
            },{
                id:3,
                name: '李四2',
            },{
                id:4,
                name: '李四3',
            },{
                id:5,
                name: '李四4',
            }],
            result: [],
            activeIdx: -1,
            recordIdx: 0
        }
    },
    computed:{
        isModelmes(){
            return wx.getStorageSync('isModelmes');
        },
    },
    onLoad(){
        this.list.forEach((item,index)=>{
            const y = index * 44
            this.$set(item,'y',y)
        })
    },
    methods:{
        onChange(e) {
            this.result = e.mp.detail;
        },
        toggle(event) {
            const { name } = event.mp.currentTarget.dataset;
            const checkbox = this.$mp.page.selectComponent(`.checkboxes-${name}`);
            checkbox.toggle();
        },
        noop() {},
        handleClick(index){
            this.recordIdx = index
        },
        dragChange(e, item){
            console.log(e)
            const {index} = e.mp.target.dataset;
            this.activeIdx = index
            item.y = e.y
            console.log('dragChange:', e)
            // if(index!=0){
            //     let prevY = this.list[index-1].y-22
            // }
            
            if(this.recordIdx<this.list.length-1){
                var nextY = this.list[this.recordIdx+1].y-10
                var prevY = this.list[this.recordIdx-1].y-10
                var next
                var prev
                if(e.y>nextY){
                    this.list[this.recordIdx+1].y -= 44
                    next = true
                }
                if(e.y<prevY){
                    prev = true
                    this.list[this.recordIdx-1].y += 44
                }
                if(next){
                    this.recordIdx++
                }
                if(prev){
                    this.recordIdx--
                }
            }

            // console.log('prevY:', prevY)
        },
        handleMouseUp(item,index){
            console.log(item.y)
            setTimeout(()=>{
                item.y =this.list[this.recordIdx].y + 44
                console.log(item.y)
            },0)

        },
        handleVtouchMove(e){
            // console.log(e)
            // const {index} = e.mp.target.dataset;
            // let y = e.clientY;
            // console.log('handleVtouchMove:', e, index,y)
            // this.$nextTick(()=>{
            //     this.list[index].y = y
            // })
            // console.log(this.list)
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
            position: relative;
            .value-class {
                flex: none !important;
            }
            .movable-view{
                width: 100%;
                height: 88rpx !important;
            }
            .movable-view.active{
                z-index: 9999 !important;
            }
        }
        .footer{
            width: 100%;
            position: fixed;
            bottom: 0;
            background: #fff;
            z-index: 999;
            .row{
                display: flex;
                border-top: 1rpx solid #e2e3e5;
                .label{
                    font-size: 24rpx;
                    flex: 1;
                    padding: 30rpx 0 30rpx 20rpx;
                    span{
                        color: #3399ff;
                    }
                }
                .label.active{
                    padding-bottom: 40rpx;
                }
                .btn{
                    width: 150rpx;
                    padding: 30rpx 0;
                    background: #3399ff;
                    color: #fff;
                    font-size: 26rpx;
                    text-align: center;
                }
                .btn.active{
                    padding-bottom: 100rpx;
                }
            }
        }
    }
</style>