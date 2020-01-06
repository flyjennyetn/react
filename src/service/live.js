import fetchs from 'utils/fetch';
import CONFIG from 'utils/config';

/**
 * 直播鉴权(已登录)
 * @param { Number } matchId 比赛ID
 * @param { String } userId 用户ID
 */
export function authByLogin(matchId, userId, device) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.security}/api/channel/v2/watchMatch/match/${matchId}/user/${userId}/device/${device}`, {}, 'GET');
}

/**
 * 直播鉴权(未登录)
 * @param { Number } matchId 比赛ID
 */
export function authByUnlogin(matchId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.security}/api/channel/v2/watchMatch/match/${matchId}/device/app`, {}, 'GET');
}

/**
 * 获取比赛信息
 * @param { Number } matchId 比赛ID
 */
export function getMatchInfo(matchId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.cdn}/images/resources/matchinfo/matchinfo_${matchId}.js`, {}, 'GET', 'script');
}

/**
 * 获取互动直播邀请码
 * @param { Number } matchId
 * @param { String } userId
 */
export function getInviteCode(uid, matchId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.hd}/api/room/query`, { uid, matchId }, 'GET');
}
