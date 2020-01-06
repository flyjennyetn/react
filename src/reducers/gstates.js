import { GSTATES_LOADING, GSTATES_HEADER } from '../actions/index';

const gstatesRequest = (isShow) => ({
	type: GSTATES_LOADING,
	isShow
});

const headerRequest = (visible, title, Url, rightTitle, noBack = true) => ({
	type: GSTATES_HEADER,
	visible,
	title,
	Url,
	rightTitle,
	noBack
});

export {
	gstatesRequest,
	headerRequest
};
