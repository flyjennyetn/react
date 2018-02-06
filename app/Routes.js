/**
 * Created by flyjennyetn on 2016-10-26.
 */
import React, {PureComponent} from "react";
import {BrowserRouter,Switch,Router,Redirect,Route} from 'react-router-dom'
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";

import asyncComponent from './pages/async-component'
const App = asyncComponent(() => import('./pages/App'))
const Login = asyncComponent(() => import('./pages/Login/'))
const News = asyncComponent(() => import('./pages/news/routes'))


export default class extends PureComponent {
    render() {
        const {store,history} = this.props
        return (
	        <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <App>
                            <Route exact path='/' component={Login} />
                            <News />
                        </App>
                    </Switch>
                </ConnectedRouter>
	        </Provider>
        )
    }
}

 