/*
 * @Author: sunshaocheng
 * @Date:   2018-04-25 21:01:30
 * @Last Modified by:   Wang Xiao
 * @Last Modified time: 2018-08-31 09:49:49
 */

// 设备类型，是否为移动端
const IS_MOBILE = false;

// 主域名对象
const DOMAIN = {
	cn: 'ssports.iqiyi.com',
	com: 'ssports.com'
};

// 接口域名对象
export const DOMAIN_PREFIX = {
	default: process.env.NODE_ENV === 'development' ? window.location.host : IS_MOBILE === true ? ('m.' + DOMAIN.cn) : ('www.' + DOMAIN.com),
	live: process.env.NODE_ENV === 'development' ? window.location.host : IS_MOBILE === true ? ('m.' + DOMAIN.cn) : (DOMAIN.com),
	user: IS_MOBILE === true ? ('muser.' + DOMAIN.com) : ('user.' + DOMAIN.com),
	pay: IS_MOBILE === true ? ('mpay.' + DOMAIN.com) : ('pay.' + DOMAIN.com),
	hd: IS_MOBILE === true ? ('hd.' + DOMAIN.com) : ('hd.' + DOMAIN.com),
	security: IS_MOBILE === true ? ('msecurity.' + DOMAIN.com) : ('security.' + DOMAIN.com),
	cdn: 'image.' + DOMAIN.com
};

export const reportConfig = {
	act: {
		ACT1005: 1005,
		ACT2000: 2000,
		ACT2010: 2010,
		ACT3000: 3000,
		ACT3030: 3030
	},
	page: {
		PAPE400: 400,
		PAPE401: 401,
		PAPE402: 402,
		PAPE403: 403,
		PAPE404: 404,
		PAPE405: 405,
		PAPE406: 406,
		PAPE407: 407,
		PAPE408: 408,
		PAPE409: 409,
		PAPE409: 410,
		PAPE4061: 4061
	},
	name: {
		NAME502: 502,
		NAME509: 509,
		NAME505: 505,
		NAME510: 510,
		NAME511: 511,
		NAME512: 512,
		NAME513: 513,
		NAME514: 514,
		NAME515: 515,
		NAME516: 516,
		NAME517: 517,
		NAME518: 518,
		NAME521: 521,
		NAME522: 522,
		NAME523: 523,
		NAME529: 529,
		NAME530: 530,
		NAME531: 531,
		NAME532: 532,
		NAME533: 533,
		NAME534: 534,
		NAME535: 535,
		NAME537: 537
	}
};