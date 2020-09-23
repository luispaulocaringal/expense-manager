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
                            <div>
                                <img src={`${EXPENSE_MANAGER_API_URL}/storage/uploads/avatars/${this.props.info.image}`} className="user-img rounded-circle" />
                                <span className="pl-2 font-weight-bold">{this.props.info.first_name + " " + this.props.info.last_name + " "}</span>
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
                        <span className="nav-link side-menu-link text-dark border-bottom pointer font-weight-bold" onClick={() => window.open("https://console.cloud.google.com/home/dashboard?project=capstone-1536465189447")}>
                            <i className="fa fa-users w-ico" />User Management
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("https://gitlab.com/johngideonsenga/capstone")}>
                            <i className="ml-4 fa fa-id-card w-ico" />Roles
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("#")}>
                            <i className="ml-4 fa fa-user w-ico" />Users
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer font-weight-bold" onClick={() => window.open("https://manager.linode.com/linodes/dashboard/linode12337995")}>
                            <i className="fa fa-credit-card-alt w-ico" />Expense Management
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("http://www.kabyahe.com/phpmyadmin/")}>
                            <i className="ml-4 fa fa-credit-card w-ico" />Expense Categories
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("http://www.kabyahe.com/phpmyadmin/")}>
                            <i className="ml-4 fa fa-money w-ico" />Expenses
                        </span>
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