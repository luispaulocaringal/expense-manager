import React, { Component } from 'react';
import Axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setExpenses, setExpenseCategories } from '../../actions';
import { EXPENSE_MANAGER_API_URL } from '../../config';
//import NotificationSystem from 'react-notification-system';

//let notificationSystem = null;
class ExpensesModal extends Component {
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

    componentDidMount() {
        this.setExpenseCategories();
    }

    async setExpenses() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const expenses = await Axios.get(`${EXPENSE_MANAGER_API_URL}/api/request/getExpenses`,JWT_AUTHORIZATION)
            .then(function (response) {
                return response.data.data;
            }).catch(function (error) {
                console.log(error);
            });

        this.props.setExpenses(expenses)
    }

    isEmpty(str) {
        if (/^\s+$/.test(str) || str.length === 0)
            return true;
        return false;
    }

    async add() {
        var randomColor = require('randomcolor'); 
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const r = await Axios.post(`${EXPENSE_MANAGER_API_URL}/api/request/addExpenses`, {
            'expenses_category_id': this.props.data.expenses_category_id,
            'amount': this.props.data.amount,
            'entry_date': this.props.data.entry_date,
            'chart_color':randomColor()
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setExpenses();
            //this.addPreferenceNotification("success", "A new preference has been successfully added.");
            $('#expensesModal').modal('hide')
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

    async update() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const url = `${EXPENSE_MANAGER_API_URL}/api/request/updateExpenses?expensesid=${this.props.data.id}`;
        const r = await Axios.put(url, {
            'expenses_category_id': this.props.data.expenses_category_id,
            'amount': this.props.data.amount,
            'entry_date': this.props.data.entry_date
        },JWT_AUTHORIZATION).then(function (r) {
            return r.data;
        }).catch(function () {
            return { success: false }
        });

        if (r.success) {
            this.setExpenses();
            //this.addPreferenceNotification("success", "A preference has been successfully updated.");
            $('#expensesModal').modal('hide')
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
        const url = `${EXPENSE_MANAGER_API_URL}/api/request/deleteExpenses?expensesid=${this.props.data.id}`;
        const r = await Axios.delete(url,JWT_AUTHORIZATION)
            .then(function (r) {
                return r.data;
            }).catch(function () {
                return { success: false }
            });
        if (r.success) {
            this.setExpenses();
            //this.addPreferenceNotification("success", "A preference has been successfully deleted.");
            $('#expensesModal').modal('hide')
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
            title = "Add New Expense";
            label = "Add";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.add();
        }
        else if (mode == "edit") {
            title = "Edit Expense";
            label = "Update";
            msg = null;
            isDisabled = false;
            btnStyle = "btn btn-primary"
            submit = () => this.update();
        }
        else if (mode == "delete") {
            title = "Delete Expense";
            label = "Delete";
            msg = "Are you sure you want to delete this expense?"
            isDisabled = true;
            btnStyle = "btn btn-danger"
            submit = () => this.delete();
        }

        let expenseCategoriesChoices = []
        if(this.props.expenseCategories != null){
            expenseCategoriesChoices.push(<option value='' key={0}>Select one...</option>)
            for(var i = 0; i < this.props.expenseCategories.length; i++){
                expenseCategoriesChoices.push(<option key={this.props.expenseCategories[i].id} value={this.props.expenseCategories[i].id}>{this.props.expenseCategories[i]['expenses_category_name']}</option>)
            }
        }

        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        return (
            <div>
                <div className="modal fade" id="expensesModal" tabIndex="-1" role="dialog" aria-labelledby="expensesModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="expensesModalLabel">{title}</h5>
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
                                {this.props.error.expenses_category_id || this.props.error.amount || this.props.error.entry_date ?
                                    <div>
                                        <p>Please fill up required fields</p>
                                    </div> : null
                                }
                                <div>
                                    <label>Expense Category <span className="text-danger">*</span></label>
                                    <select
                                        disabled={isDisabled}
                                        value={this.props.data.expenses_category_id}
                                        className={`form-control d-block w-100 ${this.props.error.expenses_category_id ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "expenses_category_id")}>
                                        {expenseCategoriesChoices}
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <label>Amount <span className="text-danger">*</span></label>
                                    <input
                                        type={'number'}
                                        disabled={isDisabled}
                                        value={this.props.data.amount}
                                        className={`form-control d-block w-100 ${this.props.error.amount ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "amount")} />
                                </div>
                                <div className="mt-3">
                                    <label>Entry Date <span className="text-danger">*</span></label>
                                    <input
                                        type={'date'}
                                        disabled={isDisabled}
                                        value={this.props.data.entry_date}
                                        className={`form-control d-block w-100 ${this.props.error.entry_date ? "border-danger" : ""}`}
                                        onChange={(e) => this.props.handleChange(e.target.value, "entry_date")} />
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
    return { expenseCategories: state.expenseCategories };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setExpenses, setExpenseCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesModal);