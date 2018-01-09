import moment from 'moment'
import {Toast} from 'antd-mobile';
import {JYT171215} from './config'

export const callApi = (fullUrl, data = null) => {

    let opt = {
        method: 'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }
    
    data.info.head = {
        "appid": JYT171215.APPID,
        "transDate": moment().format('YYYYMMDD'),
        "transTime": moment().format('HHmmss'),
        "appkey": JYT171215.APPKEY,
        "sign": "",
        ...data.params
    }
    delete data.params;
    fullUrl+= '?info=' + JSON.stringify(data.info);

    return fetch(encodeURI(fullUrl), opt)
        .then(response => response.json()
        .then(json => ({json,response})))
        .then(({json, response}) => {
            if (!response.ok) {
                if(json.resultCode ==  '10'){
                    return Promise.reject(json.t)
                }else{
                    Toast(json.resultMsg);
                    return false;
                }
            }
            if(json.resultCode ==  '10'){
                return Object.assign({}, json.t)
            }else{
                Toast(json.resultMsg);
                return false;
            }
        }).catch((err)=>{
            console.log(err)
        })
}

export function postApi(data) {
    let fullUrl = (data.params.requestUrl.indexOf('http') === -1) ? JYT171215.API_HOST + data.params.requestUrl : data.params.requestUrl;
    delete data.params.requestUrl
    callApi(fullUrl,data)
}