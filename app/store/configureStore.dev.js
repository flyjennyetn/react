/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerReducer} from "react-router-redux";
import createSagaMiddleware from 'redux-saga'
import * as rootReducer from "../reducers";

export default (initialState,history) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    combineReducers({
      ...rootReducer.default,
      router:routerReducer
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  )
  store.runSaga = sagaMiddleware.run;
  return store;
}