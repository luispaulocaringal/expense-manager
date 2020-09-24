import React, { Component } from 'react';
import {PieChart} from 'react-minimal-pie-chart';
import ReactTable from 'react-table';
import Axios from 'axios';
import { setExpenses } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EXPENSE_MANAGER_API_URL } from '../config';
import 'react-table/react-table.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                current_password: '',
                new_password: '',
            },
            error: false,
            msg:""
        }
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    handleChange(e, data) {
        const user = this.state.user;
        user[data] = e;
        this.setState({ user });
    }

    async login(e) {
        e.preventDefault();

        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const r = await Axios.post(`${EXPENSE_MANAGER_API_URL}/api/user/changePassword`, {
            'current_password': this.state.user.current_password,
            'new_password': this.state.user.new_password
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return {
                success: false,
                data: "The connection to the server failed."
            }
        });
        console.log(r)
        if (r.success) {
            this.setState({ msg: "Password changed succesfully"})
        } else {
            this.setState({ msg: r.data, style: "alert-danger" })
            this.handleChange("", "current_password")
            this.handleChange("", "new_password")
        }
    }

    render() {
        return (
            <div className="container-fluid bg-white">
                <div className='container'>
                    <form onSubmit={(e) => this.login(e)}>
                        <div className="form-group row">
                            <div className="col-md-12"><h4 className="font-weight-bold">Account Settings</h4></div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-12"><h5 className="font-weight-bold">Change Password</h5></div>
                        </div>
                        <div className="form-group row">
                            <div className='col-md-6'>
                                <div className="mt-2">
                                    Current Password <input type="password" placeholder="Email" className="form-control d-block" value={this.state.user.current_password} onChange={(e) => this.handleChange(e.target.value, "current_password")} />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="mt-2">
                                    New Password <input type="password" placeholder="Password" className="form-control d-block" value={this.state.user.new_password} onChange={(e) => this.handleChange(e.target.value, "new_password")} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className='col-md-12'>
                                <div className="mt-2">
                                    <input type="submit" className="btn btn-primary text-white" value="Submit" />
                                </div>
                                {this.state.msg}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { expenses: state.expenses };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setExpenses }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);