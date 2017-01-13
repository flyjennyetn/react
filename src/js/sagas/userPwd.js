/**
 * Created by flyjennyetn on 2016-10-26.
 */
import xFetch from '../tools/xFetch';
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

function* userPwdEdit({
	token,
	oldPwd,
	newPwd
}) {
	const sta = yield call(xFetch, {
		requestUrl: 'pci/changePwd',
		token,
		oldPwd,
		newPwd
	})
	alert(sta);

}

function* watchUserPwd() {
	yield takeLatest('userPwd/edit', userPwdEdit);
}

export default function*() {
	yield fork(watchUserPwd)
}