<template>
<div>
	<div class="header">
		{{route.name == 'index'?
		'首页':
		route.name == 'login'?
		'用户登录':
		route.name == 'applyfor'?
		'我要申请':
		route.name == 'applylist'?
		'申请记录':
		route.name == 'applydetail'?
		'记录详情':
		route.name == 'usercenter'?
		'个人中心':
		route.name == 'rules'?
		'申请规则':
		route.name == 'aboutus'?
		'关于我们':
		''
		}}
		<div style="position:absolute;left:12px;top:0;" @click="goback">
			<van-icon name="arrow-left" v-show="route.name == 'rules' || route.name == 'aboutus' || route.name == 'applydetail'" style="margin-top:14px"/>
		</div>
		
	</div>
	<div class="main-body">
		<router-view></router-view>
	</div>
	<div class="footer" v-show="route.name != 'login'">
		<div :class="route.name == 'index'?'foorer-bar-item':''" @click="$router.push('/')">
			<img src="../public/img/shouye-1.png" v-show="route.name == 'index'">
			<img src="../public/img/shouye-2.png" v-show="route.name != 'index'">
			<div>首页</div>
		</div>
		<div :class="route.name == 'applyfor'?'foorer-bar-item':''" @click="$router.push('/applyfor')">
			<img src="../public/img/baobei-1.png" v-show="route.name == 'applyfor'">
			<img src="../public/img/baobei-2.png" v-show="route.name != 'applyfor'">
			<div>我要申请</div>
		</div>
		<div :class="route.name == 'applylist' || route.name == 'applydetail'?'foorer-bar-item':''" @click="$router.push('/applylist')">
			<img src="../public/img/shenqing-1.png" v-show="route.name == 'applylist' || route.name == 'applydetail'">
			<img src="../public/img/shenqing-2.png" v-show="route.name != 'applylist' && route.name != 'applydetail'">
			<div>申请记录</div>
		</div>
		<div :class="route.name == 'usercenter'?'foorer-bar-item':''" @click="$router.push('/usercenter')">
			<img src="../public/img/geren-1.png" v-show="route.name == 'usercenter'">
			<img src="../public/img/geren-2.png" v-show="route.name != 'usercenter'">
			<div>个人中心</div>
		</div>
	</div>
    <van-overlay :show="loading">
        <van-loading style="position:absolute;top:50%;margin-top:-20px;left:50%;margin-left:-20px" vertical>
            正在加载
        </van-loading>
    </van-overlay>
</div>
</template>
<script>
import {datawork} from './plugins/datawork.js'
import { getToken } from './plugins/gettoken'
import {getCilentId} from './plugins/getclientid'
export default {
	data(){
		return {
			headerTitle:'首页',
			footbar:[],
			ipaddre:'',
			agent:'',
			uniquecode:'',
			commondata:{},
			loading:false
		}
	},
	created(){
		this.loading = true
		let data = {}
		let data2 = {}
		this.ipaddre = returnCitySN["cip"]
		this.agent = navigator.userAgent
		if(localStorage.getItem('uniquecode') && localStorage.getItem('uniquecode').length > 0){
			this.uniquecode = localStorage.getItem('uniquecode')
		}else{
			this.uniquecode = new Date().getTime() + "" + Math.floor(Math.random()*89 +10)
			localStorage.setItem('uniquecode',this.uniquecode)
			this.$store.commit('login/SET_UNIQUE_CODE',this.uniquecode)
		}
		this.commondata = {
			appid:'hlwpfc86b472c5f91f',
			unique_code:this.uniquecode,
			sign_type:'md5',
			version:'2.0',
			format:'JSON',
			charset:'utf-8',
			ip:this.ipaddre,
			agent:this.agent
		}
		this.$store.commit('login/SET_COMMON_DATA', this.commondata)
		localStorage.setItem('commonData',this.commondata)
		for(var i in this.commondata){
			data[i] = this.commondata[i]
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
		data2 = datawork(data)
		if(localStorage.getItem('clientid') && localStorage.getItem('clientid').length > 0 && 
		localStorage.getItem('accesstoken') && localStorage.getItem('accesstoken').length > 0){
			this.loading = false
		}else{
			this.get_client(data2)
		}
	},
	computed:{
		route() {
			return this.$route
		}
	},
	watch:{
		route(val){
			// console.log(val)
		}
	},
	methods:{
		get_client(data){
			this.$api.get_client(data).then(v => {
				let _that = this
				if(v.data.errcode == 0){
					this.loading = false
					localStorage.setItem('clientid',v.data.data.client_id)
					this.$store.commit('login/SET_CLIENT_ID', v.data.data.client_id)
					localStorage.setItem('accesstoken',v.data.data.access_token)
					this.$store.commit('login/SET_ACCESS_TOKEN', v.data.data.access_token)
				}else if(v.data.errcode == 1104){
					getToken(_that.commondata)
					setTimeout(() => {
						if(localStorage.getItem('tokenDone')){
							_that.get_client()
						}
					}, 1000);
				}else if(v.data.errcode == 1103){
					getCilentId(_that.commondata)
					setTimeout(() => {
						if(localStorage.getItem('done')){
							_that.get_client()
						}
					},1000);
				}else{
					this.loading = false
                    this.$toast({
                        message: v.data.errmsg,
                        icon:'fail',
                        duration:1000
                    })
				}
			})
		},
		goback(){
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
.header
	width 100%
	height 44px
	background #ffffff
	font-size 18px /*px*/
	color #1a1a1a
	font-weight bold
	text-align center
	line-height 44px /*px*/
	position fixed
	top 0
	left 0
	z-index 2
.main-body
	width 100%
	padding-bottom 60px
	box-sizing border-box
	margin-top 44px
	display flex
	flex-direction column
.footer
	width 100%
	height 49px
	background #ffffff
	border-top 1px rgba(219,218,223,1) solid /*no*/
	font-size 10px /*px*/
	color #A6A6A6
	line-height 10px /*px*/
	text-align center
	display flex
	position fixed
	bottom 0
	left 0
	>div
		width 25%
		display flex
		flex-direction column
		align-items center
		img
			width 24px
			margin 6px 0 4px 0
	div.foorer-bar-item
		color #6d85ff !important
</style>
