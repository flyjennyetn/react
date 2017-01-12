import { combineReducers } from 'redux'

import courses from './courses'
import quizzes from './quizzes'
import subject from './subject'
import user from './user'
import userPwd from './userPwd'

const rootReducer = combineReducers({
	courses,
	quizzes,
	subject,
	user,
	userPwd
});

export default rootReducer;