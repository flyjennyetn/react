import CONFIG from 'utils/config';
import fetchs from 'utils/fetch';
import axioss from 'utils/axios';

/**
 * 微信下单
 * @param { Object } query 下单参数
 * userId-用户ID cookie获取
 * productIds-产品ID，多个产品用逗号分隔
 * couponId-优惠券ID，没有为空
 * openId-微信openID
 * source-注册来源, cookie获取
 * subsource-注册子来源，cookie获取
 * device-注册终端，PC或者H5
 */
export function orderByWX(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.pay}/api/order/shoppingBuy/wx`, query, 'GET');
}

/**
 * 支付宝下单
 * @param { Object } query 下单参数
 * userId-用户ID cookie获取
 * productIds-产品ID，多个产品用逗号分隔
 * couponId-优惠券ID，没有为空
 * source-注册来源, cookie获取
 * subsource-注册子来源，cookie获取
 * device-注册终端，PC或者H5
 */
export function orderByAlipay(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.pay}/api/order/shoppingBuy/alipay`, query, 'GET');
}

/**
 * 微信重新支付
 * @param { Object } query 下单参数
 * userId-用户ID cookie获取
 * productIds-产品ID，多个产品用逗号分隔
 * couponId-优惠券ID，没有为空
 * openId-微信openID
 * source-注册来源, cookie获取
 * subsource-注册子来源，cookie获取
 * device-注册终端，PC或者H5
 */
export function orderReByWX(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.pay}/api/order/json/rePay/wx`, query, 'GET');
}

/**
 * 支付宝重新支付
 * @param { Object } query 下单参数
 * userId-用户ID cookie获取
 * productIds-产品ID，多个产品用逗号分隔
 * couponId-优惠券ID，没有为空
 * openId-微信openID
 * source-注册来源, cookie获取
 * subsource-注册子来源，cookie获取
 * device-注册终端，PC或者H5
 */
export function orderReByAlipay(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.pay}/api/order/json/rePay/alipay`, query, 'GET');
}

/**
 * 检查订单支付状态
 * @param {String} userId-用户ID cookie获取
 * @param {String} orderId-订单ID
 */
export function selectOrderStatus(userId, orderId) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.pay}/api/order/selectOrderStatus/userId/${userId}/orderId/${orderId}`, {}, 'GET');
}

/**
 * 跳转支付宝支付页，支付宝下单接口返回的 alipay 对象
 * @param { Object } query 跳转参数
 * userId-用户ID cookie获取
 * orderId-订单ID
 * paySn-支付序列号，PS30A8C3C83B
 * productName-商品名称
 * productDesc-商品描述
 * totalFee-总计支付价格
 * returnUrl-支付成功后返回的url
 */
export function orderToAlipay(query) {
	return axioss(`${CONFIG.DOMAIN_PREFIX.pay}/api/order/toAlipay`, query, 'POST');
}

/**
 * 获取代金券列表
 * @param { Object } query 观赛券参数
 * userId-用户ID cookie获取
 * productIds-产品ID，多个产品用逗号分隔
 */
export function getCouponList(query) {
	return fetchs(`${CONFIG.DOMAIN_PREFIX.pay}/api/coupon/list`, query, 'GET');
}
