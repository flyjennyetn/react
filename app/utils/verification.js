/**
 * Created by flyjennyetn on 2016-10-26.
 */
export const validCredNum = (type,credNum)=> {
    var validFlag = true;
    if (typeof credNum == "undefined" || credNum == null || credNum == "" || credNum == "-1") {
        validFlag = false;
    }else{
        if ("1" == type) {//身份证
            validFlag = isCardID(credNum);
        } else if ("3" == type){               //护照号
            GetLength(Trim(credNum,'g'))<3 ? validFlag = false : validFlag = true;
        }else if ("4" == type) {            //台湾居民来往大陆通行证（台胞证）、或港澳居民往来内地通行证（回乡证）
            GetLength(Trim(credNum,'g'))<8 ? validFlag = false : validFlag = true;
            // validFlag = (/^[a-zA-Z\d]{6,10}$/).test(credNum);
        }else if ("5" == type) {            //军官证／警官证
            GetLength(Trim(credNum,'g'))<10 || GetLength(Trim(credNum,'g'))>18? validFlag = false : validFlag = true;
            // validFlag = (/^[a-zA-Z\d]{6,10}$/).test(credNum);
        }else if ("6" == type) {            //异常身份证
            GetLength(Trim(credNum,'g'))!=18? validFlag = false : validFlag = true;
            // validFlag = (/^[a-zA-Z\d]{6,10}$/).test(credNum);
        } else if ("mobile" == type){//手机
            if(credNum.length == 10 && credNum.indexOf('09') == 0||credNum.length == 11 && credNum.indexOf('1') == 0){
                validFlag = true;
            }else{
                validFlag = false;
            }
            // validFlag = (/^[\+86|86]?1[3|4|5|7|8]\d{9}$/.test(credNum));
        } else if ("name" == type){//姓名
            let credName = Trim(credNum,'g');
            GetLength(credName)<3||(/\d+/g).test(credName)||(/[#&]/).test(credName)?validFlag = false:validFlag = true;
            // validFlag = (/^[\u4e00-\u9fa5a-zA-Z]{2,20}$/).test(credNum);
        } else if ("email" == type){//邮箱
            validFlag = (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(credNum));
        } else if ("postCode" == type){//邮政编码
            validFlag = (/^[0-9]{6}$/).test(credNum);
        } else if ("passWord" == type){ //密码验证 6-20位，字母、数字、符号的组合
            validFlag = (/^[\w.]{6,20}$/).test(credNum)
        } else if ('number' == type){     //验证是否为全数字
            validFlag = (/^(\d|[1-9]\d+)(\.\d+)?$/).test(credNum)
        } else if('symbol' == type){
            validFlag = (/[\u4E00-\u9FA5]/g).test(Trim(credNum,'g'))              //详细地址
        }else if('protection' == type){
            validFlag = (/^[a-zA-Z0-9]{3,21}$/||/^(P\d{7})|(G\d{8})$/).test(credNum)     //护照
        }else if('officers' == type){
            validFlag = (/^[a-zA-Z0-9]{7,21}$/).test(credNum)     //军官证
        }else if('book' == type){
            validFlag = ( /^[a-zA-Z0-9]{3,21}$/).test(credNum)     //  户口本
        }else if('bankCard' == type){
            validFlag = ( /^(\d{16}|\d{19})$/).test(credNum)     //  银行卡
        }else if('telephone' == type){
            if(credNum.indexOf('400') == 0 ||credNum.indexOf('800') == 0){
                if(credNum.length !=10){
                    validFlag = false
                }
            }else {
                validFlag = (/^0\d{2,3}-?\d{7,8}$/).test(credNum)
            }
        }
    }
    return validFlag;
};
function Trim(str,is_global)
{
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g")
    {
        result = result.replace(/\s/g,"");
    }
    return result;
}
function GetLength (str) {
    return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
}
export const isCardID = sId => {
    var that = this;
    var aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    var iSum = 0;
    var info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
        return false;
    }
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null){
        return false;
    }
    var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
        return false;
    }
    for (var i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    }
    if (iSum % 11 != 1) {
        return false;
    }
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return true;
}