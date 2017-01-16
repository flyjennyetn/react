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
import {
	browserHistory
} from 'react-router';

function* subjectQuery() {
	const items = yield call(xFetch, {
		requestUrl: 'interface/getThematicPageList.json',
		startNum: '0',
		endNum: '12'
	})
	items.map((el, k) => {
		items[k].thematicFname = el.thematicFname.split('|');
	})
	yield put({
		type: 'subject/qurery/success',
		items
	});
}

function* learningThematic({
	thematicNum,
	stuCode
}) {
	yield call(xFetch, {
		requestUrl: 'interface/learningThematic.json',
		thematicNum,
		stuCode
	})
	browserHistory.push({
		pathname: '/subject/12'
		// pathname: '/subject/' + thematicNum
	});
}

function* watchSubject() {
	yield takeLatest('subject/query', subjectQuery);
}

function* watchLearning() {
	yield takeLatest('subject/learning/thematic', learningThematic);
}


export default function*() {
	yield fork(watchSubject);
	yield fork(watchLearning);
}