import React, { Component } from 'react';
import ReactTable from 'react-table';
import { UsersModal } from '../components/modals';
import { setUsers } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-table/react-table.css';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null,
            data: {
                name: '',
                code: ''
            },
            error: {
                name: false,
                code: false
            }
        }
    }
    
    render() {
        return (
            <div className="container-fluid bg-white">
                <div className='container'>
                    <div className="form-group row">
                        <div className="col-md-6"><h4 className="font-weight-bold">User Management &gt; Users</h4></div>
                        <div className="col-md-6"><button className='btn btn-primary float-right'
                                data-toggle="modal"
                                data-target="#usersModal"
                                onClick={() => this.setState({ mode: "add", data: { name: '', code: '' }, error:{name:false, code:false} })}>
                                <span className='fa fa-plus'></span> Add User
                            </button>
                        </div>
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
                <UsersModal
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
    return { users: state.users };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);