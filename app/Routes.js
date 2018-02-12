/**
 * Created by flyjennyetn on 2016-10-26.
 */
import React, {PureComponent} from "react";
import {Router,IndexRoute} from 'react-router';
import {Provider} from "react-redux";
import routes from "./pages/Root";

export default class extends PureComponent {
    render() {
        const {store,history} = this.props
        return (
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>
        )
    }
}

