import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import myNetwork from './myNetwork';
import connections from './connections';
import savedJobs from './savedJobs';
import appliedJobs from './appliedJobs';

import Navbar from './Navbar';
import Messaging from './messaging';
import homepage from './homepage';
import Profilelocation from './profilelocation';
import profileType from './profileType';
import Newsfeed from './newsfeed';
import UserDelete from './userdelete';
import JobPosting from './jobposting';
import JobSearch from './jobsearch';
import PeopleSearch from './peopleSearch'
import Profile from './profile'
import viewProfile from './viewProfile';
import JobApplicantsList from './jobApplicantsList';
import JobListing from './jobListing';
import Graphs from './graphs.js';
import ApplicantGraph from './applicantgraph'
import searchResults from './searchResults'


// import TryPDF from './pdfTrial';
import TryPDF from './PDF'
import ProfileView from './profileView';
class Main extends Component {
    render() {
        return (
            <div>

                <Route exact path="/myNetwork" component={myNetwork} />
                <Route exact path="/connections" component={connections} />
                <Route exact path="/savedJobs" component={savedJobs} />
                <Route exact path="/appliedJobs" component={appliedJobs} />
                <Route exact path="/messaging" component={Messaging} />
                <Route exact path="/Navbar" component={Navbar} />

                <Route exact path="/messaging" component={Messaging} />    
                <Route exact path="/" component={homepage} />
                <Route exact path="/profilelocation" component={Profilelocation} />
                <Route exact path="/newsfeed" component={Newsfeed} />
                <Route exact path="/user/delete" component={UserDelete} />
                <Route exact path="/job/post" component={JobPosting} />
                <Route exact path="/jobs/" component={JobSearch} />
                <Route exact path="/peopleSearch/" component={PeopleSearch} />
                <Route exact path="/profile" component={Profile} />

                
                <Route exact path="/profileType/" component={profileType} />
                <Route exact path="/viewProfile/" component={viewProfile} />
				<Route exact path="/job/applicants" component={JobApplicantsList}/>
                <Route exact path="/job/list" component={JobListing} />
                <Route exact path="/user/graphs" component={Graphs} />
                <Route exact path="/applicantgraph" component={ApplicantGraph} />
                <Route exact path="/pdftry" component={TryPDF} />
                <Route exact path="/profile/view" component={ProfileView} />
                <Route exact path="/searchResults" component={searchResults} />

                {/* <Route path="/TravelerLogin" component={Login} /> */}

            </div>
        )
    }
}
//Export The Main Component
export default Main;