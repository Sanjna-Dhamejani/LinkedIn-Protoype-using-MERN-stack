import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/
import Login from './Navbar'

import { ROOT_URL } from '../constants/constants';
import picDS from '../assets/images/PicDS.png'
import axios from 'axios';
var swal = require('sweetalert');
//const userID = localStorage.getItem("userId")
class savedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedJobs: 0,    //number of connections user have
            savedJobsDetails: null,

            jobResults: [],
            clickedAjob: false,
            filtercompanyname: "",
            filterjobtype: "",
            filterindustry: "",
            clickedJobTitle: "",
            clickedJobId: "",
            clickedDescription: "",
            clickedIndustry: "",
            clickedEmploymentType: "",
            clickedPostedDate: "",
            clickedLocation: "",
            clickedJobFunction: "",
            clickedCompanyLogo: "",
            clickedApplyMethod: "",
            clickedPostedBy: "",
            clickedProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",

            isSaved: "",

            applyJobfname: "",
            applyJoblname: "",
            applyJobEmail: "",
            applyJobAddress: "",
            applyJobResume: "",
            applyJobHowDidYouHear: "",
            applyJobDiversity: "",
            applyJobSponsership: "",
            applyJobDisability: "",
            alreadyApplied: false,

            filteredList: []
        }

        this.handleAppliedJob = this.handleAppliedJob.bind(this);
        this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
    }

    handleAppliedJob = (e) => {

        console.log("the JOB ID IS : " + e)
        this.setState({
            clickedJobId: e
        });

        if(localStorage.getItem("userId")){
            const id = localStorage.getItem("userId")
            axios.get(`${ROOT_URL}/user/${id}`)
            .then(res => {

                console.log("------on getting user data for easy apply-------", res.data.info);

                axios.put(`${ROOT_URL}/user/${this.state.clickedJobId}/start_application`)
                    .then(res => {
                        console.log("------Updated counter-------");
                    })
                    .catch(err => {
                        console.log("Error in put start application.");
                    });

                //if (this.state.clickedApplyMethod == "Easy Apply") {
                console.log("----------------this one----------", res.data.info);

                this.setState({
                    applyJobfname: res.data.info.fname,
                    applyJoblname: res.data.info.lname,
                    applyJobEmail: res.data.info.email,
                    applyJobAddress: res.data.info.address,
                    applyJobResume: res.data.info.resume
                });
                console.log("--------------------------", this.state.applyJobfname);
                /* } else if (this.state.clickedApplyMethod == "Custom Apply") {
                     this.setState({
                         applyJobResume: res.data.info.resume
                     });
                 }*/


            })
            .catch(err => {
                console.log("Error in getting user details.");
            });
        }
    }

    handleApplicationSubmit = (e) => {

        //const userID = "5c06a1ef06b29e419cf927d9"; //localStorage.getItem(userId);
        const isDisable = false;
        if (this.state.applyJobDisability == "Yes") {
            isDisable = true;
        }
        const id = localStorage.getItem("userId")
        axios.defaults.withCredentials = true;
        const data = {
            jobId: this.state.clickedJobId,
            howDidyouHear: this.state.applyJobHowDidYouHear,
            isDisabled: isDisable,
            resume: this.state.applyJobResume,
            ethnicity: this.state.applyJobDiversity,
            sponsership: this.state.applyJobSponsership
        }
        axios.post(`${ROOT_URL}/user/${id}/apply`, data)

            .then(res => {

                console.log("------on load-------", res.data.length);
                console.log("------on load-------", res.data);
                alert(res.data.msg);
                /*this.setState({
                    jobResults: res.data
                });*/

            })
            .catch(err => {
                console.log("Error in job search get");
            });
    }

    componentDidMount() {
        var headers = new Headers()
        axios.defaults.withCredentials = true;

        console.log("component did mount should be called")

        if (localStorage.getItem("userId")) {
        const userId = localStorage.getItem("userId")
        axios.get(`${ROOT_URL}/user/${userId}/savedJobs`)

            .then(response => {
                console.log("---------------------------")
                if (response.status === 200) {
                    console.log(response.data.info)
                    this.setState({
                        savedJobsDetails: response.data.info,
                        savedJobs: response.data.info.length
                    })
                }
            })
            .catch(err => {
                console.log("Error in job search get" + err);
            });
          }
    }


    render() {
        require('../styles/savedJobs.css');
        let redirect = null;
        let appliedModal = null;
        let clickedModal = null;


        let myData = JSON.parse(localStorage.getItem('myData'));
        clickedModal = (
            <div>

                <h4>{myData.firstname} {myData.lastname}</h4>

                <div style={{ "textAlign": "left", "padding": "5%" }}>
                    <label>First Name:</label>
                    <p><input type="text" onChange={this.onChange} name="applyJobfname" className="modalTextBox" value={this.state.applyJobfname}></input></p>
                    <label>Last Name:</label>
                    <p><input type="text" onChange={this.onChange} name="applyJoblname" className="modalTextBox" value={this.state.applyJoblname}></input></p>
                    <label>Address:</label>
                    <p><input type="text" onChange={this.onChange} name="applyJobAddress" className="modalTextBox" value={this.state.applyJobAddress}></input></p>

                    <label>Email:</label>
                    <p><input type="text" onChange={this.onChange} name="applyJobEmail" className="modalTextBox" value={this.state.applyJobEmail}></input></p>
                    <label>Resume(optional):</label>
                    <p><input type="text" onChange={this.onChange} name="applyJobResume" className="modalTextBox" value={this.state.applyJobResume}></input></p>

                    <label>How did you hear about this:</label>
                    <p><input type="text" onChange={this.onChange} name="applyJobHowDidYouHear" className="modalTextBox"></input></p>


                    <label for="sel1">Diversity:</label>
                    <select onChange={this.handleDiversity} class="form-control" id="sel1">
                        <option value="" >Select</option>
                        <option value="American" selected={this.state.applyJobDiversity == "American"}>American</option>
                        <option value="Asian" selected={this.state.applyJobDiversity == "Asian"}>Asian</option>
                        <option value="Hispanic" selected={this.state.applyJobDiversity == "Hispanic"}>Hispanic</option>
                        <option value="Latino" selected={this.state.applyJobDiversity == "Latino"}>Latino</option>
                        <option value="Other" selected={this.state.applyJobDiversity == "Other"}>Other</option>
                        <option value="Decine to self identify" selected={this.state.applyJobDiversity == "Decine to self identify"}>Decine to self identify</option>
                    </select>
                    <p></p>

                    <label for="sel2">Do you require Sponsership?</label>
                    <select onChange={this.handleSponsership} class="form-control" id="sel2">
                        <option value="" >Select</option>
                        <option value="Yes" selected={this.state.applyJobSponsership == "Yes"}>Yes</option>
                        <option value="No" selected={this.state.applyJobSponsership == "No"}>No</option>
                    </select>
                    <p></p>
                    <label for="sel3">Disability Status:</label>
                    <select onChange={this.handleDisability} class="form-control" id="sel3">
                        <option value="" >Select</option>
                        <option value="Yes, I have a disability(or previously had a disability)" selected={this.state.applyJobDisability == "Yes, I have a disability(or previously had a disability)"}>Yes, I have a disability(or previously had a disability)</option>
                        <option value="No, I don't have a disability" selected={this.state.applyJobDisability == "No, I don't have a disability"}>No, I don't have a disability</option>
                        <option value="I don't wish to answer" selected={this.state.applyJobDisability == "I don't wish to answer"}>I don't wish to answer</option>
                    </select>

                    <p style={{ "paddingTop": "5%" }}>We include a copy of your full profile with your application</p>
                </div>
            </div>
        )

        appliedModal = (
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 style={{ "float": "left" }}>Apply to {this.state.clickedJobTitle}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{ "float": "right" }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style={{ "textAlign": "center" }}>
                        <h5>{clickedModal}</h5>
                    </div>
                    <div class="modal-footer">
                        <button className="savedButtonModal" data-dismiss="modal">Cancel</button>
                        <button className="applyButtonModal" onClick={this.handleApplicationSubmit}>Submit Application</button>
                    </div>
                </div>
            </div>
        )


        if (this.state.savedJobsDetails) {
            var displaySavedJobs = this.state.savedJobsDetails.map(job => {
                console.log("Mappped Jobs ", job)
                return (
                    <div class="row userInvitations">
                        <div className="col-sm-2 col-md-2 col-lg-2">
                            <img src={ROOT_URL + "/" + job.companyLogo} className="img savedjobImage" />
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <h4><a href="#" onClick={this.showJobDetails} id={job._id}>{job.jobTitle}</a></h4>
                            <h5>{job.postedBy.fname + " " + job.postedBy.lname}</h5>
                            <h6>{job.location}</h6>
                        </div>

                        <div className="col-sm-4 col-md-4 col-lg-4" >
                            <button class="btn btn-primary myConnectionButton"
                                style={{ 'float': 'right', 'width': '50%' }} id={job._id} onClick={() => this.handleAppliedJob(job._id)} data-toggle="modal" data-target="#exampleModalApply">Apply</button>
                            <div class="modal fade" id="exampleModalApply" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                {appliedModal}
                            </div>

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

                <Login />
                <div class="row myNetworkBackground">

                    {/* column 1- This is the code for Saved Jobs */}

                    <div class="col-sm-8 col-md-8 col-lg-8">
                        <div class="card myInvitations">
                            <div class="card-title ">
                                <h4>Saved Jobs({this.state.savedJobs})</h4>
                                <hr></hr>
                                {displaySavedJobs}
                            </div>
                        </div>
                    </div>

                    {/* column 2-This is the code for applied Jobs */}
                    <div class="col-sm-4 col-md-4 col-lg-4" >
                        <div class="myadsborder">
                            <div className="row">
                                <div class="col-sm-8 col-md-8 col-lg-8" style={{ 'textAlign': 'left' }}>
                                    Applied Jobs
                                    </div>
                                <div class="col-sm-4 col-md-4 col-lg-4" style={{ 'textAlign': 'right' }}>
                                    <a href="/appliedJobs">See all</a>
                                </div>
                            </div>
                            <hr></hr>
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

export default savedJobs;