import React, { Component } from 'react';
import {PieChart} from 'react-minimal-pie-chart';

export default class Home extends Component {
    render() {
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
                                            <h5 className='font-weight-bold'>My Expenses</h5>
                                        </div>
                                        <div className='col-md-6 graph-container justify-content-center'>
                                            <PieChart
                                                className='px-5 mx-auto'
                                                data={[
                                                    { title:"Category A", value:500.00, color:"#176BA0" },                                           
                                                    { title:"Category B", value:300.00, color:"#1AC9E6" },
                                                ]}
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