import React, { Component } from 'react';
import Axios from 'axios';
import { EXPENSE_MANAGER_API_URL } from '../config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
            },
            msg: "",
            style: ""
        };
    }

    handleChange(e, data) {
        const user = this.state.user;
        user[data] = e;
        this.setState({ user });
    }

    async login(e) {
        e.preventDefault();

        const r = await Axios.post(`${EXPENSE_MANAGER_API_URL}/api/user/login`, {
            'email': this.state.user.email,
            'password': this.state.user.password
        }).then(function (r) {
            return r.data;
        }).catch(function () {
            return {
                success: false,
                data: "The connection to the server failed."
            }
        });

        if (r.success) {
            document.cookie = "adminKey=" + r.data.auth_token;
            this.props.history.push("/");
        } else {
            this.setState({ msg: r.data, style: "alert-danger" })
            this.handleChange("", "email")
            this.handleChange("", "password")
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="offset-4 col-4">
                        <form onSubmit={(e) => this.login(e)}>
                            <div className="main-container justify-content-center">
                                <div className="mb-2">
                                    <h1 className="font-weight-bold text-center">EXPENSE MANAGER</h1>
                                </div>
                                <div className="mt-2">
                                    <input type="text" placeholder="Email" className="form-control d-block login-input" value={this.state.user.email} onChange={(e) => this.handleChange(e.target.value, "email")} />
                                </div>
                                <div className="mt-2">
                                    <input type="password" placeholder="Password" className="form-control d-block login-input" value={this.state.user.password} onChange={(e) => this.handleChange(e.target.value, "password")} />
                                </div><br />
                                <div className="mt-2">
                                        <input type="submit" className="btn form-control login-btn text-white" value="Login" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}