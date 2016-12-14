/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	handleActions
} from 'redux-actions';
import {
	combineReducer
} from 'redux';

const userPwd = handleActions({
	['userPwd/set'](state, action) {
		return {
			...state,
			info: action.info,
		};
	}
}, {
	info: {}
});

export default userPwd;