import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './Navbar'
import {ROOT_URL} from '../constants/constants';

class appliedJobs extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     savedJobs : "3",    //number of connections user have
        //     savedPosition : "Electronic Engineering ",
        //     savedCompany : "NVIDIA",
        //     savedCompanyAddress : "San Jose, California",

        //     appliedJobs: "4",
        //     appliedPosition : "Software Engineering Intern",
        //     appliedCompany : "Adobe",
        //     appliedCompanyAddress : "San Jose, California",

        //     savedCompanyImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",
        //     appliedCompanyImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"

        // }
        this.state = {
            appliedJobs: 0,
            appliedJobsDetails: null
        }
    }

    componentDidMount() {
        var headers = new Headers();
        axios.defaults.withCredentials = true

        if (localStorage.getItem("userId")) {
            const id = localStorage.getItem("userId")
            axios.get(`${ROOT_URL}/user/${id}/appliedJobs`)
                .then(response => {
                    if (response.status === 200) {
                        this.setState({
                            appliedJobs: response.data.info.length,
                            appliedJobsDetails: response.data.info
                        })
                    }
                })

        }
    }

    showJobDetails = (e) => {
        console.log(e.target.id)
    }


    render() {
        require('../styles/appliedJobs.css');
        let redirect = null;

        if (this.state.appliedJobsDetails) {
            var displayAppliedJobs = this.state.appliedJobsDetails.map(job => {
                return (
                    <div class="row userInvitations">
                        <div className="col-sm-2 col-md-2 col-lg-2">
                            <img src={""+ROOT_URL+"/"+job.companyLogo} className="img savedjobImage" />
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <h4><a href="#" onClick={this.showJobDetails} id={job._id}>{job.jobTitle}</a></h4>
                            <h5>{job.postedBy.fname + " " + job.postedBy.lname}</h5>
                            <h6>{job.location}</h6>
                        </div>
                        <div className="col-sm-1 col-md-1 col-lg-1">
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" data-toggle="dropdown"
                                    style={{ 'float': 'left', 'font-size': '150%' }}>
                                    <span class="glyphicon glyphicon-bookmark"></span>
                                </a>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                )
            })
        }
        return (
            <div>

                <Login/>
                <div class="row myNetworkBackground">

                    {/* column 1- This is the code for Saved Jobs */}

                    <div class="col-sm-8 col-md-8 col-lg-8">
                        <div class="card myInvitations">
                            <div class="card-title ">
                                <h4>Applied Jobs({this.state.appliedJobs})</h4>
                                <hr></hr>
                                {displayAppliedJobs}
                            </div>
                        </div>
                    </div>

                    {/* column 2-This is the code for applied Jobs */}
                    <div class="col-sm-4 col-md-4 col-lg-4" >
                        <div class="myadsborder">
                            <div className="row">
                                <div class="col-sm-8 col-md-8 col-lg-8" style={{ 'textAlign': 'left' }}>
                                    Saved Jobs
                                    </div>
                                <div class="col-sm-4 col-md-4 col-lg-4" style={{ 'textAlign': 'right' }}>
                                    <Link to="/savedJobs">See all</Link>
                                </div>
                            </div>
                            <hr></hr>
                            {displayAppliedJobs}
                            <br></br><br></br><br></br>
                        </div>

                        <div class="myadsborder">
                            <br></br><br></br><a>About</a> <a> Help Center </a> <a> Privacy & Terms</a>
                            <br></br><a>Advertising</a>  <a> Business Services</a>
                            <br></br><a>Get the LinkedIn app</a> <a>  More</a><br></br>
                            <a>LinkedIn Corporation © 2018</a>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default appliedJobs;