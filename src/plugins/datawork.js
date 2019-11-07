import {sort_ASCII} from './sortkey.js'
import md5 from 'js-md5'

export function datawork(data){
    let str_join,sign;
    // 第一步：获取排序后的对象
    let data1 = sort_ASCII(data)
    // console.log(data)
    // 第二步：将排序后的对象拼接成字符串
    for(var i in data1){
        str_join += '&' + i + '=' + data1[i]
    }
    // console.log(str_join)
    // 第三步：加上appsecret的拼接字符串
    // console.log(str_join.slice(10) + '&appsecret=3e70f19870703ab16y731c1ac3dc6e4e')
    // 第四步：使用MD5加密生成密钥
    // sign = this.$md5(str_join.slice(10) + '&appsecret=3e70f19870703ab16y731c1ac3dc6e4e').toUpperCase()
    sign = md5(str_join.slice(10) + '&appsecret=3e70f19870703ab1c0e4c3d31zey761a').toUpperCase()
    // 第五步：将生成的sign加入到请求参数对象中
    data1.sign = sign
    // 第六步：重新排序
    let data2 = sort_ASCII(data1)
    return data2
}