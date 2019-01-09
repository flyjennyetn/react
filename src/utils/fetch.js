import fetchJsonp from 'fetch-jsonp'
import Qs from 'qs';

export function fetchs(api, data, rawMethod, dataType) {
    let newUrl = 'http://' + api;
    let queryStr = Qs.stringify(data);
    newUrl += queryStr ? '?' : queryStr;
    return fetchJsonp(newUrl)
    .then(response => response.json()
        .then(json => ({json,response})))
    .then(({json, response}) => {
        return json;
    }).catch((err)=>{
        alert("网络请求异常，请检查网络")
        return false;
    })
}

export function fetch(){

}