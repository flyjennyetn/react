import {fetchs} from 'utils/fetch';

/**
 * 获取图片验证码
 */
export function getArticleList() {
    return fetchs('127.0.0.1:8100/mock/matchData/getArticleList_focus_1', {}, 'GET');
}
