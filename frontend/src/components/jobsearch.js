import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
// import "../styles/jobsearch.css";
import Navbar from './Navbar'
import job1 from '../assets/images/job1.png'
import job2 from '../assets/images/job2.png'
import job3 from '../assets/images/job3.png'
import job4 from '../assets/images/job4.jpg'
import job5 from '../assets/images/job5.png'
import job6 from '../assets/images/job6.png'
import job7 from '../assets/images/job7.png'
import job8 from '../assets/images/job8.jpg'

class JobSearch extends Component {
  constructor(props) {
    super(props);
    this.state={
      jobTitle:"",
      location:""
    }
    this.handleJobTitle = this.handleJobTitle.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
  }

    handleJobTitle = (e) => {
        this.setState({
            jobTitle : e.target.value
        })
    }

    handleLocation = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    render(){
      require('../styles/jobsearch.css')
        return(
            <div>
                <Navbar/>
                      <div className="jobs-landing-header-container pad-top-1-pc">
                       <form>
                            <input type = "text" onChange = {this.handleJobTitle} className = "jobs" placeholder = " Search Jobs" required></input>
                            &nbsp;&nbsp;
                            
                            <input type = "text" onChange = {this.handleLocation} className = "location" placeholder = " Search Location" required></input>
                            &nbsp;&nbsp;
                            <Link to ={{pathname: '/searchResults', state:{jobTitle:this.state.jobTitle, jobLocation : this.state.location}}} className="btn btn-outline-default white-outline btn-md searchbox-submit" type="button"><b>Search</b></Link>
                      </form>
                   </div>

                  

                   <div className = "jobs-landing-main-bg">

                        <div className="row mt-3 pull-center-1 pull-center-2">
                                    
                            <div className="jobs-landing-bar-container ">
                              <div className= "links-to-savedandapplied">
                                   <Link to = "/savedJobs"> <span className="pad-1-pc">My Saved Jobs &nbsp;&nbsp; | &nbsp;&nbsp;</span> </Link>
                                  <Link to ="/appliedJobs">  <span className="pad-2-pc">My Applied Jobs &nbsp;&nbsp; | &nbsp;&nbsp;</span></Link>
                                    <span className="pad-3-pc">Career Interests</span>
                                    <span className="pad-6-pc">LinkedIn Salary  &nbsp;&nbsp; | &nbsp;&nbsp;</span>
                                    <span className="pad-8-pc">Looking for talent? &nbsp;&nbsp;</span>
                                    <span className="pad-3-pc"><button class="btn linkedin-post-job" type="submit"><b>Post a Job</b></button></span>
                                  </div>

                            </div>                
                        </div>

        <div class="album py-5 bg-light">
        <div class="container-jobsearch">

        
            <h4 className="JobsInterestedJobSearch">Jobs you may be interested in</h4>
          <b style={{'margin-left':'2%'}}>Because you viewed</b>
          <p style={{'margin-left':'2%'}}>Machine Learning Intern at Adobe</p>
        <div class="row jobsearchrow">
        <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src={job1} alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Data Scientist Intern</b></p>
              <p>WeWork</p>
              <p>New York, NY, US</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">3 days ago</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc jobpostcard">
              <center><img class="card-img-top" src={job2} alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Data Engineer</b></p>
              <p>Amazon Lab126</p>
              <p>Sunnyvale, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">6 days ago</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src={job3} alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>ML Scientist Intern</b></p>
              <p>Adobe</p>
              <p>San Francisco, CA, US</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">7 days ago</small>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-3" style={{'margin-bottom':'4%'}}>
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src={job4} alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Data Modeler</b></p>
              <p>Nisum</p>
              <p>San Francisco, California</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">3 days ago</small>
                </div>
              </div>
            </div>
          </div>
          <b style={{'margin-top':'2%'}}>Based on your Profile and Career interests</b>
          <p style={{'margin-bottom':'4%'}}>Any job title • Any location • Any industry • 0 to 10,000+ employees ... Update Career interests</p>
          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src={job5} alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Data Quality Analyst</b></p>
              <p>Oracle</p>
              <p>Redwood City, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">1 week ago</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src={job6} alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Android Developer</b></p>
              <p>Guidebook Inc.</p>
              <p>San Jose, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">3 weeks ago</small>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src={job7} alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Software Developer</b></p>
              <p>Amiseq Inc.</p>
              <p>San Bruno, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">1 day ago</small>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div className="card mb-3 shadow-sm pad-3-pc">
              <center><img class="card-img-top" src={job8} alt="Card image cap"/></center>
              <div class="card-body center-content">
              <p><b>Engineering Intern</b></p>
              <p>Esurance</p>
              <p>San Francisco, CA, USA</p> 
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">2 weeks ago</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

      
                  
          </div>

          </div>
       
    // </div>
  );
}
}


//mapStateToProps

const mapStateToProps  = state =>({
    saveSearchFieldToStore : state.jobSearchFieldsStateStore
  });
  
  
//export default JobsLandingPage;
export default connect(mapStateToProps, {})(JobSearch);