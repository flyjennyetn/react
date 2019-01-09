/**
 * Created by flyjennyetn on 2016-10-26.
 */
import axios from 'axios'
import Qs from "qs";

let config = {
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    timeout: 10000,
    responseType: 'json',
    withCredentials: true,
    transformRequest: [(data) => {
        return Qs.stringify(data);
    }],
    transformResponse: [(json)=> {
        return json;
    }]
};

// axios.interceptors.response.use(function (res) {
//     //相应拦截器
//     return res;
// });

export function axioss(api, data, rawMethod, dataType) {
    let newUrl = 'http://' + api;
    config.method = rawMethod;
    config.data = data;
    return axios(newUrl,config)
    .then(function(res){
        return res;
    }).catch(function(err){
        alert("网络请求异常，请检查网络");
        return false;
    })
}