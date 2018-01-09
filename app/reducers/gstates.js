/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {handleActions} from 'redux-actions';
//指令名 必去写出含义


const gstates = handleActions({
	['gstates/set/loading'](state, action) {
		return {
			...state,
			isLoading: action.isLoading
		};
	},		
	['gstates/set/alert'](state, action) {
		return {
			...state,
			isAlert: action.isAlert,
			isAlertMsg:action.isAlertMsg,
			callback:action.callback ? action.callback : ''
		};
	}
}, {
	isLoading:false,
	isAlert:false,
	isAlertMsg:'',
	callback:null
});

export default gstates;