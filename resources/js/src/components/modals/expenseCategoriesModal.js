import React, { Component } from 'react';
import Axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setExpenseCategories } from '../../actions';
import { EXPENSE_MANAGER_API_URL } from '../../config';
//import NotificationSystem from 'react-notification-system';

//let notificationSystem = null;
class ExpenseCategoriesModal extends Component {
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

    async setExpenseCategories() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const expenseCategories = await Axios.get(`${EXPENSE_MANAGER_API_URL}/api/request/getExpenseCategories`,JWT_AUTHORIZATION)
            .then(function (response) {
                return response.data.data;
            }).catch(function (error) {
                console.log(error);
            });

        this.props.setExpenseCategories(expenseCategories)
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
        
        const r = await Axios.post(`${EXPENSE_MANAGER_API_URL}/api/request/addexpensecategories`, {
            'expenses_category_name': this.props.data.expenses_category_name,
            'expenses_category_description': this.props.data.expenses_category_description
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setExpenseCategories();
            //this.addPreferenceNotification("success", "A new preference has been successfully added.");
            $('#expenseCategoriesModal').modal('hide')
        } else {
            if (this.isEmpty(this.props.data.expenses_category_name))
                this.props.handleError("expenses_category_name")
            if (this.isEmpty(this.props.data.expenses_category_description))
                this.props.handleError("expenses_category_description")
            //this.addPreferenceNotification("error", "Please fill out all the required fields.");
        }
    }

    async update() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const url = `${EXPENSE_MANAGER_API_URL}/api/request/updateExpenseCategories?expensecategoriesid=${this.props.data.id}`;
        const r = await Axios.put(url, {
            'expenses_category_name': this.props.data.expenses_category_name,
            'expenses_category_description': this.props.data.expenses_category_description
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setExpenseCategories();
            //this.addPreferenceNotification("success", "A preference has been successfully updated.");
            $('#expenseCategoriesModal').modal('hide')
        } else {
            if (this.isEmpty(this.props.data.expenses_category_name))
                this.props.handleError("expenses_category_name")
            if (this.isEmpty(this.props.data.expenses_category_description))
                this.props.handleError("expenses_category_description")
            //this.addPreferenceNotification("error", "Please fill out all the required fields.");
        }
    }

    async delete() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const url = `${EXPENSE_MANAGER_API_URL}/api/request/deleteExpenseCategories?expensecategoriesid=${this.props.data.id}`;
        const r = await Axios.delete(url,JWT_AUTHORIZATION)
            .then(function (r) {
                return r.data;
            }).catch(function () {
                return { success: false }
            });
        if (r.success) {
            this.setExpenseCategories();
            //this.addPreferenceNotification("success", "A preference has been successfully deleted.");
            $('#expenseCategoriesModal').modal('hide')
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
            title = "Add New Expense Category";
            label = "Add";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.add();
        }
        else if (mode == "edit") {
            title = "Edit Expense Category";
            label = "Update";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.update();
        }
        else if (mode == "delete") {
            title = "Delete Expense Category";
            label = "Delete";
            msg = "Are you sure you want to delete this category?"
            isDisabled = true;
            btnStyle = "btn btn-danger"
            submit = () => this.delete();
        }

        return (
            <div>
                <div className="modal fade" id="expenseCategoriesModal" tabIndex="-1" role="dialog" aria-labelledby="expenseCategoriesModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="expensesCategoriesModalLabel">{title}</h5>
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
                                {this.props.error.expenses_category_name || this.props.error.expenses_category_description ?
                                    <div>
                                        <p>Please fill up required fields</p>
                                    </div> : null
                                }
                                <div>
                                    <label>Display Name <span className="text-danger">*</span></label>
                                    <input
                                        disabled={isDisabled}
                                        value={this.props.data.expenses_category_name}
                                        className={`form-control d-block w-100 ${this.props.error.expenses_category_name ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "expenses_category_name")} />
                                </div>
                                <div className="mt-3">
                                    <label>Description <span className="text-danger">*</span></label>
                                    <input
                                        disabled={isDisabled}
                                        value={this.props.data.expenses_category_description}
                                        className={`form-control d-block w-100 ${this.props.error.expenses_category_description ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "expenses_category_description")} />
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
    return bindActionCreators({ setExpenseCategories }, dispatch);
}

export default connect(null, mapDispatchToProps)(ExpenseCategoriesModal);