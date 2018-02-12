/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import {routerReducer as routing} from "react-router-redux";
import * as rootReducer from "../reducers";

export default (initialState) => {
	const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
	    combineReducers({
	      ...rootReducer.default,
	      routing
	    }),
	    initialState,
	    applyMiddleware(sagaMiddleware)
	)
	store.runSaga = sagaMiddleware.run;
	return store;
}