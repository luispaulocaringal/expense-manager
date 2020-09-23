import React, { Component } from 'react';
import Axios from 'axios';
import ReactTable from 'react-table';
import { ExpenseCategoriesModal } from '../components/modals';
import { setExpenseCategories } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-table/react-table.css';
import { EXPENSE_MANAGER_API_URL } from '../config';

class ExpenseCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null,
            data: {
                expenses_category_name: '',
                expenses_category_description: ''
            },
            error: {
                expenses_category_name: false,
                expenses_category_description: false
            }
        }
    } 

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
                        <div className="col-md-6"><h4 className="font-weight-bold">Expense Management &gt; Expense Categories</h4></div>
                        <div className="col-md-6">
                            <button className='btn btn-primary float-right'
                                    data-toggle="modal"
                                    data-target="#expenseCategoriesModal"
                                    onClick={() => this.setState({ mode: "add", data: { expenses_category_name: '', expenses_category_description: '' }, error:{expenses_category_name:false, expenses_category_description:false} })}>
                                        <span className='fa fa-plus'></span> Add Category
                            </button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <ReactTable
                                className='shadow rounded'
                                data={this.props.expenseCategories}
                                columns={[{
                                    Header: 'Display Name',
                                    accessor: 'expenses_category_name',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Description',
                                    accessor: 'expenses_category_description',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Time Created',
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
                                                data-target="#expenseCategoriesModal"
                                                className="btn btn-secondary edit-delete-preference-btn mx-1 py-1"
                                                onClick={() => this.setState({ mode: "edit", data: props.row, error:{name:false, code:false} })}>
                                                <i className="fa fa-edit mr-2" />Edit
                                            </button>
                                            <button
                                                data-toggle="modal"
                                                data-target="#expenseCategoriesModal"
                                                className="btn btn-danger edit-delete-preference-btn mx-1 py-1"
                                                onClick={() => this.setState({ mode: "delete", data: props.row, error:{name:false, code:false} })}>
                                                <i className="fa fa-trash mr-2" />Delete
                                            </button>
                                        </div >
                                }]}
                                defaultPageSize={10}
                            />
                        </div>
                    </div>
                </div>
                <ExpenseCategoriesModal
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
    return { expenseCategories: state.expenseCategories };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setExpenseCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCategories);