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

function quizzesGetScoreLog({
	isPassExam,
	results
}) {
	var exam = [];
	if (isPassExam == '1') {
		results.map((el, i) => {
			exam[el.subId] = el.subAns;
		});
	} else {
		results.examList.map((el, i) => {
			exam[el.examId] = '';
		});
		results.examSelect.map((el, i) => {
			exam[el.examId] = '';
		});
	}
	return exam;
}


function* quizzesQueryQuestions({
	token,
	lessonId
}) {

	const study = yield call(xFetch, {
		requestUrl: 'interface/queryIfExam.json',
		token,
		lessonId
	});

	const data = yield call(xFetch, {
		requestUrl: 'interface/getListExam.json',
		lessonId
	});

	var exam = [];
	if (study.isPassExam == 1) {
		let result = yield call(xFetch, {
			requestUrl: 'interface/getScoreLog.json',
			stuCode: token,
			lessonId
		});
		result = eval('(' + result.results + ')').results;
		exam = yield call(quizzesGetScoreLog, {
			isPassExam: study.isPassExam,
			results: result
		});
	} else {
		exam = yield call(quizzesGetScoreLog, {
			isPassExam: study.isPassExam,
			results: data
		});
	}

	yield put({
		type: 'quizzes/qurery/questions/success',
		lessonScore: study.isPassExam != 0 ? study.lessonScore : 'no',
		examPaperName: data.examPaperName,
		examList: data.examList,
		examSelect: data.examSelect,
		exam
	});
}

function* quizzesQuizzesScore({
	results,
	lessonId,
	stuCode
}) {
	const lessonScore = yield call(xFetch, {
		requestUrl: 'interface/getScore.json',
		results,
		lessonId,
		stuCode
	});
	yield put({
		type: 'quizzes/set/lessonScore',
		lessonScore
	})
}

function* watchQuizzesQuestions() {
	yield takeLatest('quizzes/query/questions', quizzesQueryQuestions);
}

function* watchQuizzesScore() {
	yield takeLatest('quizzes/query/Score', quizzesQuizzesScore);
}


export default function*() {
	yield fork(watchQuizzesQuestions);
	yield fork(watchQuizzesScore);

}