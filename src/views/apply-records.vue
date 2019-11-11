<template>
<div class="record-page">
    <div class="record-type">
        <div :class="reType == item.id?'jia active':'jia'" v-for="item in types" :key="item.id" @click="reType = item.id">{{item.name}}</div>
    </div>
    <div class="tabs">
        <div :class="tabOn == item.id?'on':''" v-for="item in tabs" :key="item.id" @click="tabOn = item.id">{{item.name}}</div>
    </div>
    <div class="record-list">
        <div class="record-item" v-for="item in recordlist" :key="item.id" @click="todetail(item.id)">
            <div class="item-head">
                <div>
                    <span class="what-record">{{item.typeName?item.typeName:'加班'}}</span>
                    <span class="what-time">{{item.dates?item.dates:'0000-00-00'}}</span>
                </div>
                <div :class="item.status && item.status == '1'?'what-state':item.status && item.status == '2'?'what-state2':item.status && item.status == '3'?'what-state3':''">
                    {{item.statusName?item.statusName:'待审核'}}
                </div>
            </div>
            <div class="item-detail">
                <div class="d-left">
                    <p>相关事由：<span>{{item.content?item.content:'无'}}</span></p>
                    <p>开始时间：<span>{{item.start_dates?item.start_dates:'00:00'}}</span></p>
                    <p>结束时间：<span>{{item.end_dates?item.end_dates:'00:00'}}</span></p>
                </div>
                <div class="d-right">
                    <span class="d-right-time">{{item.hours?item.hours:'0.0'}}</span>
                    <span>小时</span>
                </div>
            </div>
        </div>
    </div>
    <div class="nodata" v-show="recordlist.length == 0">
        <img src="../../public/img/kongzhuangtai.png" alt="">
        <p>当前没有记录哦</p>
    </div>
    <van-overlay :show="loading">
        <van-loading style="position:absolute;top:50%;margin-top:-20px;left:50%;margin-left:-20px" vertical>
            请稍候！
        </van-loading>
    </van-overlay>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    </van-pull-refresh> -->
</div>
</template>
<script>
import {datawork} from '../plugins/datawork.js'
import { getToken } from '../plugins/gettoken'
import {getCilentId} from '../plugins/getclientid'
export default {
    data(){
        return {
            types:[
                {id:1,name:'加班记录'},
                {id:2,name:'调休记录'}
            ],
            reType:1,
            tabs:[
                {id:1,name:'已通过'},
                {id:2,name:'待审批'},
                {id:3,name:'已驳回'}
            ],
            tabOn:1,
            recordlist:[],
            loading:false,
            // isLoading:false
        }
    },
    created(){
        this.get_list()
    },
    watch:{
        reType(val){
            // 切换加班还是调休的时候，调取数据
            this.get_list()
        },
        tabOn(val){
            // 切换状态标签的时候，调取数据
            this.get_list()
        }
    },
    methods:{
        get_list(){
            this.loading = true
            let data = {}
            let data2 = {}
            let commondata = this.$store.state.login.commondata
            for(var i in commondata){
                data[i] = commondata[i]
            }
            data.timestamp = Math.round(new Date().getTime() / 1000).toString()
            data.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
            if(localStorage.getItem('userid')){
                data.user_id = localStorage.getItem('userid')
            }else{
                data.user_id = '0'
            }
            if(localStorage.getItem('clientid')){
                data.client_id = localStorage.getItem('clientid')
            }
            if(localStorage.getItem('accesstoken')){
                data.access_token = localStorage.getItem('accesstoken')
            }
            data.type = this.reType
            data.status = this.tabOn
            data2 = datawork(data)
            this.$api.get_record_list(data2).then(v => {
                let _that = this
                if(v.data.errcode == 0){
                    this.loading = false
                    this.recordlist = v.data.data.data
                }else if(v.data.errcode == 1104){
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                            _that.get_list()
                        }
                    }, 1000);
                }else if(v.data.errcode == 1103){
					getCilentId(commondata)
					setTimeout(() => {
						if(localStorage.getItem('done')){
							_that.get_list()
						}
					}, 1000);
				}else if(v.data.errmsg == '没有登录'){
                    this.loading = false
                    this.$toast({
                        message: v.data.errmsg,
                        icon:'fail',
                        mask:true,
                        duration:800
                    })
                    setTimeout(() => {
                        _that.$router.push('/login')  
                    }, 800);
                }else{
                    this.loading = false
                    this.$toast({
                        message: v.data.errmsg,
                        icon:'fail',
                        mask:true,
                        duration:800
                    })
                }
            })
        },
        todetail(aa){
            this.$router.push({name:'applydetail',query:{id:aa}})
        },
        // onRefresh() {
        // }
    } 
}
</script>
<style lang="stylus" scoped>
.record-page
    font-size 12px /*px*/
    color #a6a6a6
.record-type
    margin 20px 0 10px 0
    display flex
    justify-content center
    div
        width 172px
        height 30px
        border 1px #E0E0E0 solid /*no*/
        box-sizing border-box
        border-radius 16px 0 0 16px
        text-align center
        // font-family ziti3
        line-height 30px
    div+div
        border-left none
        border-radius 0 16px 16px 0
    div.active
        background #FFE26D
        color #333333
.tabs
    height 44px
    background #ffffff
    padding 0 20px
    box-sizing border-box
    box-shadow 0px 1px 0px 0px rgba(226,225,230,1)
    display flex
    align-items center
    div
        width 33.33333%
        text-align center
        line-height 44px /*px*/
    div.on
        border-bottom 1px #728CFD solid /*no*/
        box-sizing border-box
        color #6d85ff

.record-list
    background #ffffff
    padding-left 16px
    margin-top 10px
    .record-item
        padding 12px 16px 12px 0
        border-bottom 1px #e9e8eb solid /*no*/
        box-sizing border-box
        .item-head
            display flex
            justify-content space-between
            align-items center
            .what-state,.what-state2,.what-state3
                width 50px
                height 16px
                border 1px #17C8A5 solid /*no*/
                border-radius 10px
                box-sizing border-box
                font-size 10px /*px*/
                color #17C8A5
                line-height 14px /*px*/
                text-align center
            .what-state2
                border-color #d9d9d9 !important 
                color #d9d9d9 !important
            .what-state3
                border-color #FA6A32 !important 
                color #FA6A32 !important
            .what-record
                margin-right 10px
                font-size 14px /*px*/
                color #333
                +span
                    font-size 10px /*px*/
                    color #666
        .item-detail
            margin-top 6px
            display flex
            justify-content space-between
            align-items flex-end
            line-height 18px
            .d-right-time
                margin-right 4px
                font-size 24px /*px*/
                color #666
                font-family ziti1

.nodata
    margin-top 80px
    text-align center
    img
        width 76px

</style>