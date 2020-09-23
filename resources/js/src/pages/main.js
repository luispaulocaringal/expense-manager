import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavBar, SideMenu } from '../components';
import { Home } from './index';

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
                            <Route exact path='/account' render={() => <Account />} />
                            <Route exact path='/' render={() => <Home />} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}