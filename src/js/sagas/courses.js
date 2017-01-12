/**
 * Created by flyjennyetn on 2016-10-26.
 */
import xFetch from '../tools/xFetch';
import qs from 'qs';
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


function* coursesQuery({
	token
}) {
	const coursesUp = yield call(xFetch, {
		requestUrl: 'interface/getLessonInfoByStuNoForCenter.json',
		token,
		stuTerm: 1
	});
	const coursesDown = yield call(xFetch, {
		requestUrl: 'interface/getLessonInfoByStuNoForCenter.json',
		token,
		stuTerm: 2
	});
	yield put({
		type: 'courses/qurery/success',
		coursesUp,
		coursesDown
	});
}

function* queryVideoId({
	token,
	lessonId
}) {
	const videoId = yield call(xFetch, {
		requestUrl: 'interface/getLessonVideoId',
		token,
		lessonId
	});
	yield put({
		type: 'courses/set/videoId',
		videoId,
	});
}

function* isLearning({
	token,
	grade,
	lessonId
}) {
	const study = yield call(xFetch, {
		requestUrl: 'interface/queryIfExam.json',
		token,
		lessonId
	});
	if (study.isPassStudy == 1) {
		browserHistory.push({
			pathname: '/courses/quizzes',
			state: {
				lessonId
			}
		});
	} else {
		alert("请先学习课程！")
	}
}

function* watchCourses() {
	yield takeLatest('courses/query', coursesQuery);
}

function* watchVideoId() {
	yield takeLatest('courses/get/videoId', queryVideoId);
}

function* watchLearning() {
	yield takeLatest('courses/learning', isLearning);
}

export default function*() {
	yield fork(watchCourses);
	yield fork(watchVideoId);
	yield fork(watchLearning);
}