/**
 * Created by flyjennyetn on 2018-11-12
 */
import React from 'react';
import {
  render
} from 'react-dom';
import {
  createBrowserHistory
} from 'history';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {
  connectRouter,
  routerMiddleware
} from 'connected-react-router';

import Root from "./pages/root";
import rootReducer from './reducers/';
import SagaManager from './sagas/'

// if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`).then((registration) => {
//       console.log('SW registered: ', registration);
//     }).catch((registrationError) => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

const sagaMiddleware = createSagaMiddleware()
const history = createBrowserHistory();
const initialState = {};
const middleware = [];
middleware.push(sagaMiddleware);
middleware.push(routerMiddleware(history));

if (process.env.NODE_ENV !== 'production') {
  // middleware.push(require('redux-logger').createLogger());
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    ...rootReducer
  }),
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

sagaMiddleware.run(SagaManager)

render(<Root store={store} history={history}/>, document.getElementById('root'))

if (module.hot) {
  let reactHot = require('react-hot-loader');
  let AppContainer = reactHot.AppContainer
  module.hot.accept('./pages/root', () => {
    render(<AppContainer><Root store={store} history={history}/></AppContainer>, document.getElementById('root'))
  })
}