import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class Users extends Component {
    render() {
        return (
            <div className="container-fluid bg-white">
                <div className='container'>
                    <div className="form-group row">
                        <div className="col-md-6"><h4 className="font-weight-bold">User Management &gt; Users</h4></div>
                        <div className="col-md-6"><button className='btn btn-primary float-right'><span className='fa fa-plus'></span> Add User</button></div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <ReactTable
                                className='shadow rounded'
                                columns={[{
                                    Header: 'Name',
                                    accessor: 'name',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Email Address',
                                    accessor: 'email',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Role',
                                    accessor: 'role_id',
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
                                    role_id: "administrator"
                                },{
                                    name:"User",
                                    description:"can add expenses",
                                    created_at: "2020-09-23",
                                    role_id: "user"
                                }]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}