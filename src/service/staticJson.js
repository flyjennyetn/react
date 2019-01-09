import {axioss} from 'utils/axios';
import * as CONFIG from 'utils/config';

/**
 * 获取首页焦点图信息
 */
export function getArticleList() {
    return axioss(CONFIG.DOMAIN_PREFIX.default + '/matchData/getArticleList_focus_1.json', {}, 'GET', 'json');
}

/**
 * 获取支付成功广告
 */
export function getVipSuccessAd() {
    return axioss(CONFIG.DOMAIN_PREFIX.default + '/vipSuccessAd/json/vipSuccessAd.json', {}, 'GET', 'json');
}

/**
 * 大礼包信息
 */
export function getGiftBag() {
    return axioss(CONFIG.DOMAIN_PREFIX.default + '/giftBag/buySuccess/json/gift_bag_buy_success.json', {}, 'GET', 'json');
}

/**
 * 大礼包信息
 */
export function getTicketInfo() {
    return axioss(CONFIG.DOMAIN_PREFIX.default + '/matchData/config/AppConfigStatic.json', {}, 'GET', 'json');
}

/**
 * 商城头部Banner
 */
export function getMallBanner() {
    return axioss(CONFIG.DOMAIN_PREFIX.default + '/shop/banners.json', {}, 'GET', 'json');
}

/**
 * 获取联赛列表
 */
export function getLeagueList() {
    return axioss(CONFIG.DOMAIN_PREFIX.default + '/matchData/ssports_pcLeagueList.json', {}, 'GET', 'json');
}

/**
 * 获取联赛产品列表
 */
export function getLeagueTicketList(id) {
    return axioss(CONFIG.DOMAIN_PREFIX.default + `/matchData/ssports_pcProductList_${id}.json`, {}, 'GET', 'json');
}

/**
 * 获取会员信息
 */
export function getMemberProductInfo() {
    return axioss(CONFIG.DOMAIN_PREFIX.live + `/matchData/ssports_memberProduct.json`, {}, 'GET', 'json');
}

/**
 * 获取A类付费比赛商品信息
 */
export function getMatchProductInfo(matchId) {
    return axioss(CONFIG.DOMAIN_PREFIX.live + `/matchProductInfo/app/ssports_matchProductInfo_${matchId}.json`, {}, 'GET', 'json');
}

/**
 * 获取赛程列表联赛信息
 */
export function pcChannelList() {
    return axioss(CONFIG.DOMAIN_PREFIX.default + `/matchData/matchList/pcChannelList.json`, {}, 'GET', 'json');
}

/**
 * 获取赛程列表比赛信息
 */
export function pcMatchList(jsonPath) {
    return axioss(CONFIG.DOMAIN_PREFIX.default + jsonPath, {}, 'GET', 'json');
}