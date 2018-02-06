/**
 * Created by flyjennyetn on 2016-10-26.
 */
import axios from 'axios'
import moment from 'moment'
import * as cache from "utils/cache";
import {JYH171229} from './config'
import {randomNum,globalMessage} from './index'
import * as crypto from './crypto'

let config = {
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    timeout: 10000,
    responseType: 'json',
    withCredentials: true,
    transformRequest: [(data) => {
        let datum = {
            ...data.info,
            head:{
                "appid": JYH171229.APPID,
                 "openId":cache.get('userInfo') ? cache.get('userInfo').id : '',
                "transDate": moment().format('YYYYMMDD'),
                "transTime": moment().format('HHmmss'),
                "appkey": JYH171229.APPKEY,
                "sign": "",
                ...data.params
            }
        }
        delete datum.head.requestUrl
        let nonce = randomNum(10);
        let timestamp = moment().format('YYYYMMDDHHmmss');
        let datas = crypto.encrypt(JSON.stringify(datum));
        let signature = crypto.sha1([timestamp,nonce,datas]);
        return JSON.stringify({
            "timestamp":timestamp,
            "nonce":nonce,
            "data":datas,
            "appid": JYH171229.APPID,
            "signature":signature
        })

    }],
    transformResponse: [(json)=> {
        let signature = crypto.sha1([json.timestamp,json.nonce,json.data]).toUpperCase();
        if(signature == json.signature){
            let data = JSON.parse(crypto.decrypt(json.data));
            // 这里提前处理返回的数据
            if (data.resultCode == '10') {
                return data.t
            } else {
                globalMessage(data.resultMsg);
                return false
            }
        }

    }]
};


// axios.interceptors.response.use(function (res) {
//     //相应拦截器
//     return res;
// });

export function postApi(data) {
    let fullUrl = (data.params.requestUrl.indexOf('http') === -1) ? JYH171229.API_HOST + data.params.requestUrl : data.params.requestUrl;
    return axios.post(fullUrl,data, config)
    .then(function(res){
        if(res.data){
            return res.data;
        }
        return res;
    }).catch(function(err){
        globalMessage("网络请求异常，请检查网络");
        return false;
    })
}