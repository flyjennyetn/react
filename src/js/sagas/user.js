/**
 * Created by flyjennyetn on 2016-10-26.
 */
import xFetch from '../utils/xFetch';
import {
	takeLatest
} from 'redux-saga';
import {
	take,
	put,
	call,
	fork,
	select
} from 'redux-saga/effects';
import cookie from 'js-cookie';
import {
	browserHistory
} from 'react-router';


function* userQueryPci({
	token
}) {
	const userInfo = yield call(xFetch, {
		requestUrl: 'pci/getStuInfo',
		token
	})
	yield put({
		type: 'user/set/info',
		userInfo
	});
}

function* watchUser() {
	yield takeLatest('user/query/pci', userQueryPci);
}

export default function*() {
	yield fork(watchUser)
}