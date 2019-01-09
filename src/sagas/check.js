/**
 * Created by flyjennyetn on 2018-10-26.
 */
import {
	call,
	fork,
	put,
    takeLatest
} from 'redux-saga/effects';
import { message } from 'antd';
import * as check from 'service/check'

function* checkGetImageCode({query}) {
	yield put({
		type: 'gstates/set/loading',
		isLoading: true
	});
	const response = yield call(check.getImageCode,query);
	yield put({
		type: 'gstates/set/loading',
		isLoading: false
	});

	if (response && response.resultCode == '10') {
		yield put({
			type: 'check/set/ImageCode',
			dayPrem: response
		});
	} else {
        message.error(response.resultMsg);
	}

}

function* checkCheckOriginPwd({query}) {

}


function* watchCheckGetImageCode() {
	yield takeLatest('check/getImageCode', checkGetImageCode);
}
function* watchCheckCheckOriginPwd() {
	yield takeLatest('check/checkOriginPwd', checkCheckOriginPwd);
}

export default function*() {
	yield fork(watchCheckGetImageCode)
	yield fork(watchCheckCheckOriginPwd)
}