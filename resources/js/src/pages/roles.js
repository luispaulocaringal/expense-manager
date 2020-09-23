import React, { Component } from 'react';
import ReactTable from 'react-table';
import { RolesModal } from '../components/modals';
import { setRoles } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-table/react-table.css';

class Roles extends Component {
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
                        <div className="col-md-6"><h4 className="font-weight-bold">User Management &gt; Roles</h4></div>
                        <div className="col-md-6"><button className='btn btn-primary float-right'
                                data-toggle="modal"
                                data-target="#rolesModal"
                                onClick={() => this.setState({ mode: "add", data: { name: '', code: '' }, error:{name:false, code:false} })}>
                                <span className='fa fa-plus'></span> Add Role
                            </button>
                        </div>
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