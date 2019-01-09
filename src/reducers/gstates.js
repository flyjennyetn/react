/**
 * Created by flyjennyetn on 2016-10-26.
 */
import Qs from 'qs';
import {
	handleActions
} from 'redux-actions';
import {
	reportConfig
} from 'utils/config';
import * as cache from 'utils/cache';
import util from '@ssports_fe/ssutils';

const gstates = handleActions({
	['gstates/set/loading'](state, action) {
		return {
			...state,
			isLoading: action.isLoading
		};
	},
	['gstates/set/report'](state, action) {
		let imgReportSrc = Object.assign({
			uid: cache.get('P00001') ? cache.get('P00001') : '',
			uuid: util.random.getUUID(),
			ct: new Date().getTime(),
			device: 'H5'
		}, action.param, {
			act: reportConfig.page['ACT' + action.param.act] ? reportConfig.page['ACT' + action.param.act] : action.param.act,
			page: reportConfig.page['PAPE' + action.param.page] ? reportConfig.page['PAPE' + action.param.page] : action.param.page,
			name: reportConfig.page['NAME' + action.param.name] ? reportConfig.page['NAME' + action.param.name] : action.param.name
		})
		return {
			...state,
			imgReportSrc: 'http://data.ssports.com/logs/h5/iqiyi.gif?' + Qs.stringify(imgReportSrc)
		};
	}
}, {
	isLoading: false,
	imgReportSrc: '',
});

export default gstates;