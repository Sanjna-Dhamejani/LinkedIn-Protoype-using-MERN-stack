
import { ROOT_URL } from '../constants/constants';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
// import Stepper from 'react-stepper-horizontal'
import bulb from '../assets/images/postjobbulb.PNG'
import jobpostlogo from '../assets/images/jobpostlogo.PNG'

var swal = require('sweetalert')
var redirectVar = null;
var formData = "";
var jobIdfromrd = ""

class JobPosting extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));

        this.state = {
            myData: myData,
            editFlag: false,
            jobTitle: "",
            jobDescription: "",
            jobIndustry: "",
            jobEmploymentType: "",
            jobPostedDate: "",
            jobLocation: "",
            jobFunction: "",
            jobSkills: "",
            companyLogo: "",
            jobPostedBy: "",
            companyName: "",
            jobPosted: false,
            applyMethod1: "",
            jobId: "",
            jobDetails: "",
            companyLogoFile: null
        }
        this.PostJobHandler = this.PostJobHandler.bind(this);
        this.EmploymentTypeHandler = this.EmploymentTypeHandler.bind(this);
        this.applyMethodHandler = this.applyMethodHandler.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeLogo = (e) => {
        this.setState({
            companyLogoFile: e.target.files[0],
            companyLogo: e.target.files[0].name
        })
        // for(let size=0; size < e.target.files.length; size++){
        //     console.log('Selected file:', e.target.files[size]);
        //     let file = e.target.files[0];

        //     console.log("uploading screenshot file for:", this.props.useremail)
        //     formData = new FormData();
        //     formData.append('selectedFile', file);
        //     this.setState({
        //         companyLogo : e.target.files[size].name
        //     })
        //     axios.post(`http://localhost:3001/companylogo`, formData)
        //     .then((result) => {
        //       // access results...
        //     });
        // }
    }

    applyMethodHandler = (e) => {
        this.setState({
            applyMethod1: e.target.value
        })
    }

    EmploymentTypeHandler = (e) => {
        this.setState({
            jobEmploymentType: e.target.value
        })
    }

    PostJobHandler = (e) => {
        e.preventDefault();
        const data = {
            postedBy: localStorage.getItem("userId"),
            jobTitle: this.state.jobTitle,
            description: this.state.jobDescription,
            industry: this.state.jobIndustry,
            employmentType: this.state.jobEmploymentType,
            postedDate: Date(),
            location: this.state.jobLocation,
            jobFunction: this.state.jobFunction,
            required_skills: this.state.jobSkills,
            companyLogo: this.state.companyLogo,
            companyName: this.state.companyName,
            applyMethod: this.state.applyMethod1,
        }

        console.log("Data for updating Job : ", data)
        if (this.state.editFlag) {
            console.log(`${ROOT_URL}/job/${jobIdfromrd}`)
            axios.put(`${ROOT_URL}/job/${jobIdfromrd}`, data)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status) {
                            this.setState({
                                jobPosted: true
                            })
                            swal("Job Updated!", "Congratulations", "success")

                        }

                    }
                })
        }
        else {
            axios.post(`${ROOT_URL}/job`, data)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status) {


                            formData = new FormData();
                            formData.append('selectedFile', this.state.companyLogoFile);
                            console.log("response.data.info.result._id job posting", response.data.info.result._id)
                            axios.post(`${ROOT_URL}/${response.data.info.result._id}/companylogo`, formData)
                                .then((result) => {
                                    // access results...
                                });
                            this.setState({
                                jobPosted: true
                            })
                            swal("Job Posted!", "Congratulations", "success")

                        }

                    }
                })
        }
    }

    componentDidMount() {
        console.log("\n Printing the job id obtained from another place");
        if (this.props.location.state) {
            this.setState({
                editFlag: true
            })
            console.log(this.props.location.state.job_id);
            jobIdfromrd = this.props.location.state.job_id
            axios.get(`${ROOT_URL}/job/` + this.props.location.state.job_id)
                .then((response) => {
                    console.log("response.data of job get", response.data.info.result)
                    console.log("Response status of job get", response.data.status)
                    if (response.data.status === 1) {
                        this.setState({
                            jobDetails: response.data.info.result,
                            jobPostedBy: localStorage.getItem("userId"),
                            jobTitle: response.data.info.result.jobTitle,
                            jobDescription: response.data.info.result.description,
                            jobIndustry: response.data.info.result.industry,
                            jobEmploymentType: response.data.info.result.employmentType,
                            jobPostedDate: Date(),
                            jobLocation: response.data.info.result.location,
                            jobFunction: response.data.info.result.jobFunction,
                            jobSkills: response.data.info.result.required_skills,
                            companyLogo: response.data.info.result.companyLogo,
                            companyName: response.data.info.result.companyName,
                            applyMethod1: response.data.info.result.applyMethod

                        })
                    }
                })
        }
    }

    render() {

        if (this.state.jobPosted == true) {
            redirectVar = <Redirect to="/newsfeed" />
        }

        // if (!this.state.myData) {
        //     redirectVar = <Redirect to="/" />
        // }
        require('../styles/jobposting.css');
        return (
            <div>
                {redirectVar}
                <div class="stepwizard">
                    <div class="stepwizard-row setup-panel">
                        <div class="stepwizard-step">
                            <a href="#step-1" type="button" class="btn btn-primary btn-circle firstbtn">1</a>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-2" type="button" class="btn btn-default btn-circle secondbtn" disabled="disabled">2</a>
                        </div>
                        <div class="stepwizard-step">
                            <a href="#step-3" type="button" class="btn btn-default btn-circle" disabled="disabled">3</a>
                        </div>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div class="row setup-content" id="step-1">
                        <div className="page1background">
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
                            <hr></hr>
                            <div class="col-xs-12">
                                <div class="col-md-12">
                                    <div className="jobpostpage1">
                                        <h1 className="jobpostheadline1stpage">Reach the quality candidates you can't find anywhere else.</h1>
                                        <div className="containerjobpostpage1">
                                            <br></br>
                                            <div className="form-group">
                                                <input onChange={this.onChange} type="text" value={this.state.companyName} placeholder="Company" name="companyName" className="form-control jobpostpage1input" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Job title" onChange={this.onChange} value={this.state.jobTitle} name="jobTitle" className="form-control jobpostpage1input" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Job address or city" onChange={this.onChange} value={this.state.jobLocation} name="jobLocation" className="form-control jobpostpage1input" />
                                            </div>
                                            <button class="btn btn-primary nextBtn btn-lg page1jobpostbutton" type="button" ><b>Start job post</b></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row setup-content" id="step-2">
                        <div className="page2background">
                            <div class="col-xs-12">
                                <div class="col-md-12">
                                    <div className="jobpostingcontainer">
                                        <p className="headlinejobpost"><b>Step 1:</b> What job do you want to post?</p>
                                        <div className="jobpostform">
                                            <div className="row">
                                                <div className="form-group">
                                                    <p className="control-label jobpostrow1label">Company * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Job title * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location *</p>
                                                    <input type="text" name="companyName" onChange={this.onChange} value={this.state.companyName} placeholder="Company" className="form-control jobpostcompany" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" onChange={this.onChange} value={this.state.jobTitle} name="jobTitle" placeholder="Job title" className="form-control jobposttitle" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" onChange={this.onChange} value={this.state.jobLocation} name="jobLocation" placeholder="Job address or city" className="form-control jobpostlocation" required />
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="form-group">
                                                <p className="control-label jobpostrow1label">Job function (Select up to 3) * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Employment type *</p>
                                                <input type="text" name="jobfunction" onChange={this.onChange} value={this.state.jobFunction} name="jobFunction" placeholder="Add job function" className="form-control jobpostfunction" required />
                                            </div>
                                            <select className="form-control form-control-lg jobpostemployment" id="exampleFormControlSelect1"  onChange={this.EmploymentTypeHandler} required>
                                                <option value="">Choose One...</option>
                                                <option value="Part-Time" selected={this.state.jobEmploymentType == "Part-Time"}>Part-Time</option>
                                                <option value="Full-Time" selected={this.state.jobEmploymentType == "Full-Time"}>Full-Time</option>
                                            </select>
                                            <br></br>
                                            <div className="form-group">
                                                <p className="control-label jobpostrow1label">Company Industry (Select up to 3) *</p>
                                                <input type="text" onChange={this.onChange} value={this.state.jobIndustry} name="jobIndustry" placeholder="Add company industry" className="form-control jobpostfunction" required />
                                            </div>

                                            <br></br><br></br>
                                            <div className="form-group">
                                                <p className="control-label jobpostrow1label">Job description *</p>
                                                <input type="text" placeholder="" onChange={this.onChange} value={this.state.jobDescription} name="jobDescription" className="form-control jobpostdescription" required />
                                            </div>
                                            <br></br><br></br>
                                            <p className="control-label jobpostrow1label">Apply Method *</p>
                                            <select className="form-control form-control-lg applymethodjobpost" id="exampleFormControlSelect1"   onChange={this.applyMethodHandler} required>
                                                <option value="">Choose One...</option>
                                                <option value="Easy Apply" selected={this.state.applyMethod1 == "Easy Apply"}>Easy Apply </option>
                                                <option value="Custom Apply" selected={this.state.applyMethod1 =="Custom Apply"}>Custom Apply</option>
                                            </select>
                                            <br></br><br></br>
                                            <div className="form-group">
                                                <p className="control-label jobpostrow1label">How did you hear about us?</p>
                                                <input type="text" placeholder="Through a Friend/Advertisement/etc.." className="form-control jobpostfunction" />
                                            </div>
                                        </div>
                                        <button class="btn btn-primary nextBtn btn-lg" type="button" >Continue</button>
                                    </div>
                                    <div className="postjobtip">
                                        <img src={bulb} className="postjobtipimage"></img>
                                        <p><h4>Show your job to the right candidates</h4>
                                            Include more details such as relevant job functions, industries, and seniority level to help us advertise your job post to qualified candidates and recommend matches for you to reach out to.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row setup-content" id="step-3">
                        <div className="page2background">
                            <div class="col-xs-12">
                                <div class="col-md-12">
                                    <div className="jobpostingcontainerlast">
                                        <p className="headlinejobpost"><b>Step 2:</b> What are the right qualifications and budget for your job?</p>
                                        <div className="jobpostform">
                                            <div className="form-group">
                                                <p className="control-label jobpostrow1label">What are some of the skills needed for this job? *</p>
                                                <input type="text" onChange={this.onChange} value={this.state.jobSkills} name="jobSkills" placeholder="Accounting, Business Analysis, Communication, etc.." className="form-control jobpostfunction" required />
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <div className="form-group">
                                                <p className="control-label jobpostrow1label">How many years of relevant experience are you looking for? *</p>
                                                <input type="text" name="jobpostexperience" placeholder="1, 2, 3 .. years of experience." className="form-control jobpostfunction" />
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <div className="form-group">
                                                <p className="control-label jobpostrow1label">What level of education are you looking for? </p>
                                                <input type="text" name="companyindustry" placeholder="High School / Diploma" className="form-control jobpostfunction" />
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <div className="form-group">
                                                <p className="control-label jobpostrow1label">Daily Budget? </p>
                                                <input type="text" name="postjobbudget" placeholder="0 $" className="form-control jobpostfunction" />
                                            </div>
                                            <br></br>
                                            <br></br>
                                            <p className="control-label jobpostrow1label">Upload Photo *</p>
                                            <div className="companylogoupdate">
                                                <label for="uploadpic" name="description" onChange={this.onChange} multiple className="btn btn-warning" style={{ margin: "0% 0% 0% 3.2%", height: "54px", width: "40%" }}><h4>Click here to upload Company Logo</h4></label>
                                                <input type="file" id="uploadpic" className="hidethis" multiple name="selectedFile" onChange={this.onChangeLogo} />
                                            </div>
                                        </div>
                                        <br></br>
                                        <button class="btn btn-primary btn-lg finishpostjob" onClick={this.PostJobHandler} type="submit" ><b>Post My Job</b></button>
                                    </div>
                                    <div className="postjobtippage3">
                                        <img src={bulb} className="postjobtipimage"></img>
                                        <p><h4>Improve the quality of your applications</h4>
                                            Increase the quality of your candidates by defining your job audience so that you can help us get your job in front of the right people.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        )
    }

}

export default JobPosting;