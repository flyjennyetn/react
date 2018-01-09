/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {handleActions} from 'redux-actions';

const news = handleActions({
	['news/set/premQuery'](state, action){
		return {
			...state,
			dayPrem: action.dayPrem,
			monPrem: action.monPrem
		};
	}
}, {
	dayPrem: null,
	monPrem: null
});

export default news;