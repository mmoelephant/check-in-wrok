<template>
<div class="apply-page">
    <div class="apply-type">
        <span>
            申请类型
        </span>
        <div>
            <van-radio-group v-model="type" @change="typechange">
                <van-radio name="1" checked-color="#ff9900">加班</van-radio>
                <van-radio name="2" checked-color="#ff9900">调休</van-radio>
            </van-radio-group>
        </div>
    </div>
    <div class="apply-time">
        <div class="chosedate">
        <span>
            加班/调休日期
        </span>
        <p @click="chosedate">
            <span>{{whatdate == ''?'请选择':whatdate}}</span>
            <van-icon name="arrow" />
        </p>
        </div>
        <div class="chosedate">
        <span>
            开始时间
        </span>
        <p @click="chosestart">
            <span>{{starttime == ''?'请选择':starttime}}</span>
            <van-icon name="arrow" />
        </p>
        </div>
        <div class="chosedate">
        <span>
            结束时间
        </span>
        <p @click="choseend">
            <span>{{endtime == ''?'请选择':endtime}}</span>
            <van-icon name="arrow" />
        </p>
        </div>
        <div class="chosedate" style="border:none">
        <span>
            累计时长
        </span>
        <p>
            {{timediffer}}小时
        </p>
        </div>
    </div>
    <div class="apply-reason">
        <span>相关事由</span>
        <van-field v-model="message" rows="4" autosize type="textarea" placeholder="请输入申请原因"/>
    </div>
    <div class="beizhu">
        还不清楚加班/调休申请规则？
        <span @click="seerule">查看申请规则</span>
    </div>
    <div class="submit-btn" @click="submitApply">
        确认提交
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @change="datechange" @confirm="dateconfirm" @cancel="canceldate"/>
    </van-popup>
    <van-popup v-model="show2" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker v-model="currentTime" type="time" :min-hour="0" :max-hour="23" @change="startchange" @confirm="startconfirm" @cancel="cancelstart"/>
    </van-popup>
    <van-popup v-model="show3" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker v-model="currentTime3" type="time" :min-hour="0" :max-hour="23" @change="endchange" @confirm="endconfirm" @cancel="cancelend"/>
    </van-popup>
    <van-overlay :show="loading">
        <van-loading style="position:absolute;top:50%;margin-top:-15px;left:50%;margin-left:-15px" vertical>
            正在提交
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
            type:'',
            message:'',
            whatdate:'',
            starttime:'',
            starttime2:'',
            endtime:'',
            show:false,
            currentDate: new Date(),
            minDate: new Date(2017,1,1),
            show2:false,
            currentTime: '17:30',
            show3:false,
            currentTime3: '17:30',
            timediffer:'0.0',
            timediffer2:0,
            loading:false
        }
    },
    created(){
        // console.log(new Date(2018,1,1))
        // console.log(this.timediffer)
    },
    watch:{
        whatdate(val){
        }
    },
    methods:{
        typechange(val){
        },
        chosedate(){
            this.show = true
        },
        datechange(val){
            // console.log(val)
            // console.log(val.getValues()[0] + '-' + val.getValues()[1] + '-' + val.getValues()[2])
        },
        dateconfirm(val){
            let year = String(val.getFullYear())
            let month = String(val.getMonth() + 1)
            let month2 = ''
            let day =  String(val.getDate())
            let day2 = ''
            if(month.length == 1){
                month2 = '0' + month
            }else{
                month2 = month
            }
            if(day.length == 1){
                day2 = '0' + day
            }else{
                day2 = day
            }
            this.show = false
            this.whatdate = year + '-' + month2 + '-' + day2
        },
        canceldate(){
            this.show = false
        },
        chosestart(){
            this.show2 = true
        },
        startchange(val){
        },
        startconfirm(val){
            if(val){
                this.starttime = val
                if(this.endtime){
                    this.timeDiff(val,this.endtime)
                }
            }else{
                this.starttime = ''
            }
            this.show2 = false
        },
        cancelstart(){
            this.show2 = false
        },
        choseend(){
            this.show3 = true
        },
        endchange(val){
        },
        endconfirm(val){
            if(val){
                this.endtime = val
                if(this.starttime){
                    this.timeDiff(this.starttime,val)
                }
            }else{
                this.endtime = ''
            }
            this.show3 = false
        },
        cancelend(){
            this.show3 = false
        },
        timeDiff(startTime,endTime){
            this.timediffer = '0.0'
            let start1 = startTime.split(":")
            let startAll = parseInt(start1[0]*60) + parseInt(start1[1])
            let end1 = endTime.split(":")
            let endAll = parseInt(end1[0]*60)+parseInt(end1[1])  
            let time = endAll-startAll
            let time2 = time/60
            this.timediffer2 = time
            if(time <= 0){
                this.timediffer = '0.0'
            }else{
                this.timediffer = time2.toFixed(1).toString()
            }
        },
        submitApply(){
            if(!this.check()) return
            this.loading = true
            let commondata = this.$store.state.login.commondata
            let data = {}
            let data2 = {}
            let _that = this
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
            data.type = this.type
            data.dates = this.whatdate
            data.start_dates = this.whatdate + ' ' + this.starttime + ':00'
            data.end_dates = this.whatdate + ' ' + this.endtime + ':00'
            if(this.message){
                data.content = this.message
            }else{

            }
            data2 = datawork(data)
            this.$api.add_new_record(data2).then(v => {
                if(v.data.errcode == 0){
                    this.loading = false
                    this.$toast({
                        message: '提交成功！',
                        icon:'success',
                        duration:1000
                    })
                    setTimeout(() => {
                        _that.$router.push('/')
                    }, 1000);
                }else if(v.data.errcode == 1104){
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                            _that.submitApply()
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
        check(){
            if(!this.type){
                this.$toast({
                    message: "请选择申请类型",
                    icon:'fail',
                    duration:1000
                })
                return false
            }else if(!this.whatdate){
                this.$toast({
                    message: "请选择申请日期",
                    icon:'fail',
                    duration:1000
                })
                return false
            }else if(!this.starttime){
                this.$toast({
                    message: "请选择开始时间",
                    icon:'fail',
                    duration:1000
                })
                return false  
            }else if(!this.endtime){
                this.$toast({
                    message: "请选择结束时间",
                    icon:'fail',
                    duration:1000
                })
                return false  
            }else if(this.timediffer2 <= 0){
                this.$toast({
                    message: '结束时间必须大于开始时间！',
                    icon:'fail',
                    duration:1000
                })
                return false
            }else{
                return true
            }
        },
        seerule(){
            this.$router.push('/rules')
        }
    }

}
</script>
<style lang="stylus" scoped>
.apply-page
    font-size 15px /*px*/
    color #333
.apply-type,.chosedate
    width 100%
    height 44px
    background #ffffff
    padding 0 16px
    box-sizing border-box
    box-shadow 0px 1px 0px 0px rgba(226,225,230,1), 0px -1px 0px 0px rgba(226,225,230,1)
    margin 16px 0 12px 0
    display flex
    justify-content space-between
    align-items center
.apply-time,.apply-reason
    width 100%
    background #fff
    padding 0 0 0 16px
    box-sizing border-box
    box-shadow 0px 1px 0px 0px rgba(226,225,230,1), 0px -1px 0px 0px rgba(226,225,230,1)
.chosedate
    padding 0 16px 0 0
    border-bottom 1px #f0f0f0 solid /*no*/
    box-shadow none !important
    margin 0 !important
    p
        display flex
        align-items center
        font-size 14px /*px*/
        color #a6a6a6
.apply-reason
    padding 12px 16px
    margin-top 12px
    input
        display block
        border none
        outline none
        font-size 14px /*px*/
        line-height 18px /*px*/
.beizhu
    padding 0 0 0 16px
    box-sizing border-box
    margin-top 10px
    font-size 10px /*px*/
    color #a6a6a6
    span
        color #333
.submit-btn
    width 87%
    height 49px
    background #6d85ff
    border-radius 26px
    box-shadow 0px 3px 6px 0px rgba(98,127,255,0.46)
    margin 32px auto 0
    color #ffffff
    text-align center
    line-height 49px /*px*/
</style>
<style lang="stylus">
.van-radio-group
    display flex
    align-items center
    div+div
        margin-left 24px
    .van-radio__icon
        font-size 14px
        line-height 16px
        .van-icon
            width 16px
            height 16px
            border-color #CECECE
    .van-radio__label
        font-size 14px
        color #333
.van-icon.van-icon-arrow
    margin 2px -4px 0 0
.van-cell
    padding 10px
.van-cell.van-field,.van-cell__value--alone
    font-size 14px
    color #333333
    line-height 16px

</style>