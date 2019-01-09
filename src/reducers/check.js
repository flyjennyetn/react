/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {handleActions} from 'redux-actions';

const check = handleActions({
	['check/set/ImageCode'](state, action){
		return {
			...state,
			dayPrem: action.dayPrema
		};
	}
}, {
	dayPrem: null
});

export default check;