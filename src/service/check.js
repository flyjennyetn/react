import {fetchs} from 'utils/fetch';
import * as CONFIG from 'utils/config';

/**
 * 获取图片验证码
 */
export function getImageCode(query) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + '/api/checkCode', query, 'GET');
}

/**
 * 校验密码是否正确--通过原始密码修改
 * @param { String } userId 用户ID
 * @param { Object } query 密码参数
 * password-原始密码
 */
export function checkOriginPwd(userId, query) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + `/api/uc/password/${userId}/vali`, query, 'GET');
}

/**
 * 修改密码--通过原始密码修改
 * @param { Object } query 密码参数
 * userId-用户ID
 * ori_pwd-旧秘密
 * new_pwd-新密码
 */
export function updatePwd(query) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + '/api/user/password/change', query, 'GET');
}

/**
 * 修改密码--通过手机号修改
 * @param { Object } query 密码参数
 * userId-用户ID
 * tel-手机号
 * pwd-新密码
 */
export function updatePwdByTel(query) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + '/api/user/chgpwd/byTel', query, 'GET');
}

/**
 * 绑定手机号
 * @param { Object } query 参数
 * userId-用户ID
 * tel-手机号
 * telCode-验证码
 */
export function bindTel(query) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + '/api/user/account/bindTel', query, 'GET');
}

/**
 * 检查验证码有效性(使用场景：更换手机号，第一步验证原手机号)
 * @param { Number } tel 手机号
 * @param { Number } code 手机验证码
 */
export function checkOriginTel(tel, code) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + `/api/user/tel/${tel}/code/${code}/check`, {}, 'GET');
}

/**
 * 绑定新手机校验手机号是否已存在
 * @param { Number } tel 手机号
 * @param { String } checkCode 图形验证码
 */
export function checkNewTel(tel, checkCode) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + `/api/user/tel/${tel}/smsCode/unique/checkCode/${checkCode}`, {}, 'GET');
}

/**
 * 替换手机号
 * @param { Number } oriTel 原始手机号
 * @param { Number } newTel 新手机号
 * @param { Number } code 手机验证码
 */
export function updateTel(oriTel, newTel, code) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + `/api/user/oriTel/${oriTel}/newTel/${newTel}/code/${code}/chgtel`, {}, 'GET');
}

/**
 * 发送手机验证码
 * @param { Number } tel 手机号
 * @param { String } checkCode 图形验证码
 */
export function sendCode(tel, checkCode) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + `/api/user/tel/${tel}/smsCode/checkCode/${checkCode}`, {}, 'GET');
}

/**
 * 用户名或手机号是否存在
 * @param { String } userName 用户名或手机号
 */
export function checkUsername(userName) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + `/api/user/userName/${userName}/exist`, {}, 'GET');
}

/**
 * 校验图片验证码
 * @param { String } userName 用户名或手机号
 */
export function checkImgCode(imgCode) {
    return fetchs(CONFIG.DOMAIN_PREFIX.user + `/api/user/imgCode/${imgCode}/valid`, {}, 'GET');
}
