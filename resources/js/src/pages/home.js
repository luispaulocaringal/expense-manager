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

    render() {
        console.log(this.props.expenses)
        let data=[]
        let expenseTable=[]   
        if(this.props.expenses!=null){
            for(var i = 0; i < this.props.expenses.length; i++){
                data.push({
                    title:this.props.expenses[i].expenses_category_name,
                    value:parseInt(this.props.expenses[i].amount),
                    color:this.props.expenses[i].chart_color
                })
            }
        }
        return (
            <div className="container-fluid bg-white">
                <div className='container'>
                    <div className="form-group row">
                        <div className="col-md-12"><h4 className="font-weight-bold">Dashboard</h4></div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <div className="card shadow justify-content-center">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group row'>
                                                <div className='col-md-12'>
                                                    <h5 className='font-weight-bold'>My Expenses</h5>
                                                </div>
                                            </div>
                                            <div className='form-group row'>
                                                <div className='col-md-12'>
                                                    <ReactTable
                                                        data={this.props.expenses}
                                                        columns={[{
                                                            Header: 'Expense Categories',
                                                            accessor: 'expenses_category_name',
                                                            headerClassName: 'font-weight-bold',
                                                            className: 'px-3',
                                                            filterable: true
                                                        },{
                                                            Header: 'Total',
                                                            accessor: 'amount',
                                                            headerClassName: 'font-weight-bold',
                                                            className: 'px-3',
                                                            filterable: true
                                                        }]}
                                                        defaultPageSize={5}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 graph-container justify-content-center'>
                                            <PieChart
                                                className='px-5 mx-auto'
                                                data={data}
                                                animate
                                                animationDuration={500}
                                                animationEasing="ease-out"
                                                paddingAngle={0}
                                                radius={50}
                                                startAngle={0}
                                                viewBoxSize={[100, 100]}
                                                labelPosition={65}
                                                labelStyle={{
                                                fontSize: "10px",
                                                fontColor: "FFFFFA",
                                                fontWeight: "800",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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