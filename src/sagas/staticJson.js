/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	call,
	fork,
	put,
    takeLatest
} from 'redux-saga/effects';
import { message } from 'antd';
import * as staticJson from 'service/staticJson'

function* staticJsonGetArticleList_focus_1() {

	yield put({
		type: 'gstates/set/loading',
		isLoading: true
	});
	const response = yield call(staticJson.getArticleList);
	yield put({
		type: 'gstates/set/loading',
		isLoading: false
	});
	console.log(response)
	// if (response && response.resultCode == '10') {
	// 	yield put({
	// 		type: 'check/set/ImageCode',
	// 		dayPrem: response
	// 	});
	// } else {
    //     message.error(response.resultMsg);
	// }
}

function* watchStaticJsonGetArticleList_focus_1() {
	yield takeLatest('staticJson/getArticleList_focus_1', staticJsonGetArticleList_focus_1);
}


export default function*() {
	yield fork(watchStaticJsonGetArticleList_focus_1)
}