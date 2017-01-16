/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {
  PropTypes
} from 'react';
import {
  Provider
} from 'react-redux'
import {
  Router,
  Route,
  Link,
  IndexRoute,
  Redirect,
  IndexLink,
  browserHistory
} from 'react-router';

import App from './App';
import Login from './Login/';
import Courses from './Courses/';
import Quizzes from './Courses/Quizzes';
import Subject from './Subject/';
import SubjectDetails from './subject/Details';
import User from './User/';
import UserInfo from './User/Info';
import UserPwd from './User/Pwd';

import '../../styles/normalize.scss'
import '../../styles/app.scss'
import '../../styles/antdStyleReset.scss'
import '../../styles/font.scss'
import '../../styles/animations.scss'

function Routes({
  store,
  history
}) {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="courses">
                <IndexRoute component={Courses} />
                <Route path="/courses/quizzes" component={Quizzes} />
            </Route>
            <Route path="subject">
                <IndexRoute component={Subject} />
                <Route path=":id" component={SubjectDetails} />
            </Route>
            <Route path="user">
                <IndexRoute component={User} />
                <Route path="/user/info" component={UserInfo} />
                <Route path="/user/pwd" component={UserPwd} />
            </Route>
        </Route>
      </Router>
    </Provider>
  );
}

export default Routes;