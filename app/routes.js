/**
 * Created by flyjennyetn on 2016-10-26.
 */
import React, {PureComponent} from "react";
import {Router,Route,IndexRoute} from 'react-router';
import {Provider} from "react-redux";

//所有页面引入
import App from './pages/App';
import Login from './pages/Login'
import NewsList from './pages/NewsList'
import NewsDetails from './pages/NewsList/NewsDetails'
// import NotFound from './pages/NotFound'


export default class extends PureComponent {
    render() {
        const {store,history} = this.props
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Login}/>
                        <Route path="newsList" component={NewsList} />
                        <Route path="newsList/newsDetails/:id" component={NewsDetails} />
                        <Route path="*" component={Login} />
                    </Route>
                </Router>
            </Provider>
        )
    }
}

