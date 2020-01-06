import { GSTATES_LOADING, GSTATES_HEADER } from '../actions/index';

const loadingReducers = (state, action) => {
	switch (action.type) {
	case GSTATES_LOADING:
		return { ...state, isShow: action.isShow };
	default:
		return state;
	}
};

const headerReducers = (state, action) => {
	switch (action.type) {
	case GSTATES_HEADER:
		return { ...state, ...action };
	default:
		return state;
	}
};

export {
	loadingReducers,
	headerReducers
};
