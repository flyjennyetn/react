/**
 * Created by flyjennyetn on 2017-12-27.
 */
import CryptoJS from 'crypto-js'

const key='1231231'; //后台key

//加密
export const encrypt = (data)=>{
    var k = CryptoJS.enc.Utf8.parse(key);
    var srcs = CryptoJS.enc.Utf8.parse(data);
    var encrypted = CryptoJS.AES.encrypt(srcs, k, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

//解密
export const decrypt = (data)=>{
    var k = CryptoJS.enc.Utf8.parse(key);
    var decrypt = CryptoJS.AES.decrypt(data, k, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

//签名
export const sha1 = ()=>{
    const sig = 'asfdfgh'; //前端key
    var sHA1 = CryptoJS.SHA1(sig).toString(CryptoJS.enc.Hex);
    return sHA1
}