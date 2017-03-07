import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, IndexRedirect, Route, browserHistory} from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxPromise from 'redux-promise'

import App from './scenes/App'
import reducers from './data/reducers'

require('../sass/app.scss')

const store = createStore(
    reducers,
    applyMiddleware(reduxPromise)
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}></Route>
        </Router>
    </Provider>, document.getElementById('root'));
