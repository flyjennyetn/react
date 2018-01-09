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

        let datum = {
            ...data.info,
            head:{
                "appid": JYT171215.APPID,
                "transDate": moment().format('YYYYMMDD'),
                "transTime": moment().format('HHmmss'),
                "appkey": JYT171215.APPKEY,
                "sign": "",
                ...data.params
            }
        }
        delete datum.head.requestUrl
        return JSON.stringify(datum)
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
    return axios.post(fullUrl,data, config)
}