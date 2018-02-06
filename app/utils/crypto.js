/**
 * Created by flyjennyetn on 2017-12-27.
 */
import CryptoJS from 'crypto-js'

const  sigkey = "6icysy8twnsb9rgr"//签名秘钥
const  seckey = "x59uqk1sbe8vodn2"//加密秘钥

//加密
export const encrypt = (data)=>{
    var k = CryptoJS.enc.Utf8.parse(seckey);
    var srcs = CryptoJS.enc.Utf8.parse(data);
    var encrypted = CryptoJS.AES.encrypt(srcs, k, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

//解密
export const decrypt = (data)=>{
    var k = CryptoJS.enc.Utf8.parse(seckey);
    var decrypt = CryptoJS.AES.decrypt(data, k, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

//签名
export const sha1 = (data)=>{
    data.push(sigkey);
    data.sort();
    var sHA1 = CryptoJS.SHA1(data.join("")).toString(CryptoJS.enc.Hex);
    return sHA1
}