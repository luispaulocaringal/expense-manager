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
                                <span className="text-white font-weight-bold nav-link"> KaByahe </span>
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
                            className="nav-link side-menu-link text-dark border-top border-bottom">
                            <i className="fa fa-home w-ico" />Dashboard
                        </Link>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("https://console.cloud.google.com/home/dashboard?project=capstone-1536465189447")}>
                            <i className="fab fa-google w-ico" />Cloud Console
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("https://gitlab.com/johngideonsenga/capstone")}>
                            <i className="fab fa-gitlab w-ico" />Gitlab
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("#")}>
                            <i className="fab fa-google-play w-ico" />Google Play
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("https://manager.linode.com/linodes/dashboard/linode12337995")}>
                            <i className="fab fa-linode w-ico" />Linode
                        </span>
                        <span className="nav-link side-menu-link text-dark border-bottom pointer" onClick={() => window.open("http://www.kabyahe.com/phpmyadmin/")}>
                            <i className="fab fa-php w-ico" />phpMyAdmin
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