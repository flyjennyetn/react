import fetchs from 'utils/fetch';
import CONFIG from 'utils/config';

/**
 * 获取微信openid
 * @param { Object } query 获取openId参数
 * code-微信返回的url中的参数
 */
export function getOpenId(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.pay}/api/order/h5/getWXOpenId`, query, 'GET');
}

/**
 * 百视通直播鉴权
 * @param { Number } matchId 比赛ID
 * @param { String } openId 手机号对应唯一标识符，通过url获取
 */
export function liveAuthBestTV(matchId, openId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.security}/api/channel/v2/watchMatch/match/${matchId}/openid/${openId}/device/h5`, {}, 'GET');
}

/**
 * 微信SDK接口
 * @param { Object } paymentUrl
 */
export function wxRegister(paymentUrl) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.pay}/api/order/h5/wxRegister`, { paymentUrl }, 'GET');
}
