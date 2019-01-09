import React from 'react';
import Loadable from 'react-loadable';
import {
  HashRouter as Router,
  // Router,
  Route,
  Switch
} from 'react-router-dom';
// import history from 'utils/history';
import Loading from 'components/Loading/';


import App from './App';
import Login from './Login/';
import Errors from './Error/';

// import News from './News/routes';
// let routesArr = [...News];

const routes = (
  <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route
                  path="/neujahrMatch"
                  component={Loadable({
                    loader: () => import('./NeujahrMatch/'),
                    loading: Loading,
                  })}
                />
                <Route
                  path = "/januaryGuide/:point"
                  component={Loadable({
                    loader: () => import('./JanuaryGuide/'),
                    loading: Loading,
                  })}
                />
                <Route
                  path = "/golfActJan"
                  component={Loadable({
                    loader: () => import('./GolfActJan/'),
                    loading: Loading,
                  })}
                />
                <Route
                  path = "/ausOpenActJan"
                  component={Loadable({
                    loader: () => import('./AusOpenActJan/'),
                    loading: Loading,
                  })}
                />
                {/*
                <Route
                  path="/spectatorsGuide"
                  component={Loadable({
                    loader: () => import('./SpectatorsGuide/'),
                    loading: Loading,
                  })}
                /> 
                {routesArr.map((route, i) =>
                    <Route
                        key={i}
                        path={route.path}
                        component={Loadable({
                        loader: () => route.component,
                        loading: Loading,
                      })}
                    />
                )}
                */}
                <Route component={Errors} />
            </Switch>
        </App>
    </Router>
);

export default routes;