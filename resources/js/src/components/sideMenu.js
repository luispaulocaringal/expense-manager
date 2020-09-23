import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { EXPENSE_MANAGER_API_URL } from '../config';

class SideMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidemenu-container">
                <header className="header-bg-color">
                    <nav className="navbar navbar-expand navbar-dark">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto">
                                <span className="text-white font-weight-bold nav-link"> EXPENSE MANAGER </span>
                            </ul>
                        </div>
                    </nav>
                </header>
                <div className="row px-4 py-4">
                    <div className="col">
                        {this.props.info ?
                            <div className='row justify-content-center'>
                                <div>
                                    <img src={`${EXPENSE_MANAGER_API_URL}/storage/uploads/avatars/${this.props.info.image}`} className="user-img rounded-circle" />
                                </div>
                                <div>
                                    <span className="pl-2 font-weight-bold">{this.props.info.first_name + " " + this.props.info.last_name + " "}</span><br/>
                                    <span className="pl-2 font-weight-bold">({this.props.info.role_id})</span><br/>
                                </div>                
                            </div> : ""
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Link
                            to={'/'}
                            className="nav-link side-menu-link text-dark border-top border-bottom font-weight-bold">
                            <i className="fa fa-home w-ico" />Dashboard
                        </Link>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer font-weight-bold">
                            <i className="fa fa-users w-ico" />User Management
                        </span>
                        <Link 
                            to={'/roles'}
                            className="nav-link side-menu-link text-dark border-bottom pointer">
                            <i className="ml-4 fa fa-id-card w-ico" />Roles
                        </Link>
                        <Link 
                            to={'/users'}
                            className="nav-link side-menu-link text-dark border-bottom pointer">
                            <i className="ml-4 fa fa-user w-ico" />Users
                        </Link>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer font-weight-bold">
                            <i className="fa fa-credit-card-alt w-ico" />Expense Management
                        </span>
                        <Link 
                            to={'/expenseCategories'}
                            className="nav-link side-menu-link text-dark border-bottom pointer">
                            <i className="ml-4 fa fa-credit-card w-ico" />Expense Categories
                        </Link>
                        <Link 
                            to={'/expenses'}
                            className="nav-link side-menu-link text-dark border-bottom pointer">
                            <i className="ml-4 fa fa-money w-ico" />Expenses
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { info: state.info };
}

export default connect(mapStateToProps)(SideMenu);