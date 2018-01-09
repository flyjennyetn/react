/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {takeLatest} from 'redux-saga';
import {call,fork,put} from 'redux-saga/effects';
import {hashHistory} from 'react-router';
// import * as utils from 'utils/'
import {queryPolicy,findMcomList,uploadPic} from 'utils/service'
import * as cache from 'utils/cache'
import {postApi} from 'utils/axios'
import * as fetch from 'utils/fetch'
import * as upload from 'utils/upload'

function* newsPremQuery({}) {

	yield put({type:'gstates/set/loading',isLoading: true});
    const response = yield call(postApi,{
        params: queryPolicy,
        info:{
			"rows":"10",
		    "page":"1",
		    "holderCercode":"320926196512230059",//投保人证件号
		    "holderName":"吴亚林"//投保人姓名
        }
    });
	yield put({type:'gstates/set/loading',isLoading: false});
	console.log(response)
	// if(response.resultCode == '10'){
	// 	//后台返回的数据必须在这个地方处理不能在页面处理
	// 	yield put({
	// 		type:'news/set/premQuery',
	// 		dayPrem:response.list[0].dayPrem == 0?null:response.list[0].dayPrem,
	// 		monPrem:response.list[0].monPrem
	// 	});
	// }else{
	// 	Toast.info(response.resultMsg);
	// }

}


function* registerFindMcomList() {
	yield put({type:'gstates/set/loading',isLoading: true});
    const response = yield call(fetch.postApi,{
        params: findMcomList,
        info:{
			"agentId": "LAJ",
    		"messageId": "1",
        }
    });
	yield put({type:'gstates/set/loading',isLoading: false});

	console.log(response)
}


function* interfaceUploadPic({pics,lens}) {
	yield put({type:'gstates/set/loading',isLoading: true});
    const response = yield call(upload.postApi,{
        params: {
        	"salesChannel":"ybt-03",
        	...uploadPic
        },
        info:{
			pics,
    		lens
        }
    });
	yield put({type:'gstates/set/loading',isLoading: false});

	console.log(response)
}

function* watchNewsPremQuery() {
	yield takeLatest('news/premQuery', newsPremQuery);
}

function* watchRegisterFindMcomList() {
	yield takeLatest('register/findMcomList', registerFindMcomList);
}

function* watchInterfaceUploadPic() {
	yield takeLatest('interface/uploadPic', interfaceUploadPic);
}

export default function*() {
	yield fork(watchNewsPremQuery)
	yield fork(watchRegisterFindMcomList)
	yield fork(watchInterfaceUploadPic)
}