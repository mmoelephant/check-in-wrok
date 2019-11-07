import {datawork} from './datawork.js'
import api from '../api/api'
import $store from '../store/index'

export function getToken(data){
    let getTokenData = {}
    let getTokenData2 = {}
    let uniquecode
    let clientid
    for(var i in data){
        getTokenData[i] = data[i]
    }
    getTokenData.nonce_str = new Date().getTime() + "" + Math.floor(Math.random()*899 +100)
    getTokenData.timestamp = Math.round(new Date().getTime() / 1000).toString()
    if(localStorage.getItem('userid')){
        getTokenData.user_id = localStorage.getItem('userid')
    }else{
        getTokenData.user_id = '0'
    }
    if(localStorage.getItem('uniquecode')){
        uniquecode = localStorage.getItem('uniquecode')
    }
    getTokenData.unique_code = uniquecode
    if(localStorage.getItem('clientid')){
        clientid = localStorage.getItem('clientid')
    }
    getTokenData.client_id = clientid
    getTokenData2 = datawork(getTokenData)
    api.get_token(getTokenData2).then(v => {
        if(v.data.errcode == 0 && v.data.errmsg == 'ok'){
            localStorage.setItem('accesstoken',v.data.data.access_token)
            $store.commit('login/SET_ACCESS_TOKEN', v.data.data.access_token)
            localStorage.setItem('tokenDone',true)
        }else{
            localStorage.setItem('tokenDone',false)
        }
    })
}