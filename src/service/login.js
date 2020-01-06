import fetchs from 'utils/fetch';
import CONFIG from 'utils/config';

/**
 * 普通登录
 * @param { Object } query 登录参数
 * userName-用户名或手机号
 * diableCode-是否启用图形验证码(0：启用，1：不启用)
 * checkCode-验证码
 * password-密码
 */
export function normalLogin(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/login`, query, 'GET');
}

/**
 * 手机号登录
 * @param { Number } tel 手机号
 * @param { Number } verifyCode 验证码
 */
export function phoneLogin(tel, verifyCode) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/tel/${tel}/verifyCode/${verifyCode}/phoneLogin`, {}, 'GET');
}

/**
 * 快速登录注册 & 登录
 * @param { Number } tel 手机号
 * @param { Number } verifyCode 验证码
 * @param { Object } query 注册参数 source-注册来源, cookie获取。 device-注册终端，PC或者H5
 */
export function quickLogin(tel, verifyCode, query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/tel/${tel}/verifyCode/${verifyCode}/quickLogin`, query, 'GET');
}

/**
 * 绑定手机号并登录(写cookie)--注册时自动调用
 * @param { Object } query
 * userId-用户ID，cookie获取
 * tel-手机号
 * telCode-验证码
 */
export function bindTelAndLogin(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/uc/account/bindTelAndLogin`, query, 'GET');
}

/**
 * 用户注册
 * @param { Object } query 注册参数
 * userName-用户名
 * tel-手机号
 * code-验证码
 * pwd-密码
 * source-注册来源, cookie获取
 * device-注册终端，PC或者H5
 */
export function register(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/register`, query, 'GET');
}

/**
 * 用户登出
 */
export function logout(device) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/loginOut?device=${device}`, {}, 'GET');
}
