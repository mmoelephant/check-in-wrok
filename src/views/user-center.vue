<template>
<div class="user-page">
    <div class="usercard">
        <div class="card-left">
            <p class="gongsi">{{userinfos != {} && userinfos.department_name?userinfos.department_name:'行列科技'}}</p>
            <p class="name">{{userinfos != {} && userinfos.realname?userinfos.realname:'姓名'}}</p>
            <p class="job">{{userinfos != {} && userinfos.position?userinfos.position:'职位'}}</p>
        </div>
        <div class="card-right">
            <img src="../../public/img/touxiang-2.png" alt="">
        </div>
    </div>
    <div class="block1">
        <div class="detailItem">
            <p>账号状态</p>
            <span class="state1">
                正常使用
            </span>
        </div>
        <div class="detailItem" @click="toRule">
            <p>申请规则</p>
            <van-icon name="arrow" />
        </div>
        <div class="detailItem noborder" @click="aboutus">
            <p>关于我们</p>
            <van-icon name="arrow" />
        </div>
    </div>
    <div class="logout" v-show="user" @click="logout">
        退出登录
    </div>
    <!-- <div class="block1" v-show="this.user">
        <div class="detailItem logout" @click="logout">
            退出登录
        </div>
    </div> -->
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
            userinfos:{},
            loading:false
        }
    },
    computed:{
        user(){
            return JSON.parse(localStorage.getItem('user'))
        }
    },
    watch:{
        user(val){
            // console.log(val)
        }
    },
    created(){
        this.get_user_info()
        // console.log(localStorage.getItem('user'))
    },
    methods:{
        get_user_info(){
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
            data2 = datawork(data)
            this.$api.get_user_info(data2).then(v => {
                let _that = this
                if(v.data.errcode == 0){
                    this.loading = false
                    this.userinfos = v.data.data
                }else if(v.data.errcode == 1104){
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                            _that.get_user_info()
                        }
                    },1000);
                }else if(v.data.errcode == 1103){
                    // clientid失效重新获取
					getCilentId(commondata)
					setTimeout(() => {
						if(localStorage.getItem('done')){
							_that.get_user_info()
						}
					},1000);
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
        logout(){
            this.loading = true
            let _that = this
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
            data2 = datawork(data)
            this.$api.log_out(data2).then(v => {
                if(v.data.errcode == 0){
                    this.loading = false
                    localStorage.removeItem('userid')
                    this.$store.commit('login/SET_USER_ID', '')
                    localStorage.removeItem('user')
                    this.$store.commit('login/SET_USER_INFO', '')
                    this.$toast({
                        message: '退出成功！',
                        icon:'success',
                        duration:1000
                    })
                    setTimeout(() => {
                        _that.$router.push('/login')
                    }, 1000);
                }else if(v.data.errcode == 1104){
                    let _that = this
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                             _that.logout()
                        }
                    },1000);
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
        toRule(){
            this.$router.push('/rules')
        },
        aboutus(){
            this.$router.push('/aboutus')
        }
    }
}
</script>
<style lang="stylus" scoped>
.user-page
    font-size 16px /*px*/
    color #333
.usercard
    width 92%
    height 140px
    background #ffffff
    padding 20px
    box-sizing border-box
    box-shadow 0px 6px 18px 0px rgba(90,87,95,0.14)
    border-radius 8px
    margin 20px auto
    display flex
    justify-content space-between
    .gongsi
        font-size 14px /*px*/
        color #a6a6a6
        font-weight bold
    .name
        font-size 18px /*px*/
        font-weight bold
        margin 34px 0 6px 0
    .job
        font-size 14px /*px*/
        color #666
    img
        width 44px
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
            color #6d85ff
    .detailItem.noborder
        border none
.logout
    height 44px
    background #ffffff
    border 1px rgba(226,225,230,1) solid /*no*/
    margin-top 26px
    color #D42121
    text-align center
    line-height 44px /*px*/
</style>
<style lang="stylus">
.van-icon.van-icon-arrow
    color #a6a6a6
</style>