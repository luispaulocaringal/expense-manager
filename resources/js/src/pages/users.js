import React, { Component } from 'react';
import Axios from 'axios';
import ReactTable from 'react-table';
import { UsersModal } from '../components/modals';
import { setUsers } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EXPENSE_MANAGER_API_URL } from '../config';
import 'react-table/react-table.css';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null,
            data: {
                first_name: '',
                last_name: '',
                email: '',
                role_id: ''
            },
            error: {
                first_name: false,
                last_name: false,
                email: false,
                role_id: false
            }
        }
    }

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    async setUsers() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const users = await Axios.get(`${EXPENSE_MANAGER_API_URL}/api/user/getUsers`,JWT_AUTHORIZATION)
            .then(function (response) {
                return response.data.data;
            }).catch(function (error) {
                console.log(error);
            });
        this.props.setUsers(users)
    }

    componentDidMount() {
        this.setUsers();
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
        console.log(this.props.users)
        let users = []
        if(this.props.users!=null){
            for(var i = 0; i < this.props.users.length; i++){
                users.push({
                    id:this.props.users[i].id,
                    first_name:this.props.users[i].first_name,
                    last_name:this.props.users[i].last_name,
                    name: this.props.users[i].first_name + " " + this.props.users[i].last_name,
                    email: this.props.users[i].email,
                    role_id: this.props.users[i].role_id,
                    created_at: this.props.users[i].created_at
                })
            }
        }
        return (
            <div className="container-fluid bg-white">
                <div className='container'>
                    <div className="form-group row">
                        <div className="col-md-6"><h4 className="font-weight-bold">User Management &gt; Users</h4></div>
                        <div className="col-md-6"><button className='btn btn-primary float-right'
                                data-toggle="modal"
                                data-target="#usersModal"
                                onClick={() => this.setState({ mode: "add", data: { first_name: '', last_name: '',email: '', role_id: '' }, error:{first_name:false, last_name:false,email:false, role_id:false} })}>
                                <span className='fa fa-plus'></span> Add User
                            </button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <ReactTable
                                className='shadow rounded'
                                columns={[{
                                    Header: 'first_name',
                                    accessor: 'first_name',
                                    show:false
                                },{
                                    Header: 'last_name',
                                    accessor: 'last_name',
                                    show:false
                                },{
                                    Header: 'Name',
                                    accessor: 'name',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3 font-weight-bold',
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
                                },{
                                    Header: ' ',
                                    accessor: 'id',
                                    sortable: false,
                                    Cell: props =>
                                        <div className='text-center'>
                                            { props.row.id != this.props.info.user_id ?
                                                <div>
                                                    <button
                                                        data-toggle="modal"
                                                        data-target="#usersModal"
                                                        className="btn btn-secondary edit-delete-preference-btn mx-1 py-1"
                                                        onClick={() => this.setState({ mode: "edit", data: props.row, error:{first_name:false, last_name:false,email:false, role_id:false} })}>
                                                        <i className="fa fa-edit mr-2" />Edit
                                                    </button>
                                                    <button
                                                        data-toggle="modal"
                                                        data-target="#usersModal"
                                                        className="btn btn-danger edit-delete-preference-btn mx-1 py-1"
                                                        onClick={() => this.setState({ mode: "delete", data: props.row, error:{first_name:false, last_name:false,email:false, role_id:false} })}>
                                                        <i className="fa fa-trash mr-2" />Delete
                                                    </button>
                                                </div>
                                            : <span className='font-weight-bold'>Current User</span> }
                                        </div >
                                }]}
                                defaultPageSize={10}
                                data={users}
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
    return { users: state.users, info: state.info };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);