/**
 * Created by flyjennyetn on 2016-10-26.
 */
import axios from 'axios'
import {REQUESTIMG} from './config'

let config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    timeout: 10000,
    responseType: 'json',
    withCredentials: true,
    transformRequest: [(data) => {
        const datas = "?header="+encodeURIComponent(JSON.stringify(data.params))+"&info=" + encodeURIComponent(JSON.stringify(data.info))
        return datas
    }],
    transformResponse: [(json)=> {
        // 这里提前处理返回的数据
        return json
    }]
};

axios.interceptors.response.use(function (res) {
    //相应拦截器
    return res.data;
});
export function postApi(data) {
    let fullUrl = (data.params.requestUrl.indexOf('http') === -1) ? REQUESTIMG.API_HOST + data.params.requestUrl : data.params.requestUrl;
    delete data.params.requestUrl
    return axios.post(fullUrl,data, config)
    .then(function(res){
        return res;
    }).catch(function(err){
        Toast.info("网络请求异常，请检查网络")
        return false;
    })
}