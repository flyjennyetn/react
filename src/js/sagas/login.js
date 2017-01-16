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


function* loginQuery({
	userData
}) {
	const items = yield call(xFetch, {
		requestUrl: 'loginInterface/login.json',
		...userData
	});
	cookie.set('userData', items);
	browserHistory.push('/courses');
}

function* watchLogin() {
	yield takeLatest('login/query', loginQuery);
}

export default function*() {
	yield fork(watchLogin)
}