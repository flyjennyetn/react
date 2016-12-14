/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	handleActions
} from 'redux-actions';
import {
	combineReducer
} from 'redux';

const user = handleActions({
	['user/set/info'](state, action) {
		return {
			...state,
			userInfo: action.userInfo,
		};
	}
}, {
	userInfo: {}
});

export default user;