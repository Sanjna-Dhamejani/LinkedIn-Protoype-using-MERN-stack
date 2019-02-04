import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
// import { Document, Page } from 'react-pdf/dist/entry.parcel';
import { Page, Document } from "react-pdf";
import PDF from 'react-pdf-js-infinite';
// import '../styles/jobposting.css'
import Stepper from 'react-stepper-horizontal'
import noJobsImage from '../assets/images/NoJobListings.PNG'
import gifticon from '../assets/images/gift-icon.png'
import pdffile from '../assets/pdfs/HonestyPledge.pdf'
import jobpostlogo from '../assets/images/jobpostlogo.PNG'
import { ROOT_URL } from '../constants/constants';


class JobApplicantsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            information: [],
            numPages: null,
            pageNumber: 1,
            resumeFlag: false,
            resumefileURL: ''
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        console.log("Inside onDocumentLoadSuccess method");
        this.setState({ numPages });
    };

    goToPrevPage = () => {
        if (this.state.numPages != 1) {
            this.setState(state => ({ pageNumber: this.state.pageNumber - 1 }));
        }
    }

    goToNextPage = () => {
        if (this.state.numPages != 1) {
            this.setState(state => ({ pageNumber: this.state.pageNumber + 1 }));
        }
    }

    ViewResume = (e) => {
        console.log("View resume button pressed");
        console.log("e : " + e);
        this.setState({
            resumeFlag: !this.state.resumeFlag,
            resumefileURL: e
        })
    }

    componentDidMount() {

        const job_id = this.props.location.state.job_id

        axios.defaults.withCredentials = true;
        // axios.get(`${ROOT_URL}/job/5c0315515e24fc5d383ac47e/applications`)
        axios.get(`${ROOT_URL}/job/` + job_id + `/applications`)
            .then((response) => {
                console.log("Response received from backend");

                if (response.data.status == 1) {
                    this.setState({
                        information: response.data.info
                    })
                }
                else {
                    console.log("Some error occured in the query execution");
                }

            });

    }

    render() {
        require('../styles/jobposting.css')
        require('../styles/jobApplicantsList.css');

        const pageNumber = this.state.pageNumber;
        const numPages = this.state.numPages;

        // const fileURL = `${ROOT_URL}/uploads/cmpe_255.pdf`;

        console.log(" ---- Printing this.state.information ----");
        console.log(this.state.information);

        let noApplicantsDisplay = null;
        let ApplicantsDisplay = null;
        let resumeDisplay = null;
        if (this.state.information.length == 0) {
            noApplicantsDisplay = (
                <div class="center">
                    <br /><br />
                    <center>
                        <img src={noJobsImage}></img>
                        <br></br>
                        <p class="para">No applicants have applied yet</p>
                    </center>
                </div>
            )
        }

        else if (this.state.information.length > 0) {

            if (this.state.resumeFlag) {
                resumeDisplay = (
                    <div>

                        <div style={{ width: 600 }}>
                            <Document
                                file={this.state.resumefileURL}
                                onLoadSuccess={this.onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} width={600} />
                            </Document>
                        </div>

                        <nav>
                            <button class="prev-button" onClick={this.goToPrevPage}> Prev </button>
                            <button class="prev-button" onClick={this.goToNextPage}> Next </button>
                        </nav>

                        <p class="pagenumber-display">
                            Page {pageNumber} of {numPages}
                        </p>



                    </div>
                )
            }

            ApplicantsDisplay = this.state.information.map(applist => {
                if (applist.applicant[0]) {
                    //console.log(applist.applicant[0] == true)
                    const fileURL = `${ROOT_URL}/` + applist.applicant[0].resume
                    return (
                        <div>
                            <div class="job-listing">
                                <Link class="joblisttitle" to={{ pathname: '/viewProfile', state: { applicant_id: applist.applicant[0]._id } }}>{applist.applicant[0].fname} {applist.applicant[0].lname}</Link>
                                <p class="paragraph1">Email id : {applist.applicant[0].email && applist.applicant[0].email}</p>
                                <p class="paragraph">Ethnicity : {applist.ethnicity && applist.ethnicity}</p>
                                <p class="paragraph">Disabled : {applist.isDisabled.toString()}</p>
                                {/* <p class = "paragraph">Resume : </p> */}
                                <button class="btn btn-primary resume-button" onClick={() => { this.ViewResume(fileURL) }} name="ResumeButton" value={fileURL}>
                                    <span>View Resume</span>
                                </button>

                                {resumeDisplay}

                                {/* <div style={{ width: 600 }}>
                                <Document
                                    file = {fileURL}
                                    // file = "http://localhost:3001/uploads/HonestyPledge.pdf"
                                    onLoadSuccess={this.onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={pageNumber} width={600} height={800} />
                                </Document>
                            </div>
                            <p>
                                 Page {pageNumber} of {numPages}
                            </p> */}
                            </div>
                            <hr class="linebreak"></hr>
                        </div>
                    )
                }

            })
        }

        return (
            <div>
                <div class="row" id="mainbody">

                    <div className="JobPostHeader">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <img src={jobpostlogo} class="navbar-brand" style={{ width: "10%", height: "49px", padding: "5px 20px 0px 10px", margin: ".5% 0% 0% 13%" }} />
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div class="navbar-nav jobpostlinksnavbar">
                                    <Link to="/job/list" className="nav-item linkinjobpostheader"><b>HOME</b> &nbsp; &nbsp; &nbsp;</Link>
                                    <Link to="/job/post" className="nav-item active linkinjobpostheader"><b>POST A JOB</b> &nbsp; &nbsp; &nbsp; <span class="sr-only">(current)</span></Link>
                                    <Link to="/newsfeed" className="nav-item linkinjobpostheader"><b>LINKEDIN.COM</b> </Link>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div class="container left-content">
                        <br />
                        <p class="title">&nbsp;&nbsp;&nbsp;Applicants</p>
                        <hr class="linebreak"></hr>
                        {noApplicantsDisplay}
                        {ApplicantsDisplay}
                        <br /><br />
                    </div>
                </div>
            </div>
        )
    }

}

export default JobApplicantsList;