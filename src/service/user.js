import fetchs from 'utils/fetch';
import CONFIG from 'utils/config';

/**
 * 获取用户信息
 * @param { String } userId 用户ID
 */
export function getUserInfo(userId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/userId/${userId}/getUserInfo`, {}, 'GET');
}

/**
 * 获取用户权益
 * @param { String } userId 用户ID
 */
export function getMembership(userId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/userId/${userId}/getMembership`, {}, 'GET');
}

/**
 * 获取vip信息接口并更新cookie
 * @param { String } userId 用户ID
 */
export function getVip(userId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/userId/${userId}/getvip`, {}, 'GET');
}

/**
 * 判断用户是否第一次购买会员
 * @param { String } userId 用户ID
 */
export function isFirstVip(userId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/vip/isFirstVip`, { userId }, 'GET');
}

/**
 * 判断用户是否开通过会员
 * @param { String } userId 用户ID
 */
export function checkMemberShip(userId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/userId/${userId}/checkMemberShip`, {}, 'GET');
}

/**
 * 昵称是否存在
 * @param { String } nickName 用户昵称
 */
export function checkNickname(nickName) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/user/nickName/${nickName}/exist`, {}, 'GET');
}

/**
 * 修改昵称
 * @param { Object } query 接口参数
 * userId-用户ID
 * nickName-昵称
 */
export function updateNickname(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/uc/editNickName`, query, 'GET');
}

/**
 * 通过用户ID获取地址
 * @param { string } userId 用户ID
 * userId-用户ID
 */
export function getAddress(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/address/get`, query, 'GET');
}

/**
 * 新增或修改收货地址
 * @param { Object } query 接口参数
 * consignee-收货人姓名，必填
 * province-省份ID，必填
 * city-市ID，必填
 * district-区ID，必填
 * address-详细地址，必填
 * zipcode-邮编，非必填
 * tel-电话号码，必填
 * userId-用户ID，必填
 * addressId-地址ID，新增为空、修改不为空(从获取收货地址接口中获得)
 *
 */
export function updateAddress(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/api/address/add`, query, 'GET');
}

/**
 * 奖品列表(用户中心)
 * @param { String } userId 用户ID cookie获取
 */
export function prizeList(userId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.default}/api/jsonp/pf?url=/prize/getPrizeList`, { userId }, 'GET');
}

/**
 * 获取观赛券列表
 * @param { Object } query 观赛券参数
 * userId-用户ID cookie获取
 * status-状态 0:未使用 1:已使用 2:已过期
 * offset-第几页
 * pageNum-每页条数
 */
export function getTicketList(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.user}/uc/ticket/list`, query, 'GET');
}

/**
 * 观赛券列表(用户中心)
 * @param { Number } couponType 观赛券状态 0-未使用，1-已使用，2-已过期
 */
export function couponList(userId, type, offset = 1, pageNum = 20) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.default}/api/jsonp/pf?url=/coupon/couponlist`, {
		userId, type, offset, pageNum
	}, 'GET');
}

/**
 * 订单列表(用户中心)
 * @param { Number } orderStatus 订单状态 e_a_n_r_w-全部订单，e-已付款，a-未付款，n-已取消
 */
export function getOrderList(orderStatus, userId, p = 1) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.default}/api/uc/jsonp/order/${orderStatus}/${userId}/list`, { p }, 'GET');
}

/**
 * 订单详情(用户中心)
 * @param { String } orderId 订单ID
 * @param { String } userId 用户ID
 */
export function getOrderDetail(orderId, userId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.default}/api/jsonp/pf?url=/order/getOrderDetail`, { userId, orderId }, 'GET');
}
