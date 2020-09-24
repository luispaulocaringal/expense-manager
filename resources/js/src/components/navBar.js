import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setInfo, logout } from '../actions';
import { EXPENSE_MANAGER_API_URL, JWT_AUTHORIZATION } from '../config';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    logout() {
        this.props.logout()
        this.deleteCookie("authToken");
        this.props.history.push("/login");
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    async componentDidMount() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const response = await Axios.get(`${EXPENSE_MANAGER_API_URL}/api/user/profile`,JWT_AUTHORIZATION)
            .then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.log(error);
            });

        this.props.setInfo({ first_name: response.first_name, last_name: response.last_name, image: response.image, role_id: response.role_id, user_id: response.id })
    }

    render() {
        return (
            <header className="navbar-bg">
                <div className="container">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto pr-5">
                                <li className="nav-item dropdown">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle text-white font-weight-bold"
                                        id="navbarDropdown"
                                        data-toggle="dropdown">
                                        Hello, {this.props.info ? this.props.info.first_name + " " + this.props.info.last_name + " " : ""}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to={'/account'} className="dropdown-item">Account Settings</Link>
                                        <span className="dropdown-item pointer" onClick={() => this.logout()}>Logout</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return { info: state.info };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setInfo, logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);