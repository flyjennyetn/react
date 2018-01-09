/**
 * Created by flyjennyetn on 2017-12-26.
 */
import * as cache from 'utils/cache/';

export const getUserData = ()=>{
    //Y001  营业部经理
    //Y002    客户经理
    if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'dev'){
        if(!cache.get('userInfo')){
            let userInfo = native.getUserData();
            //alert(userInfo)
            let data = JSON.parse(userInfo);
            cache.set('userInfo',data);
            cache.set('deviceToken',data.deviceToken); //设备号
            cache.set('systemVersion',data.systemVersion); //版本号
        }
    }    
}

export const JSLoginOut = ()=>{
    if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'dev'){
        cache.set('userInfo',false);
        native.JSLoginOut();
    }
}
