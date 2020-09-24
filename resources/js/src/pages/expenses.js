import React, { Component } from 'react';
import Axios from 'axios';
import ReactTable from 'react-table';
import { ExpensesModal } from '../components/modals';
import { setExpenses } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import { EXPENSE_MANAGER_API_URL } from '../config';

class Expenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null,
            data: {
                expenses_category_id: '',
                amount: '',
                entry_date: ''
            },
            error: {
                expenses_category_id: false,
                amount: false,
                entry_date: false
            }
        }
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
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

    componentDidMount() {
        this.setExpenses();
    }

    handleChange(e, target) {
        const data = this.state.data;
        data[target] = e;
        const error = this.state.error;
        error[target] = false;
        this.setState({ data, error });
    }

    handleError(target) {
        const error = this.state.error;
        error[target] = true;
        this.setState({ error });
    }

    render() {
        return (
            <div className="container-fluid bg-white">
                <div className='container'>
                    <div className="form-group row">
                        <div className="col-md-6"><h4 className="font-weight-bold">Expense Management &gt; Expenses</h4></div>
                        <div className="col-md-6">
                            <button className='btn btn-primary float-right'
                                    data-toggle="modal"
                                    data-target="#expensesModal"
                                    onClick={() => this.setState({ mode: "add", data: { expenses_category_id: '', amount: '', entry_date: ''}, error:{expenses_category_id:false, amount:false, entry_date: false} })}>
                                <span className='fa fa-plus'></span> Add Expense
                            </button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <ReactTable
                                className='shadow rounded'
                                data={this.props.expenses}
                                columns={[{
                                    Header: 'Id',
                                    accessor: 'expenses_category_id',
                                    show:false
                                },{
                                    Header: 'Expense Category',
                                    accessor: 'expenses_category_name',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Amount',
                                    accessor: 'amount',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Entry Date',
                                    accessor: 'entry_date',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Created At',
                                    accessor: 'created_at',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                },{
                                    Header: ' ',
                                    accessor: 'id',
                                    sortable: false,
                                    Cell: props =>
                                        <div className='text-center'>
                                            <button
                                                data-toggle="modal"
                                                data-target="#expensesModal"
                                                className="btn btn-secondary edit-delete-preference-btn mx-1 py-1"
                                                onClick={() => this.setState({ mode: "edit", data: props.row, error:{expenses_category_id:false, amount:false, entry_date:false} })}>
                                                <i className="fa fa-edit mr-2" />Edit
                                            </button>
                                            <button
                                                data-toggle="modal"
                                                data-target="#expensesModal"
                                                className="btn btn-danger edit-delete-preference-btn mx-1 py-1"
                                                onClick={() => this.setState({ mode: "delete", data: props.row, error:{expenses_category_id:false, amount:false, entry_date:false} })}>
                                                <i className="fa fa-trash mr-2" />Delete
                                            </button>
                                        </div >
                                }]}
                                defaultPageSize={10}
                            />
                        </div>
                    </div>
                </div>
                <ExpensesModal
                    mode={this.state.mode}
                    data={this.state.data}
                    error={this.state.error}
                    handleChange={(e, target) => this.handleChange(e, target)}
                    handleError={(target) => this.handleError(target)}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);