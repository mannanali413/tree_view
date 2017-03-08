import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, IndexRedirect, Route, browserHistory} from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxPromise from 'redux-promise'
import thunk from 'redux-thunk'
import App from './scenes/App'
import reducers from './data/reducers'

require('../sass/app.scss')

let middleware = [reduxPromise, thunk];
const store = createStore(
    reducers,
    applyMiddleware(...middleware)
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}></Route>
        </Router>
    </Provider>, document.getElementById('root'));
