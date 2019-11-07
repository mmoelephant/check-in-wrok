export default {
    namespaced: true,
    state:{
        userInfo:{},
        userid:'',
        commondata:{},
        uniquecode:'',
        clientid:'',
        accesstoken:''
    },
    mutations:{
        SET_USER_INFO(state, data) {
            state.userInfo = data
        },
        SET_USER_ID(state, data) {
            state.userid = data
        },
        SET_COMMON_DATA(state,data){
            state.commondata = data
        },
        SET_UNIQUE_CODE(state,data){
            state.uniquecode = data
        },
        SET_CLIENT_ID(state,data){
            state.clientid = data
        },
        SET_ACCESS_TOKEN(state,data){
            state.accesstoken = data
        }
    }
}