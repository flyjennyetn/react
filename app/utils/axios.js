/**
 * Created by flyjennyetn on 2016-10-26.
 */
import axios from 'axios'
import moment from 'moment'
import {Toast} from 'antd-mobile';
import {JYH171229} from './config'

let config = {
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    timeout: 10000,
    responseType: 'json',
    withCredentials: true,
    transformRequest: [(data) => {
        data = {
            ...data.info,
            head:{
                "transId": "",
                "appid": JYH171229.APPID,
                "transDate": moment().format('YYYYMMDD'),
                "transTime": moment().format('HHmmss'),
                "appkey": JYH171229.APPKEY,
                ...data.params
            }
        }

        // delete data.params
        console.log(JSON.stringify(data))
        return JSON.stringify(data)
    }],
    transformResponse: [(json)=> {
        // 这里提前处理返回的数据
        if (json.resultCode == '10') {
            return json.t
        } else {
            Toast.info(json.resultMsg)
            return false
        }
    }]
};
axios.interceptors.response.use(function (res) {
    //相应拦截器
    return res.data;
});
export function postApi(data) {
    let fullUrl = (data.params.requestUrl.indexOf('http') === -1) ? JYH171229.API_HOST + data.params.requestUrl : data.params.requestUrl;
    delete data.params.requestUrl
    return axios.post(fullUrl,data, config)
}