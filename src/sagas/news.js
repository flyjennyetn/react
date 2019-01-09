/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
    takeLatest,
	call,
	fork,
	put
} from 'redux-saga/effects';
// import {queryPolicy,findMcomList,uploadPic,userComInfo} from 'utils/service'

function* newsPremQuery({}) {
	console.log(111)
	// yield put({
	// 	type: 'gstates/set/loading',
	// 	isLoading: true
	// });
	// const response = yield call(postApi, {
	// 	params: queryPolicy,
	// 	info: {
	// 		"rows": "10",
	// 		"page": "1",
	// 		"holderCercode": "320926196512230059", //投保人证件号
	// 		"holderName": "吴亚林" //投保人姓名
	// 	}
	// });
	// yield put({
	// 	type: 'gstates/set/loading',
	// 	isLoading: false
	// });

	// if (response && response.resultCode == '10') {
	// 	//后台返回的数据必须在这个地方处理不能在页面处理
	// 	yield put({
	// 		type: 'news/set/premQuery',
	// 		dayPrem: response.list[0].dayPrem == 0 ? null : response.list[0].dayPrem,
	// 		monPrem: response.list[0].monPrem
	// 	});
	// } else {
	// 	Toast.info(response.resultMsg);
	// }

}

function* watchNewsPremQuery() {
	yield takeLatest('news/premQuery', newsPremQuery);
}


export default function*() {
	yield fork(watchNewsPremQuery)
}