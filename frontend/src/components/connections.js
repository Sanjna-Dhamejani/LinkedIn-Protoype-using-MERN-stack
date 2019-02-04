import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import _ from "lodash";
import { Redirect } from 'react-router';

import { ROOT_URL } from '../constants/constants';
import Navbar from './Navbar'

import picDS from '../assets/images/PicDS.png'
// import { ROOT_URL } from '../constants/constants';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class connections extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     userConnections : "205",    //number of connections user have
        //     userConnections : "20",
        //     userName : "Alex White",
        //     userInfo : "Student at San Jose State University",
        //     userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"
        // }
        this.state = {
            connectionsResult: null,
            filteredConnectionsResult: null,
            searchName: null,
            numPages: null,
            pageNumber: 1
        }
    }

    componentDidMount() {
        var headers = new Headers()
        axios.defaults.withCredentials = true;

        if (localStorage.getItem('userId')) {
            const id = localStorage.getItem('userId')
            axios.get(`${ROOT_URL}/connection/${id}/getConnections`)
                .then(response => {
                    if (response.status === 200) {
                        console.log("Connections results: ", response.data)
                        this.setState({
                            connectionsResult: response.data.info.connections,
                            filteredConnectionsResult: response.data.info.connections
                        }, () => {
                            console.log("Filtered Result: ", this.state.filteredConnectionsResult)
                        })
                    }
                })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    filterResult = () => {
        console.log("filtering result")
        if (this.state.searchName) {
            const oldList = this.state.connectionsResult
            const searchName = this.state.searchName
            this.setState({
                filteredConnectionsResult: _.filter(oldList, function (o) { return (o.fname.toLowerCase().includes(searchName.toLowerCase()) || o.lname.toLowerCase().includes(searchName.toLowerCase())) })
            }, () => {
                console.log("After Filter ", this.state.filteredConnectionsResult)
            })
        }
    }

    clearFilter = () => {
        console.log("Clearing filter")
        this.setState({
            searchName: "",
            filteredConnectionsResult: this.state.connectionsResult
        })
    }

    onDocumentLoadSuccess = (numPages) => {
        console.log("Successfully loaded")
        this.setState({numPages})
    }



    render() {
        require('../styles/connections.css');
        let redirect = null;

        let showMessages = (e) => {
            console.log("Id is:", e.target.id)
            return (
                <Redirect to="/messaging"></Redirect>
            )
        }

        if (this.state.filteredConnectionsResult) {
            var displayData = this.state.filteredConnectionsResult.map(connection => {
                console.log("Mapped connection", connection)
                return (
                    <div class="row userInvitations">
                        <div className="col-sm-6 col-md-6 col-lg-2">
                            <img src={connection.profileImage} className="img-circle profileImage" />
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <h4>{connection.fname + " " + connection.lname}</h4>
                            <h5>{connection.email}</h5>
                            <h5>{connection.headline}</h5>
                            {/* <h5>Connections {connection.connections.length}</h5> */}
                        </div>

                        <div className="col-sm-3 col-md-3 col-lg-4" >
                            <Link to="/messaging" class="btn btn-primary myConnectionButton" style={{ 'float': 'right', 'width': '50%' }} id={connection._id}>Message</Link>
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-1">
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" data-toggle="dropdown" style={{ 'float': 'left', 'font-size': '150%' }}>...</a>
                                <ul class="dropdown-menu">
                                    <li><a>Remove Connection</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })

        }

        return (
            <div>
                
                <Navbar/>
                <div className="myMargin"></div>
                <div class="row myNetworkBackground">


                    {/* column 1- This is the code for user connections */}

                    <div class="col-sm-8 col-md-8 col-lg-8">
                        <div class="card myInvitations">
                            <div class="card-title ">
                                <h4>{this.state.connectionsResult && this.state.connectionsResult.length} Connections</h4><br></br>

                                <div className="row aligntextleft">
                                    <div class="col-sm-2 col-md-2 col-lg-2" style={{ 'textAlign': 'right' }}>
                                        <h5>Sort By:</h5>
                                    </div>

                                    <div class="col-sm-3 col-md-3 col-lg-3">
                                        <div class="dropdown">
                                            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Recently added
                                                <span class="caret"></span></button>
                                                <ul class="dropdown-menu">
                                                    <li class="dropdown-header">Recently Added</li>
                                                    <li><a href="#">First name</a></li>
                                                    <li><a href="#">Last Name</a></li>
                                                </ul>
                                            </div>
                                            
                                        </div>
                                    
                                        <div class="col-sm-4 col-md-4 col-lg-4" style={{'textAlign':'right', 'height':'100%','marginTop':'0.5%'}}>
                                            <input type="text" placeholder="Search.." name="search"/>
                                            <button type="submit" className="submitbutton"><i class="fa fa-search"></i></button> 
                                        </div>
                                        
                                        <div class="col-sm-3 col-md-3 col-lg-3">
                                        <a><h5>Clear Search</h5></a>
                                        </div>

                                    </div>

                                    <div class="col-sm-4 col-md-4 col-lg-4" style={{ 'textAlign': 'right', 'height': '100%', 'marginTop': '0.5%' }}>
                                        <input type="text" placeholder="Search.." value={this.state.searchName} name="searchName" onChange={this.handleChange} />
                                        <button type="submit" className="submitbutton" onClick={this.filterResult}><i class="fa fa-search"></i></button>
                                    </div>

                                    <div class="col-sm-3 col-md-3 col-lg-3">
                                        <a onClick={this.clearFilter}><h5>Clear</h5></a>
                                    </div>

                                </div>

                                <hr></hr>

                                {displayData}

                            </div>
                            {/* <Document
                                file={"${ROOT_URL}/uploads/Lab2_Report_013007280.pdf"}
                                onLoadSuccess={this.onDocumentLoadSuccess}
                            >
                                <Page pageNumber={this.state.pageNumber} />
                            </Document> */}
                        </div>
                    </div>

                    {/* column 2-This is the code for ads */}
                    <div class="col-sm-4 col-md-4 col-lg-4" >
                        <div class="myadsborder">
                            <p>Manage Synced and imported contacts</p><br></br>
                            <h6>Your contact import is ready</h6>
                            <p>Connect with your contacts and never lose touch</p>
                            <button class="btn btn-primary myConnectionButton">Continue</button>
                        </div>

                        <div class="card myads">
                            <div class="card-title ">
                                <h5 style={{ 'float': 'left' }}>Promoted</h5><br></br>
                                <hr></hr>
                                <div className="row">
                                    <div class="col-sm-2 col-md-2 col-lg-2" >
                                        <img style={{ 'width': '200%', 'height': '200%' }} src={picDS} />
                                    </div>
                                    <div class="col-sm-10 col-md-10 col-lg-10" style={{ 'float': 'left' }}>
                                        <a>Data Science masters</a>
                                        <p> Earn your Master's in Data Science from Syracuse. GRE waivers available. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="myadsborder">
                            <a>About</a> <a> Help Center </a> <a> Privacy & Terms</a>
                            <br></br><a>Advertising</a>  <a> Business Services</a>
                            <br></br><a>Get the LinkedIn app</a> <a>  More</a><br></br>
                            <a>LinkedIn Corporation © 2018</a>
                        </div>
                    </div>

                </div>
        )
    }
}



export default connections;