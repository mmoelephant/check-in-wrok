<template>
<div>
    <div class="touxiang">
        <img src="../../public/img/touxiang-1.png">
    </div>
    <div class="login-box">
        <div class="login-inputs">
            <div class="input1">
                <span>账号</span>
                <input type="text" placeholder="请输入账号" v-model="username">
            </div>
            <div class="input1">
                <span>密码</span>
                <input type="password" placeholder="请输入密码" v-model="password">
            </div>
        </div>
        <div class="login-btn" @click="login">登 录</div>
    </div>
    <div class="notes">
        <span>·&nbsp&nbsp加班调休系统v1.0&nbsp&nbsp·</span>
        <!-- <span @click="seerule">查看申请规则</span> -->
    </div>
    <van-overlay :show="loading">
        <van-loading style="position:absolute;top:50%;margin-top:-20px;left:50%;margin-left:-20px" vertical>
            正在提交
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
            username:'',
            password:'',
            loading:false
        }
    },
    components: {
    },
    methods:{
        login(){
            if(!this.check()) return
            this.loading = true
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
                this.$store.commit('login/SET_USER_ID', '')
                this.$store.commit('login/SET_USER_INFO', '')
                localStorage.removeItem('userid')
                localStorage.removeItem('user')
            }
            if(localStorage.getItem('clientid')){
                data.client_id = localStorage.getItem('clientid')
            }
            if(localStorage.getItem('accesstoken')){
                data.access_token = localStorage.getItem('accesstoken')
            }
            data.username = this.username
            data.password = this.password
            data2 = datawork(data)
            let me = this
            this.$api.login(data2).then(v => {
                if(v.data.errcode == 0){
                    this.loading = false
                    this.$store.commit('login/SET_USER_ID', v.data.data.id)
                    localStorage.setItem('userid', v.data.data.id)
                    localStorage.setItem('user', JSON.stringify(v.data.data))
                    this.$store.commit('login/SET_USER_INFO', v.data.data)
                    this.$toast({
                        message: '登录成功！',
                        icon:'success',
                        duration:1000
                    })
                    setTimeout(function(){
                        me.$router.push({name:'index'})
                    },1000)
                }else if(v.data.errcode == 1104){
                    // token失效，重新获取token
                    getToken(commondata)
                    setTimeout(() => {
                        if(localStorage.getItem('tokenDone')){
                            me.login()
                        }
                    }, 1000);
                }else if(v.data.errcode == 1103){
                    // clientid失效重新获取
					getCilentId(commondata)
					setTimeout(() => {
						if(localStorage.getItem('done')){
							me.login()
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
                        me.$router.push('/login')
                    }, 800);
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
        check() {
            if(!this.username || this.username.length==0) {
                this.$toast({
                    message: '请输入账号！',
                    icon:'fail',
                    duration:1000
                })
                return false
            } else if(!this.password || this.password.length==0) {
                this.$toast({
                    message: '请输入密码！',
                    icon:'fail',
                    duration:1000
                })            
                return false
            }else {
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
.touxiang
    margin 70px 0 30px 0
    text-align center
    img
        width 72px
.login-inputs
    width 100%
    background #fff
    padding-left 24px
    box-sizing border-box
    box-shadow 0px 1px 0px 0px rgba(226,225,230,1), 0px -1px 0px 0px rgba(226,225,230,1)
    font-size 14px /*px*/
    color #666
    div
        display flex
        align-items center
        border-bottom 1px #f0f0f0 solid /*no*/
        box-sizing border-box
        input
            width 80%
            height 49px
            background rgba(0,0,0,0)
            border none
            // border 1px red solid
            outline none
            text-indent 14px
            font-size 14px /*px*/
            
    div+div
        border none
.login-btn
    width 87%
    height 49px
    background #6d85ff
    border-radius 26px
    box-shadow 0px 3px 6px 0px rgba(98,127,255,0.46)
    margin 32px auto 0
    font-size 16px /*px*/
    color #ffffff
    // font-family ziti3
    text-align center
    line-height 49px /*px*/

.notes
    margin-top 28px
    font-size 12px /*px*/
    color #a6a6a6
    text-align center
    span
        // display inline-block
        padding 0 10px
        box-sizing border-box
    // span + span
    //     border none
    //     color #333333
</style>