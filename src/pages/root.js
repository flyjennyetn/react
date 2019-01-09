import React, {
	PureComponent
} from "react";
import {
	Provider
} from "react-redux";
import {
	ConnectedRouter
} from 'connected-react-router';
import routes from "./routes";

export default class extends PureComponent {
	render() {
		const {
			store,
			history
		} = this.props
		return (
			<Provider store={store}>
                <ConnectedRouter history={history}>
		            {routes}
		        </ConnectedRouter>
            </Provider>
		)
	}
}