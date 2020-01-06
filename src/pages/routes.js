import React from 'react';
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loading from 'components/Loading/';

import App from './App';
import Login from './Login/index';
import Errors from './Error/index';
import News from './news/routes';

const routesArr = [...News];

function Root() {
	return (
		<HashRouter>
			<App>
				<Switch>
					<Route exact path="/" component={Login} />
					{/*
					<Route
					path="/spectatorsGuide"
					component={Loadable({
					loader: () => import('./SpectatorsGuide/'),
					loading: Loading,
					})}
					/>
					*/}
					{routesArr.map((route, i) =>
						<Route key={`routesArr${i}`} path={route.path} component={Loadable({ loader: () => route.component, loading: Loading })} />
					)}
					<Route component={Errors} />
				</Switch>
			</App>
		</HashRouter>
	);
}

export default Root;
