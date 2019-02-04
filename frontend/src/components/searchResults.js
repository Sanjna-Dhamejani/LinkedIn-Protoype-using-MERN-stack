
import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ROOT_URL } from '../constants/constants';
import Navbar from './Navbar';
import _ from "lodash";
const userID = localStorage.getItem("userId")
var swal = require('sweetalert');

//const userID = "5c06b8010732546084383d17";//localStorage.getItem("userId")

class searchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //search using these two on component did mount
            /* job_title: "Java Developer",           
            location: "San Jose", */
            job_title: this.props.location.state.jobTitle,
            location: this.props.location.state.jobLocation,
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

            testProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",
            userProfileImage: "",

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
        this.handleClickedViewJob = this.handleClickedViewJob.bind(this);
        this.handleSavedJob = this.handleSavedJob.bind(this);
        this.handleAppliedJob = this.handleAppliedJob.bind(this);
        this.FilterResults = this.FilterResults.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDiversity = this.handleDiversity.bind(this);
        this.handleSponsership = this.handleSponsership.bind(this);
        this.handleDisability = this.handleDisability.bind(this);
        this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    FilterResults = (e) => {
        // Filtered Company Name
        if (this.state.filtercompanyname && !this.state.filterindustry && !this.state.filterjobtype) {
            const oldList = this.state.jobResults
            const filcompanyName = this.state.filtercompanyname
            console.log("company name: ",filcompanyName)
            this.setState({
                filteredList: _.filter(oldList, function (o) { return o.companyName.toLowerCase().includes(filcompanyName.toLowerCase()) })
            })
            console.log("Filtered List for company name: ", this.state.filteredList)
        }
        // Filtered Industry
        else if (!this.state.filtercompanyname && this.state.filterindustry && !this.state.filterjobtype) {
            const oldList = this.state.jobResults
            const filindustry = this.state.filterindustry
            this.setState({
                filteredList: _.filter(oldList, function (o) { return o.industry.toLowerCase().includes(filindustry.toLowerCase()) })
            })
            console.log("Filtered List for industry: ", this.state.filteredList)
        }
        // Filtered JobType
        else if (!this.state.filtercompanyname && !this.state.filterindustry && this.state.filterjobtype) {
            const oldList = this.state.jobResults
            const filjobtype = this.state.filterjobtype
            console.log(oldList)
            this.setState({
                filteredList: _.filter(oldList, function (o) { return o.employmentType.toLowerCase().includes(filjobtype.toLowerCase()) })
            })
            console.log("Filtered List for Employment Type: ", this.state.filteredList)
        }
        // Filtered company Name and industry
        else if (this.state.filtercompanyname && this.state.filterindustry && !this.state.filterjobtype) {
            const oldList = this.state.jobResults
            const filcompanyName = this.state.filtercompanyname
            const filindustry = this.state.filterindustry
            var filteredList = _.filter(oldList, function (o) { return o.companyName.toLowerCase().includes(filcompanyName.toLowerCase()) })
            filteredList = _.filter(filteredList, function (o) { return o.industry.toLowerCase().includes(filindustry.toLowerCase()) })
            this.setState({
                filteredList: filteredList
            })
            console.log("Filtered List for company name and industry: ", this.state.filteredList)
        }
        // Filtered according to company name and job type
        else if (this.state.filtercompanyname && !this.state.filterindustry && this.state.filterjobtype) {
            const oldList = this.state.jobResults
            const filcompanyName = this.state.filtercompanyname
            const filjobtype = this.state.filterjobtype
            var filteredList = _.filter(oldList, function (o) { return o.companyName.toLowerCase().includes(filcompanyName.toLowerCase()) })
            filteredList = _.filter(filteredList, function (o) { return o.employmentType.toLowerCase().includes(filjobtype.toLowerCase()) })
            this.setState({
                filteredList: filteredList
            })
            console.log("Filtered List for company name and job type: ", this.state.filteredList)
        }
        // Filtered according to industry and job type
        else if (!this.state.filtercompanyname && this.state.filterindustry && this.state.filterjobtype) {
            const oldList = this.state.jobResults
            const filindustry = this.state.filterindustry
            const filjobtype = this.state.filterjobtype
            var filteredList = _.filter(oldList, function (o) { return o.industry.toLowerCase().includes(filindustry.toLowerCase()) })
            filteredList = _.filter(filteredList, function (o) { return o.employmentType.toLowerCase().includes(filjobtype.toLowerCase()) })
            this.setState({
                filteredList: filteredList
            })
            console.log("Filtered List for industry and job type: ", this.state.filteredList)
        }else{
            const oldList = this.state.jobResults
            const filcompanyName = this.state.filtercompanyname
            const filindustry = this.state.filterindustry
            const filjobtype = this.state.filterjobtype
            var filteredList = _.filter(oldList, function (o) { return o.industry.toLowerCase().includes(filindustry.toLowerCase()) })
            filteredList = _.filter(filteredList, function (o) { return o.employmentType.toLowerCase().includes(filjobtype.toLowerCase()) })
            filteredList = _.filter(oldList, function (o) { return o.companyName.toLowerCase().includes(filcompanyName.toLowerCase()) })
            filteredList = 
            this.setState({
                filteredList: filteredList
            })
            console.log("Filtered List for industry and job type: ", this.state.filteredList)
        }
        console.log("Filtered List finally : ", this.state.filteredList)
    }

    clearFilter = (e) => {
        const oldList = this.state.jobResults
        this.setState({
            filtercompanyname: "",
            filterindustry: "",
            filterjobtype: "",
            filteredList: oldList
        })
        console.log("Filtered List: ", this.state.filteredList)
    }

    handleDiversity = (e) => {
        console.log(e.target.value);
        this.setState({
            applyJobDiversity: e.target.value
        })
    }

    handleSponsership = (e) => {

        this.setState({
            applyJobSponsership: e.target.value
        })

    }
    handleDisability = (e) => {
        this.setState({
            applyJobDisability: e.target.value
        })
    }

    handleApplicationSubmit = (e) => {

        //const userID = "5c06a1ef06b29e419cf927d9"; //localStorage.getItem(userId);
        const isDisable = false;
        if (this.state.applyJobDisability == "Yes") {
            isDisable = true;
        }
        axios.defaults.withCredentials = true;
        const data = {
            jobId: this.state.clickedJobId,
            howDidyouHear: this.state.applyJobHowDidYouHear,
            isDisabled: isDisable,
            resume: this.state.applyJobResume,
            ethnicity: this.state.applyJobDiversity,
            sponsership: this.state.applyJobSponsership
        }
        axios.post(`${ROOT_URL}/user/${userID}/apply`, data)

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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillMount() {

        this.setState({
            filtercompanyname: "",
            filterindustry: "",
            filterjobtype: ""
        })
    }

    componentDidMount() {

        window.scrollTo(0, 0);
        axios.defaults.withCredentials = true;
        const data = {
            job_title: this.state.job_title,
            location: this.state.location,
            userId: userID
        }
        axios.post(`${ROOT_URL}/job/search/`, data)

            .then(res => {
                console.log("------on load-------", res.data.info.result);

                this.setState({
                    filteredList: this.state.filteredList.concat(res.data.info.result),
                    jobResults: this.state.jobResults.concat(res.data.info.result)
                });
                console.log("The filtered list is : " + JSON.stringify(this.state.filteredList));
            })
            .catch(err => {
                console.log("Error in job search get" + err);
            });
    }

    handleClickedViewJob = (e) => {
        console.log("The jobid clicked is: ", e);

        this.setState({
            clickedJobId: e
        });

        axios.get(`${ROOT_URL}/job/${e}`)
            .then(res => {
                console.log("------on load-------", res.data.length);
                console.log("------on load-------", res.data.info.result);
                this.setState({
                    clickedAjob: true,
                    clickedJobTitle: res.data.info.result.jobTitle,
                    clickedDescription: res.data.info.result.description,
                    clickedIndustry: res.data.info.result.industry,
                    clickedEmploymentType: res.data.info.result.employmentType,
                    clickedPostedDate: res.data.info.result.postedDate,
                    clickedLocation: res.data.info.result.location,
                    clickedJobFunction: res.data.info.result.jobFunction,
                    clickedCompanyLogo: res.data.info.result.companyLogo,
                    clickedApplyMethod: res.data.info.result.applyMethod,
                    clickedPostedBy: res.data.info.result.postedBy

                });

            })
            .catch(err => {
                console.log("Error in job search get of clicked.");
            });
    }

    handleSavedJob = () => {

        // const userID = "5c06a1ef06b29e419cf927d9"; //localStorage.getItem(userId);
        const data = {
            jobId: this.state.clickedJobId
        }
        axios.post(`${ROOT_URL}/user/${userID}/save`, data)
            .then(res => {
                console.log("------on save-------", res.data.status);
                if (res.data.status == 1) {
                    this.setState({
                        isSaved: "The job is saved!"
                    });

                } else if (res.data.status == 0) {
                    this.setState({
                        isSaved: "The job is already saved."
                    });
                }
            })
            .catch(err => {
                console.log("Error in job save of clicked.");
            });
    }

    handleAppliedJob = () => {

        //const userID = "5c06a1ef06b29e419cf927d9"; //localStorage.getItem(userId);

        //  /:jobId/start_application

        axios.get(`${ROOT_URL}/user/${userID}`)
            .then(res => {

                console.log("------on getting user data for easy apply-------", res.data.info);

                axios.put(`${ROOT_URL}/user/${this.state.clickedJobId}/start_application`)
                    .then(res => {
                        console.log("------Updated counter-------");
                    })
                    .catch(err => {
                        console.log("Error in put start application.");
                    });

                if (this.state.clickedApplyMethod == "Easy Apply") {
                    console.log("--------------------------", res.data.info);

                    this.setState({
                        applyJobfname: res.data.info.fname,
                        applyJoblname: res.data.info.lname,
                        applyJobEmail: res.data.info.email,
                        applyJobAddress: res.data.info.address,
                        applyJobResume: res.data.info.resume,
                        userProfileImage: res.data.info.profileImage
                    });
                    console.log("--------------------------", this.state.applyJobfname);
                } else if (this.state.clickedApplyMethod == "Custom Apply") {
                    this.setState({
                        applyJobResume: res.data.info.resume
                    });
                }


            })
            .catch(err => {
                console.log("Error in getting user details.");
            });

    }

    render() {
        require('../styles/searchResults.css');

        let redirect = null;

        let DisplayJobList = null;
        let clickedJobInfo = null;
        let savedModal = null;
        let appliedModal = null;
        let clickedModal = null;

        DisplayJobList = (

            <div class="row userInvitations ">

                {/* {this.state.jobResults.map((jobResults, index) => ( */}
                {this.state.filteredList.map((jobResults, index) => (

                    <div key={index} onClick={() => this.handleClickedViewJob(jobResults._id)}>

                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <img src={ROOT_URL + "/" + jobResults.companyLogo} className=" profileImage" />
                        </div>

                        <div className="col-sm-9 col-md-9 col-lg-9 hoverEffect" >
                            <h4>{jobResults.jobTitle}</h4>
                            <h5>{jobResults.location}</h5>
                            <p>{jobResults.description}</p>
                        </div>

                    </div>
                ))}
            </div>
        )

        savedModal = (
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style={{ "textAlign": "center" }}>
                        <h5>{this.state.isSaved}</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        )

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
            </div >
        )

        if (!this.state.alreadyApplied) {
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
        }

        if (this.state.clickedAjob) {
            clickedJobInfo = (
                <div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <img src={ROOT_URL + "/" + this.state.clickedCompanyLogo} className=" profileImage" />
                    </div>

                    <div className="col-sm-9 col-md-9 col-lg-9 " >
                        <h3>{this.state.clickedJobTitle}</h3>
                        <h4>{this.state.clickedLocation}</h4>
                        <p>Posted on: {this.state.clickedPostedDate}</p>
                        <button className="savedButton" onClick={this.handleSavedJob} data-toggle="modal" data-target="#exampleModal">Save</button>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            {savedModal}
                        </div>

                        <button className="applyButton" onClick={this.handleAppliedJob} data-toggle="modal" data-target="#exampleModalApply">{this.state.clickedApplyMethod}</button>
                        <div class="modal fade" id="exampleModalApply" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            {appliedModal}
                        </div>

                        <br></br><br></br><hr></hr>
                        <h5>Job Description</h5>

                        <div className="row">
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <img src={ROOT_URL + "/" + this.state.clickedPostedBy.profileImage} className=" profileImage" />
                            </div>
                            <div className="col-sm-9 col-md-9 col-lg-9">
                                <h6>Posted By:</h6>
                                <p>{this.state.clickedPostedBy.fname} {this.state.clickedPostedBy.lname}</p>
                                <h6>Contact:</h6><p>{this.state.clickedPostedBy.email}</p>
                            </div>
                        </div>

                        <hr></hr>
                        <p>{this.state.clickedDescription}</p><br></br>
                        <h5>Employment Type</h5>
                        <p>{this.state.clickedEmploymentType}</p>
                        <h5>Industry</h5>
                        <p>{this.state.clickedIndustry}</p>
                        <h5>Job Function</h5>
                        <p>{this.state.clickedJobFunction}</p>

                    </div>
                </div>
            )
        }

        return (
            <div>

                <Navbar />

                <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': 'black', 'padding': ' 0%', 'backgroundColor': 'white', "border-radius": "0px", marginBottom: "0px" }}>
                    <h4 style={{ marginBottom: "-2%", marginLeft: '5%' }}>Search with Filters:</h4>
                    <input type="text" name="filtercompanyname" placeholder="Enter Company Name" onChange={this.handleChange} style={{ "border-radius": "4px", width: "205px", height: "2px", marginLeft: "20%", marginTop: "-200px" }}></input>
                    <input type="text" name="filterjobtype" placeholder="Enter Job Type" onChange={this.handleChange} style={{ "border-radius": "4px", width: "200px", height: "2px", marginLeft: "3%" }}></input>
                    <input type="text" name="filterindustry" placeholder="Enter Industry" onChange={this.handleChange} style={{ "border-radius": "4px", width: "200px", height: "2px", marginLeft: "3%" }}></input>
                    <button className="btn btn-default" onClick={this.FilterResults} style={{ marginLeft: "2%", height: "35px", width: "120px", "border-radius": "4px", "border": "0px", fontSize: "17px" }}>Filter </button>
                    <button className="btn btn-default" onClick={this.clearFilter} style={{ marginLeft: "0%", height: "35px", width: "120px", "border-radius": "4px", "border": "0px", fontSize: "17px" }}>Clear</button>
                </nav>
                <div class="row myNetworkBackground">
                    {/*column 1- This is the code for msg list */}
                    <div class="col-sm-5 col-md-5 col-lg-5 " >
                        <div class="card myConnections">
                            <div class="card-body msgListlowerheight">
                                {DisplayJobList}
                            </div>
                        </div>
                    </div>

                    {/* column 2- This is the code for msg display */}

                    <div class="col-sm-7 col-md-7 col-lg-7 ">
                        <div class="card myInvitations">
                            {clickedJobInfo}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default searchResults;