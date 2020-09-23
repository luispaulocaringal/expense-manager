import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Main } from './pages';

const createStoreWithMiddleware = applyMiddleware()(createStore);
export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    requireAuth(page) {
        if (!this.getCookie("adminKey")) {
            return <Redirect to="/login" />
        }
        return page
    }

    checkAuth(page) {
        if (this.getCookie("adminKey")) {
            return <Redirect to="/" />
        }
        return page
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' render={({ history }) => this.checkAuth(<Login history={history} />)} />
                    <Route path='/' render={({ history }) => this.requireAuth(<Main history={history} />)} />
                </Switch>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <App />
        </Provider>
        , document.getElementById('app'));
}
