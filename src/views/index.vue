<template>
<div class="index-page">
    <div class="ban">
        <div class="ban-info">
            <div :class="item.id == 2?'tiao':item.id == 9?'remain':''" v-for="item in baninfos" :key="item.id">
                <div class="info-title">{{item.name?item.name:''}}</div>
                <div class="info-time">
                    <span class="time">{{item.hours?item.hours:'0.0'}}</span>
                    小时
                </div>
            </div>
        </div>
    </div>
    <div class="latest">
        <div class="l-tilte">
            <span>最新记录</span>
            <p @click="seemore">
                <span>查看全部</span>
                <van-icon name="arrow"/>
            </p>
        </div>
        <div class="record-list">
            <div class="record-item" v-for="item in indexrecords" :key="item.id" @click="todetail(item.id)">
                <div class="item-head">
                    <div>
                        <span class="what-record">{{item.typeName?item.typeName:'加班'}}</span>
                        <span class="what-time">{{item.dates?item.dates:'0000-00-00'}}</span>
                    </div>
                    <div :class="item.status && item.status == 1?'what-state':item.status && item.status == 2?'what-state2':'what-state3'">
                        {{item.statusName?item.statusName:'待审批'}}
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
    </div>
    <van-overlay :show="loading">
        <van-loading style="position:absolute;top:50%;margin-top:-20px;left:50%;margin-left:-20px" vertical>
            请稍候！
        </van-loading>
    </van-overlay>
</div>
</template>
<script>
import {datawork} from '../plugins/datawork.js'
import { getToken } from '../plugins/gettoken'
import {getCilentId} from '../plugins/getclientid'
export default {
    data(){
        return {
            loading:false,
            baninfos:[],
            indexrecords:[]
        }
    },
    created(){
        this.get_user()
    },
    methods:{
        get_user(){
            this.loading = true
            this.baninfos = []
            this.indexrecords = []
            let data = {}
            let data2 = {}
            let commondata = {}
            commondata = this.$store.state.login.commondata
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
            data2 = datawork(data)
            this.$api.get_user(data2).then(v => {
                let _that = this
                if(v.data.errcode == 0){
                    this.loading = false
                    this.baninfos = v.data.data.countData
                    this.indexrecords = v.data.data.data
                }else if(v.data.errcode == 1104){ 
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                            _that.get_user()
                        }
                    }, 1000);
                }else if(v.data.errcode == 1103){
					getCilentId(commondata)
					setTimeout(() => {
						if(localStorage.getItem('done')){
							_that.get_user()
						}
					}, 1000);
				}else{
                    this.loading = false
                    this.$toast({
                        message: v.data.errmsg,
                        icon:'fail',
                        mask:true,
                        duration:1000
                    })   
                }
            })
        },
        seemore(){
            this.$router.push('applylist')
        },
        todetail(aa){
            this.$router.push({name:'applydetail',query:{id:aa}})
        }
    }
}
</script>
<style lang="stylus" scoped>
.index-page
    font-size 12px /*px*/
    color #a6a6a6
.ban
    width 100%
    height 114px
    background url(../../public/img/shouyebg.png) no-repeat left top
    background-size contain
    margin-bottom 38px
    position relative
.ban-info
    width 92%
    height 90px
    background #ffffff
    box-shadow 0px 2px 6px 0px rgba(90,87,95,0.06)
    border-radius 8px
    padding 24px 0
    box-sizing border-box
    position absolute
    top 40px
    left 50%
    margin-left -46%
    display flex
    justify-content center
    >div
        display flex
        flex-direction column
        align-items center
        text-align center
.tiao
    margin 0 36px
.info-time
    color #333
    span
        font-size 28px /*px*/
        font-family ziti1
.remain
    span
        color #6d85ff
.latest
    width 100%
    background #ffffff
    padding 0 0 0 16px
    box-sizing border-box
    .l-tilte
        width 100%
        height 40px
        border-bottom 1px #f0f0f0 solid /*no*/
        box-sizing border-box
        display flex
        justify-content space-between
        align-items center
        span
            font-size 14px /*px*/
            color #666666
        p
            margin-right 16px
            display flex
            align-items center
            span
                font-size 12px /*px*/
                color #a6a6a6
    .record-item
        padding 12px 16px 12px 0
        border-bottom 1px #e9e8eb solid /*no*/
        box-sizing border-box
        .item-head
            display flex
            justify-content space-between
            align-items center
            .what-state,.what-state2,.what-state3
                width 49px
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
            line-height 18px /*px*/
            .d-right-time
                margin-right 2px
                font-size 24px /*px*/
                color #666
                font-family ziti1
</style>
<style lang="stylus">
.van-icon.van-icon-arrow
    margin 0 -4px 0 0
</style>