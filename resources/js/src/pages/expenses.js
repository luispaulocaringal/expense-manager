import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class Expenses extends Component {
    render() {
        return (
            <div className="container-fluid bg-white">
                <div className='container'>
                    <div className="form-group row">
                        <div className="col-md-6"><h4 className="font-weight-bold">Expense Management &gt; Expenses</h4></div>
                        <div className="col-md-6"><button className='btn btn-primary float-right'><span className='fa fa-plus'></span> Add Expense</button></div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <ReactTable
                                className='shadow rounded'
                                columns={[{
                                    Header: 'Display Name',
                                    accessor: 'name',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Description',
                                    accessor: 'description',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Time Created',
                                    accessor: 'created_at',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }]}
                                defaultPageSize={10}
                                data={[{
                                    name:"Admin",
                                    description:"super user",
                                    created_at: "2020-09-23",
                                },{
                                    name:"User",
                                    description:"can add expenses",
                                    created_at: "2020-09-23",
                                }]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}