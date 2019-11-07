import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
const test = 'http://testc.dlzjzy.com'
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'development'?'/api':test+'/index.php',
    withCredentials: false,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
service.interceptors.response.use(
    response => {
      return response
    },
    (error) => {
        alert('网络错误，请稍后重试')
        return Promise.reject(error)
    }
)
const api = {
    get_client(data){
        if(data) data = qs.stringify(data, { allowDots: true })
        return service.post('/Api/Access/client',data)
    },
    get_token(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/Access/token',data)
    },
    login(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/Passport/login',data)
    },
    get_time(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/Record/hours',data)
    },
    add_new_record(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/Record/add',data)
    },
    get_record_list(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/Record/search',data)
    },
    get_record_detail(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/Record/detail',data)
    },
    get_user(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/User/index',data)      
    },
    get_user_info(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/User/info',data)  
    },
    log_out(data){
        if(data) data = qs.stringify(data,{allowDots:true})
        return service.post('/Api/User/logout',data)    
    }
    
}

export default api