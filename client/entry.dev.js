/**
 * Created by flyjennyetn on 2016-10-26.
 */
import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import createHistory from 'history/createBrowserHistory'
import {AppContainer} from "react-hot-loader";
import Routes from "../app/Routes";
import configureStore from "../app/store/configureStore";
import SagaManager from '../app/sagas/'
import "react-fastclick";

const history = createHistory()
const store=configureStore(window.__INITIAL_STATE__)
store.runSaga(SagaManager)

render(<Routes store={store} history={history}/>,document.getElementById('app'))
if(module.hot){
    module.hot.accept('../app/Routes',() =>{
        render(
        	<AppContainer>
        		<Routes store={store} history={history}/>
        	</AppContainer>,
        	document.getElementById('app')
        )
    })
}
