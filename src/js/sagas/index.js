import {
	fork
} from 'redux-saga/effects';

const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js' && item !== './SagaManager.js');

export default function* root() {
	for (let i = 0; i < keys.length; i++) {
		let saga = context(keys[i]);
		if (typeof saga == 'function') {
			yield fork(saga);
		} else {
			yield fork(saga.default);
		}
	}
}