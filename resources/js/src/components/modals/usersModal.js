import React, { Component } from 'react';
import Axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUsers, setRoles } from '../../actions';
import { EXPENSE_MANAGER_API_URL } from '../../config';
//import NotificationSystem from 'react-notification-system';

//let notificationSystem = null;
class UsersModal extends Component {
    constructor(props) {
        super(props);
    }

    /*addPreferenceNotification(level, message) {
        notificationSystem.addNotification({
            message,
            level
        });
    }*/

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    async setRoles() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const roles = await Axios.get(`${EXPENSE_MANAGER_API_URL}/api/request/getRoles`,JWT_AUTHORIZATION)
            .then(function (response) {
                return response.data.data;
            }).catch(function (error) {
                console.log(error);
            });

        this.props.setRoles(roles)
    }

    componentDidMount() {
        this.setRoles();
    }

    async setUsers() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const users = await Axios.get(`${EXPENSE_MANAGER_API_URL}/api/user/getUsers`,JWT_AUTHORIZATION)
            .then(function (response) {
                return response.data.data;
            }).catch(function (error) {
                console.log(error);
            });

        this.props.setUsers(users)
    }

    isEmpty(str) {
        if (/^\s+$/.test(str) || str.length === 0)
            return true;
        return false;
    }

    async add() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const r = await Axios.post(`${EXPENSE_MANAGER_API_URL}/api/user/addUsers`, {
            'first_name': this.props.data.first_name,
            'last_name': this.props.data.last_name,
            'email': this.props.data.email,
            'role_id':this.props.data.role_id
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setUsers();
            //this.addPreferenceNotification("success", "A new preference has been successfully added.");
            $('#usersModal').modal('hide')
        } else {
            if (this.isEmpty(this.props.data.first_name))
                this.props.handleError("first_name")
            if (this.isEmpty(this.props.data.last_name))
                this.props.handleError("last_name")
            if (this.isEmpty(this.props.data.email))
                this.props.handleError("email")
            if (this.isEmpty(this.props.data.role_id))
                this.props.handleError("role_id")
            //this.addPreferenceNotification("error", "Please fill out all the required fields.");
        }
    }

    async update() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const url = `${EXPENSE_MANAGER_API_URL}/api/user/updateUsers?usersid=${this.props.data.id}`;
        const r = await Axios.put(url, {
            'first_name': this.props.data.first_name,
            'last_name': this.props.data.last_name,
            'email': this.props.data.email,
            'role_id':this.props.data.role_id
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setUsers();
            //this.addPreferenceNotification("success", "A preference has been successfully updated.");
            $('#usersModal').modal('hide')
        } else {
            if (this.isEmpty(this.props.data.expenses_category_id))
                this.props.handleError("expenses_category_id")
            if (this.isEmpty(this.props.data.amount))
                this.props.handleError("amount")
            if (this.isEmpty(this.props.data.entry_date))
                this.props.handleError("entry_date")
            //this.addPreferenceNotification("error", "Please fill out all the required fields.");
        }
    }

    async delete() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const url = `${EXPENSE_MANAGER_API_URL}/api/user/deleteUsers?usersid=${this.props.data.id}`;
        const r = await Axios.delete(url,JWT_AUTHORIZATION)
            .then(function (r) {
                return r.data;
            }).catch(function () {
                return { success: false }
            });
        if (r.success) {
            this.setUsers();
            //this.addPreferenceNotification("success", "A preference has been successfully deleted.");
            $('#usersModal').modal('hide')
        } else {
            //this.addPreferenceNotification("error", "There has been an error processing your request.");
        }
    }

    /*componentDidMount() {
        notificationSystem = this.refs.notificationSystem;
    }*/

    render() {
        const mode = this.props.mode;
        let title = null;
        let label = null;
        let submit = null;
        let msg = null;
        let isDisabled = null;
        let btnStyle = null;
        if (mode == "add") {
            title = "Add New User";
            label = "Add";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.add();
        }
        else if (mode == "edit") {
            title = "Edit User";
            label = "Update";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.update();
        }
        else if (mode == "delete") {
            title = "Delete User";
            label = "Delete";
            msg = "Are you sure you want to delete this user?"
            isDisabled = true;
            btnStyle = "btn btn-danger"
            submit = () => this.delete();
        }

        let rolesChoices = []
        if(this.props.roles != null){
            rolesChoices.push(<option value='' key={0}>Select one...</option>)
            for(var i = 0; i < this.props.roles.length; i++){
                rolesChoices.push(<option key={this.props.roles[i].id} value={this.props.roles[i].role_id}>{this.props.roles[i].role_id}</option>)
            }
        }

        return (
            <div>
                <div className="modal fade" id="usersModal" tabIndex="-1" role="dialog" aria-labelledby="usersModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="usersModalLabel">{title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body px-4">
                                {msg ?
                                    <div>
                                        <p>{msg}</p>
                                    </div> : null
                                }
                                {this.props.error.role_id || this.props.error.amount ?
                                    <div>
                                        <p>Please fill up required fields</p>
                                    </div> : null
                                }
                                <div>
                                    <label>First Name <span className="text-danger">*</span></label>
                                    <input
                                        disabled={isDisabled}
                                        value={this.props.data.first_name}
                                        className={`form-control d-block w-100 ${this.props.error.first_name ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "first_name")} />
                                </div>
                                <div className="mt-3">
                                    <label>Last Name <span className="text-danger">*</span></label>
                                    <input
                                        disabled={isDisabled}
                                        value={this.props.data.last_name}
                                        className={`form-control d-block w-100 ${this.props.error.last_name ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "last_name")} />
                                </div>
                                <div className="mt-3">
                                    <label>Email <span className="text-danger">*</span></label>
                                    <input
                                        disabled={isDisabled}
                                        value={this.props.data.email}
                                        className={`form-control d-block w-100 ${this.props.error.email ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "email")} />
                                </div>
                                <div className="mt-3">
                                    <label>Role <span className="text-danger">*</span></label>
                                    <select
                                        disabled={isDisabled}
                                        value={this.props.data.role_id}
                                        className={`form-control d-block w-100 ${this.props.error.role_id ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "role_id")}>
                                        {rolesChoices}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className={btnStyle} onClick={submit}>{label}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { roles: state.roles };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setUsers, setRoles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersModal);