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
        <van-loading style="position:absolute;top:50%;margin-top:-15px;left:50%;margin-left:-15px" vertical>
            请稍候！
        </van-loading>
    </van-overlay>
</div>
</template>
<script>
import {datawork} from '../plugins/datawork.js'
import { getToken } from '../plugins/gettoken'
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
            loading:false
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
                console.log(v)
                if(v.data.errcode == 0){
                    this.loading = false
                    this.recordlist = v.data.data.data
                }else if(v.data.errcode == 1104){
                    let _that = this
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                            _that.get_list()
                        }
                    }, 1000);
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
        }
    } 
}
</script>
<style lang="stylus" scoped>
.record-page
    font-size 24px /*px*/
    color #a6a6a6
.record-type
    margin 40px 0 20px 0
    display flex
    justify-content center
    div
        width 344px
        height 60px
        border 2px #E0E0E0 solid /*no*/
        box-sizing border-box
        border-radius 32px 0 0 32px
        text-align center
        font-family ziti3
        line-height 58px
    div+div
        border-left none
        border-radius 0 32px 32px 0
    div.active
        background #FFE26D
        color #333333
.tabs
    height 88px
    background #ffffff
    padding 0 40px
    box-sizing border-box
    box-shadow 0px 1px 0px 0px rgba(226,225,230,1)
    display flex
    align-items center
    div
        width 33.33333%
        text-align center
        line-height 88px /*px*/
    div.on
        border-bottom 2px #728CFD solid /*no*/
        box-sizing border-box
        color #6d85ff

.record-list
    background #ffffff
    padding-left 32px
    margin-top 20px
    .record-item
        padding 24px 32px 24px 0
        border-bottom 1px #e9e8eb solid /*no*/
        box-sizing border-box
        .item-head
            display flex
            justify-content space-between
            align-items center
            .what-state,.what-state2,.what-state3
                width 98px
                height 32px
                border 2px #17C8A5 solid /*no*/
                border-radius 20px
                box-sizing border-box
                font-size 20px /*px*/
                color #17C8A5
                line-height 28px /*px*/
                text-align center
            .what-state2
                border-color #d9d9d9 !important 
                color #d9d9d9 !important
            .what-state3
                border-color #FA6A32 !important 
                color #FA6A32 !important
            .what-record
                margin-right 20px
                font-size 28px /*px*/
                color #333
                font-family ziti3
                +span
                    font-size 20px /*px*/
                    color #666
                    font-family ziti2
        .item-detail
            margin-top 14px
            display flex
            justify-content space-between
            align-items flex-end
            line-height 36px
            .d-right-time
                margin-right 8px
                font-size 48px /*px*/
                color #666
                font-family ziti1
                +span
                    font-family ziti3

.nodata
    margin-top 160px
    text-align center
    img
        width 152px

</style>