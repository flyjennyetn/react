import fetch from 'fetch-jsonp';
import qs from 'qs';
import {
	IPLOCATION
} from '../tools/config';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
	if (res.status === 401) {
		location.href = '/401';
	}
	return res;
}

function check404(res) {
	if (res.status === 404) {
		return Promise.reject(errorMessages(res));
	}
	return res;
}

function jsonParse(res) {
	return res.json().then(jsonResult => ({...res,
		jsonResult
	}));
}

function errorMessageParse(res) {
	const {
		result,
		msg,
		t
	} = res.jsonResult;
	if (!result) {
		alert(msg);
		return false;
	}
	return t;
}

function xFetch(options) {
	const opts = {...options};
	opts.headers = {
		...opts.headers
		// ,authorization: cookie.get('authorization') || '',
	};
	return fetch(`${IPLOCATION + opts.requestUrl}?${qs.stringify(opts)}`, opts)
		.then(check401)
		.then(check404)
		.then(jsonParse)
		.then(errorMessageParse);
}

export default xFetch;