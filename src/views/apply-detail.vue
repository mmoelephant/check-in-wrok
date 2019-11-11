<template>
<div class="detail-page">
    <div class="block1">
        <div class="detailItem">
            <p>申请状态</p>
            <span :class="recordetail != {} && recordetail.status && recordetail.status == 1?
            'state1':
            recordetail != {} && recordetail.status && recordetail.status == 2?
            'state2':
            'state3'">
                {{recordetail != {} && recordetail.statusName?recordetail.statusName:'已通过'}}
            </span>
        </div>
        <div class="detailItem noborder">
            <p>申请类型</p>
            <span>
                {{recordetail != {} && recordetail.typeName?recordetail.typeName:'加班'}}
            </span>
        </div>
    </div>
    <div class="block1 middle">
        <div class="detailItem">
            <p>加班日期</p>
            <span>
                {{recordetail != {} && recordetail.dates?recordetail.dates:'0000-00-00'}}
            </span>
        </div>
        <div class="detailItem">
            <p>开始时间</p>
            <span>
                {{recordetail != {} && recordetail.start_dates?recordetail.start_dates:'00:00'}}
            </span>
        </div>
        <div class="detailItem">
            <p>结束时间</p>
            <span>
                {{recordetail != {} && recordetail.end_dates?recordetail.end_dates:'00:00'}}
            </span>
        </div>
        <div class="detailItem noborder">
            <p>累计时长</p>
            <span>
                {{recordetail != {} && recordetail.hoursName?recordetail.hoursName:'0.0小时'}}
            </span>
        </div>
    </div>
    <div class="block1">
        <div class="detailItem reasonIt">
            <p>相关事由</p>
        </div>
        <div class="reasonBox">
            {{recordetail != {} && recordetail.content?recordetail.content:'无'}}
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
            recordetail:{},
            loading:false
        }
    },
    created(){
        this.get_detail(this.$route.query.id)
    },
    methods:{
        get_detail(aa){
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
            data.id = aa
            data2 = datawork(data)
            this.$api.get_record_detail(data2).then(v => {
                let _that = this
                if(v.data.errcode == 0){
                    this.loading = false
                    this.recordetail = v.data.data.data
                }else if(v.data.errcode == 1104){
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                            _that.get_detail()
                        }
                    }, 1000);
                }else if(v.data.errcode == 1103){
					getCilentId(commondata)
					setTimeout(() => {
						if(localStorage.getItem('done')){
							_that.get_detail()
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
        }
    }
}
</script>
<style lang="stylus" scoped>
.detail-page
    font-size 16px /*px*/
    color #333
.block1
    width 100%
    background #fff
    padding 0 0 0 16px
    border 1px rgba(226,225,230,1) solid /*no*/
    border-left none
    border-right none
    box-sizing border-box
    margin 16px 0 12px 0
    .detailItem
        height 44px
        padding-right 16px
        border-bottom 1px #F0F0F0 solid /*no*/
        box-sizing border-box
        display flex
        justify-content space-between
        align-items center
        span
            font-size 14px /*px*/
            color #666
        span.state1
            color #17C8A5
        span.state2
            color #A6A6A6
        span.state3
            color #FA6A32
    .detailItem.noborder
        border none
    .detailItem.reasonIt
        border none
        height auto
        p
            margin-top 12px
.block1.middle
    margin 12px 0 12px 0
.reasonBox
    min-height 60px
    padding 10px 10px 16px 10px
    box-sizing border-box
    font-size 14px /*px*/
    color #a6a6a6
</style>