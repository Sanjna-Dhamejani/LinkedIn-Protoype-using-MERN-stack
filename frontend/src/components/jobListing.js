import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
// import '../styles/jobposting.css'
import Stepper from 'react-stepper-horizontal'
import noJobsImage from '../assets/images/NoJobListings.PNG'
import jobpostlogo from '../assets/images/jobpostlogo.PNG'
import gifticon from '../assets/images/gift-icon.png'

import { ROOT_URL } from '../constants/constants';
// import jobpostlogo from '../assets/images/jobpostlogo.PNG'

class JobListing extends Component {
    constructor(props) {
        super(props);

        let myData = JSON.parse(localStorage.getItem('myData'));

        this.state = {
            information: [],
            myData: myData

        }
    }

    componentDidMount() {

        console.log("\nInside component did mount");

        axios.defaults.withCredentials = true;
        const userId = localStorage.getItem("userId")
        axios.get(`${ROOT_URL}/user/${userId}/joblist`)
            .then((response) => {
                console.log("Response received from backend");
                console.log("\nPrinting the response body");
                console.log(response.data);
                if (response.data.status == 1) {
                    this.setState({
                        information: response.data.info
                    })
                }
                else {
                    console.log("Some error occured in the query execution");
                    // alert("Some error occured!");
                }

            });
    }

    render() {
        require('../styles/jobposting.css')
        require('../styles/jobListing.css');

        // let redirectVar;
        // if (!this.state.myData) {
        //     redirectVar = <Redirect to="/" />
        // }
        
        let noJobsDisplay = null;
        let JobDisplay = null;
        if (this.state.information.length == 0) {
            noJobsDisplay = (
                <div class="center">
                    <br /><br />
                    <center>
                        <img src={noJobsImage}></img>
                        <br></br>
                        <p class="para">No jobs posted yet</p>
                    </center>
                </div>
            )
        }
        else if (this.state.information.length > 0) {

            JobDisplay = this.state.information.map(joblist => {
                return (
                    <div>
                        {/* {redirectVar} */}
                        <div class="job-listing">
                            <Link class="joblisttitle" to={{ pathname: '/job/applicants', state: { job_id: joblist._id } }}>{joblist.jobTitle}</Link>

                            <Link class="btn btn-primary graph-button" to={{ pathname: '/user/graphs', state: { job_id: joblist._id } }}>
                                <span class="edit-button-text">View graphs</span>
                            </Link>

                            <Link class="btn btn-primary edit-button" to={{ pathname: '/job/post', state: { job_id: joblist._id, jobTitlefromrd: joblist.jobTitle } }}>
                                <span class="edit-button-text">Edit</span>
                            </Link>
                            <h4>{joblist.companyName}</h4>
                            <p class="paragraph">{joblist.location}</p>
                            <p class="paragraph">{joblist.description}</p>
                            <p class="paragraph">Employment type : {joblist.employmentType}</p>
                            <p class="paragraph">Industry : {joblist.industry}</p>
                        </div>
                        <hr class="linebreak"></hr>
                    </div>
                )
            })
        }

        return (
            <div>

                <div className="JobPostHeader">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <img src={jobpostlogo} class="navbar-brand" style={{ width: "10%", height: "49px", padding: "5px 20px 0px 10px", margin: ".5% 0% 0% 13%" }} />
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav jobpostlinksnavbar">
                                <Link to="/job/list" className="nav-item linkinjobpostheader"><b>HOME</b> &nbsp; &nbsp; &nbsp;</Link>
                                <a href="/job/post" className="nav-item active linkinjobpostheader"><b>POST A JOB</b> &nbsp; &nbsp; &nbsp; <span class="sr-only">(current)</span></a>
                                <Link to="/newsfeed" className="nav-item linkinjobpostheader"><b>LINKEDIN.COM</b> </Link>
                            </div>
                        </div>
                    </nav>
                </div>

                <div class="row" id="mainbody">

                    <div class="col-md-7 left-content">
                        <br />
                        <p class="title">&nbsp;&nbsp;&nbsp;Jobs</p>
                        <hr class="linebreak"></hr>
                        <div class="row">
                            <div class="col-md-4">
                                <input type="text" name="search" id="search" placeholder="Search ..." class="form-control search-bar" />
                            </div>
                            <div class="col-md-6">
                                <button class="btn btn-primary go-button">
                                    <span>Go</span>
                                </button>
                            </div>
                        </div>
                        <hr class="linebreak"></hr>

                        {noJobsDisplay}
                        {JobDisplay}
                        <br /><br />
                    </div>

                    <div class="col-md-3 right-content">
                        <h3>&nbsp;&nbsp; No job posting budget</h3>
                        <span style={{ float: 'left', width: "20%" }}>
                            <img src={gifticon} width="70" height="70" class="giftimage"></img>
                        </span>
                        <span style={{ float: 'right', width: "70%" }}>
                            <p class="para"> Save up to 35% by adding to your job posting budget </p>
                        </span>
                        <br /><br /><br /><br />
                        <button class="button1">Add job posting budget</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default JobListing;