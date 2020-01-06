/**
 * Created by flyjennyetn on 2018-11-12
 */
import React from 'react';
import { render } from 'react-dom';
import {createStore} from 'redux';
import {StoreContext} from 'redux-react-hook';
import App from './pages/routes';

const store = createStore(reducer);

function Root() {
	return(
		<StoreContext.Provider value={store}>
		    <App />
		</StoreContext.Provider>
	)
}

render(<Root />, document.getElementById('root'));

if (module.hot) {
	const reactHot = require('react-hot-loader');
	const AppContainers = reactHot.AppContainer;
	module.hot.accept('./pages/routes', () => (
		render(<AppContainers><Root /></AppContainers>, document.getElementById('root'))
	));
}
