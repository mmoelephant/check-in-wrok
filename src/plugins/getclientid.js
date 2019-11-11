import {datawork} from './datawork.js'
import api from '../api/api'
import $store from '../store/index'
export function getCilentId(data){
    let getClientData = {}
    let getClientData2 = {}
    let uniquecode
    for(var i in data){
        getClientData[i] = data[i]
    }
    getClientData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
    if(localStorage.getItem('userid')){
        getClientData.user_id = localStorage.getItem('userid')
    }else{
        getClientData.user_id = 0
    }
    if(localStorage.getItem('uniquecode')){
        console.log(localStorage.getItem('uniquecode'))
        uniquecode = localStorage.getItem('uniquecode')
    }
    getClientData.unique_code = uniquecode
    getClientData.timestamp = Math.round(new Date().getTime() / 1000).toString()
    getClientData2 = datawork(getClientData)
    api.get_client(getClientData2).then(v => {
        if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
            console.log(v.data.data.client_id)
            console.log('在插件里面重新获取了client_id')
            localStorage.setItem('clientid',v.data.data.client_id)
            $store.commit('login/SET_CLIENT_ID', v.data.data.client_id)
            localStorage.setItem('accesstoken',v.data.data.access_token)
            $store.commit('login/SET_ACCESS_TOKEN', v.data.data.access_token)
            localStorage.setItem('done',true)
        }else{
            localStorage.setItem('done',false)
        }
    }) 
}