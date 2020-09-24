import React, { Component } from 'react';
import Axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUsers } from '../../actions';
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

    async setExpenses() {
        const preferences = await Axios.get(`${EXPENSE_MANAGER_API_URL}/api/preference/all?token=${this.getCookie("adminKey")}`)
            .then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.log(error);
            });

        this.props.setExpenses(preferences)
    }

    isEmpty(str) {
        if (/^\s+$/.test(str) || str.length === 0)
            return true;
        return false;
    }

    async add() {
        const r = await Axios.post(`${KABYAHE_API_URL}/api/preference/add?token=${this.getCookie("adminKey")}`, {
            'name': this.props.data.name,
            'code': this.props.data.code
        }).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setExpenses();
            this.getPreferencesCount();
            this.addPreferenceNotification("success", "A new preference has been successfully added.");
            $('#preferenceModal').modal('hide')
        } else {
            if (this.isEmpty(this.props.data.name))
                this.props.handleError("name")
            if (this.isEmpty(this.props.data.code))
                this.props.handleError("code")
            this.addPreferenceNotification("error", "Please fill out all the required fields.");
        }
    }

    async update() {
        const url = `${KABYAHE_API_URL}/api/preference/update?token=${this.getCookie("adminKey")}&preferenceid=${this.props.data.id}`;
        const r = await Axios.put(url, {
            'name': this.props.data.name,
            'code': this.props.data.code,
            'active': this.props.data.active
        }).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setExpenses();
            this.addPreferenceNotification("success", "A preference has been successfully updated.");
            $('#preferenceModal').modal('hide')
        } else {
            if (this.isEmpty(this.props.data.name))
                this.props.handleError("name")
            if (this.isEmpty(this.props.data.code))
                this.props.handleError("code")
            this.addPreferenceNotification("error", "Please fill out all the required fields.");
        }
    }

    async delete() {
        const url = `${KABYAHE_API_URL}/api/preference/delete?token=${this.getCookie("adminKey")}&preferenceid=${this.props.data.id}`;
        const r = await Axios.delete(url)
            .then(function (r) {
                return r.data;
            }).catch(function () {
                return { success: false }
            });

        if (r.success) {
            this.setExpenses();
            this.getPreferencesCount();
            this.addPreferenceNotification("success", "A preference has been successfully deleted.");
            $('#preferenceModal').modal('hide')
        } else {
            this.addPreferenceNotification("error", "There has been an error processing your request.");
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
            title = "Add New Preference";
            label = "Add";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.add();
        }
        else if (mode == "edit") {
            title = "Edit Preference";
            label = "Update";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.update();
        }
        else if (mode == "delete") {
            title = "Delete Preference";
            label = "Delete";
            msg = "Are you sure you want to delete this preference?"
            isDisabled = true;
            btnStyle = "btn btn-danger"
            submit = () => this.delete();
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
                                    <label>Display Name <span className="text-danger">*</span></label>
                                    <input
                                        disabled={isDisabled}
                                        value={this.props.data.role_id}
                                        className={`form-control d-block w-100 ${this.props.error.role_id ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.role_id, "name")} />
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
    return bindActionCreators({ setUsers }, dispatch);
}

export default connect(null, mapDispatchToProps)(UsersModal);