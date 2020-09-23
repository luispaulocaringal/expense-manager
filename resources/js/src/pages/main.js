import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
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
                            <Route exact path='/expenses' render={() => <Expenses />} />
                            <Route exact path='/expenseCategories' render={() => <ExpenseCategories />} />
                            <Route exact path='/users' render={() => <Users />} />
                            <Route exact path='/roles' render={() => <Roles />} />
                            <Route exact path='/' render={() => <Home />} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}