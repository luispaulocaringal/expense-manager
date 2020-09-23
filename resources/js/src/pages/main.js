import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { NavBar, SideMenu } from '../components';
import { Home, Roles, Users, Expenses, ExpenseCategories } from './index';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: ''
        }
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    checkAccess(page) {
        if (this.getCookie("accessibility")!="administrator") {
            return <Redirect to="/" />
        }
        return page
    }

    render() {
        return (
            <div className="row no-gutters bg-white">
                <div>
                    <SideMenu />
                </div>
                <div className="col">
                    <div className="main-container">
                        <NavBar history={this.props.history} />
                        <div className="main py-4">
                            <Route exact path='/expenses' render={() => (<Expenses />)} />
                            <Route exact path='/expenseCategories' render={() => this.checkAccess(<ExpenseCategories />)} />
                            <Route exact path='/users' render={() => this.checkAccess(<Users />)} />
                            <Route exact path='/roles' render={() => this.checkAccess(<Roles />)} />
                            <Route exact path='/' render={() => <Home />} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}