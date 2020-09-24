import React, { Component } from 'react';
import Axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoles } from '../../actions';
import { EXPENSE_MANAGER_API_URL } from '../../config';
//import NotificationSystem from 'react-notification-system';

//let notificationSystem = null;
class RolesModal extends Component {
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

    isEmpty(str) {
        if (/^\s+$/.test(str) || str.length === 0)
            return true;
        return false;
    }

    async add() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        
        const r = await Axios.post(`${EXPENSE_MANAGER_API_URL}/api/request/addRoles`, {
            'role_id': this.props.data.role_id,
            'role_desc': this.props.data.role_desc
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setRoles();
            //this.addPreferenceNotification("success", "A new preference has been successfully added.");
            $('#rolesModal').modal('hide')
        } else {
            if (!r.success)
                console.log(r.message)
            if (this.isEmpty(this.props.data.role_id))
                this.props.handleError("role_id")
            if (this.isEmpty(this.props.data.role_desc))
                this.props.handleError("role_desc")
            //this.addPreferenceNotification("error", "Please fill out all the required fields.");
        }
    }

    async update() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const url = `${EXPENSE_MANAGER_API_URL}/api/request/updateRoles?roleid=${this.props.data.id}`;
        const r = await Axios.put(url, {
            'role_id': this.props.data.role_id,
            'role_desc': this.props.data.role_desc
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });
        
        if (r.success) {
            this.setRoles();
            //this.addPreferenceNotification("success", "A preference has been successfully updated.");
            $('#rolesModal').modal('hide')
        } else {
            if (this.isEmpty(this.props.data.role_id))
                this.props.handleError("role_id")
            if (this.isEmpty(this.props.data.role_desc))
                this.props.handleError("role_desc")
            //this.addPreferenceNotification("error", "Please fill out all the required fields.");
        }
    }

    async delete() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const url = `${EXPENSE_MANAGER_API_URL}/api/request/deleteRoles?roleid=${this.props.data.id}`;
        const r = await Axios.delete(url,JWT_AUTHORIZATION)
            .then(function (r) {
                return r.data;
            }).catch(function () {
                return { success: false }
            });
        if (r.success) {
            this.setRoles();
            //this.addPreferenceNotification("success", "A preference has been successfully deleted.");
            $('#rolesModal').modal('hide')
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
            title = "Add New Role";
            label = "Add";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.add();
        }
        else if (mode == "edit") {
            title = "Edit Role";
            label = "Update";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.update();
        }
        else if (mode == "delete") {
            title = "Delete Role";
            label = "Delete";
            msg = "Are you sure you want to delete this role?"
            isDisabled = true;
            btnStyle = "btn btn-danger"
            submit = () => this.delete();
        }

        return (
            <div>
                <div className="modal fade" id="rolesModal" tabIndex="-1" role="dialog" aria-labelledby="rolesModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="rolesModalLabel">{title}</h5>
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
                                {this.props.error.role_id || this.props.error.role_desc ?
                                    <div>
                                        <p>Please fill up required fields</p>
                                    </div> : null
                                }
                                <div>
                                    <label>Display Name <span className="text-danger">*</span></label>
                                    <input
                                        disabled={isDisabled}
                                        value={this.props.data.role_id}
                                        className={`form-control d-block w-100 ${this.props.error.role_id ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "role_id")} />
                                </div>
                                <div className="mt-3">
                                    <label>Role Description <span className="text-danger">*</span></label>
                                    <input
                                        disabled={isDisabled}
                                        value={this.props.data.role_desc}
                                        className={`form-control d-block w-100 ${this.props.error.role_desc ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "role_desc")} />
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setRoles }, dispatch);
}

export default connect(null, mapDispatchToProps)(RolesModal);