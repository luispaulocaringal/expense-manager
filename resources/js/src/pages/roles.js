import React, { Component } from 'react';
import Axios from 'axios';
import ReactTable from 'react-table';
import { RolesModal } from '../components/modals';
import { setRoles } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EXPENSE_MANAGER_API_URL } from '../config';
import 'react-table/react-table.css';

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: null,
            data: {
                role_id: '',
                role_desc: ''
            },
            error: {
                role_id: false,
                role_desc: false
            }
        }
    } 

    getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    async setRoles() {
        var JWT_AUTHORIZATION = {
            headers: {'Authorization': "Bearer " + this.getCookie("authToken")}
        }
        const roles = await Axios.get(`${EXPENSE_MANAGER_API_URL}/api/request/getRoles`,JWT_AUTHORIZATION)
            .then(function (response) {
                return response.data.data;
            }).catch(function (error) {
                console.log(error);
            });
        this.props.setRoles(roles)
    }

    componentDidMount() {
        this.setRoles();
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
        let data=[]
        for(var i = 0; i < this.props.roles.length; i++){
            data.push({
                'id':this.props.roles[i].id,
                'role_id':this.props.roles[i].role_id,
                'role_desc':this.props.roles[i].role_desc,
                'created_at':this.props.roles[i].created_at,
            })
        }
        return (
            <div className="container-fluid bg-white">
                <div className='container'>
                    <div className="form-group row">
                        <div className="col-md-6"><h4 className="font-weight-bold">User Management &gt; Roles</h4></div>
                        <div className="col-md-6"><button className='btn btn-primary float-right'
                                data-toggle="modal"
                                data-target="#rolesModal"
                                onClick={() => this.setState({ mode: "add", data: { role_id: '', role_desc: '' }, error:{role_id:false, role_desc:false} })}>
                                <span className='fa fa-plus'></span> Add Role
                            </button>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <ReactTable
                                className='shadow rounded'
                                data={data}
                                columns={[{
                                    Header: 'Display Name',
                                    accessor: 'role_id',
                                    headerClassName: 'font-weight-bold',
                                    className: 'px-3',
                                    filterable: true
                                }, {
                                    Header: 'Description',
                                    accessor: 'role_desc',
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
                                            { props.row.role_id != "administrator" ?
                                                <div>
                                                    <button
                                                        data-toggle="modal"
                                                        data-target="#rolesModal"
                                                        className="btn btn-secondary edit-delete-preference-btn mx-1 py-1"
                                                        onClick={() => this.setState({ mode: "edit", data: props.row, error:{role_id:false, role_desc:false} })}>
                                                        <i className="fa fa-edit mr-2" />Edit
                                                    </button>
                                                    <button
                                                        data-toggle="modal"
                                                        data-target="#rolesModal"
                                                        className="btn btn-danger edit-delete-preference-btn mx-1 py-1"
                                                        onClick={() => this.setState({ mode: "delete", data: props.row, error:{role_id:false, role_desc:false} })}>
                                                        <i className="fa fa-trash mr-2" />Delete
                                                    </button>
                                                </div>
                                            : null }
                                        </div >
                                }]}
                                defaultPageSize={10}
                            />
                        </div>
                    </div>
                </div>
                <RolesModal
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
    return { roles: state.roles };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setRoles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);