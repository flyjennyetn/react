/**
 * Created by flyjennyetn on 2016-10-24.
 */
 
import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import {
    AppContainer
} from 'react-hot-loader'
import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux'
import {
    Provider
} from 'react-redux'
import {
    browserHistory
} from 'react-router'
import {
    syncHistoryWithStore,
    routerReducer as routing
} from 'react-router-redux';
import createSagaMiddleware, {
    END
} from 'redux-saga'
import createLogger from 'redux-logger'

import ReducersManager from './reducers/'
import SagaManager from './sagas/'
import Routes from './pages/routes'

const sagaMiddleware = createSagaMiddleware()

const initialState = window.__INITIAL_STATE__;
const enhancer = compose(
    applyMiddleware(sagaMiddleware, module.hot ? createLogger() : {})
);

const store = createStore(
    combineReducers({...ReducersManager,
        routing
    }),
    initialState,
    enhancer
)

//热替换
if (module.hot) {
    module.hot.accept('./reducers', () => {
        const combinedReducers = combineReducers({
            reducers,
            routing
        });
        store.replaceReducer(combinedReducers);
    });
    module.hot.accept('./sagas/', () => {
        SagaManager.cancelSagas(store);
        require('./sagas/').default.startSagas(sagaMiddleware);
    });
}

const history = syncHistoryWithStore(browserHistory, store);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);
store.runSaga(SagaManager)

const rootEl = document.getElementById('app');

ReactDOM.render(
    <AppContainer>
        <Routes store={store} history={history}/>
    </AppContainer>,
    rootEl
)

if (module.hot) {
    const orgError = console.error;
    console.error = (message) => {
        if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
            orgError.apply(console, [message]);
        }
    };
    module.hot.accept('./pages/routes', () => {
        const NextApp = require('./pages/routes').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp store={store} history={history}/>
            </AppContainer>,
            rootEl
        )

    });
}