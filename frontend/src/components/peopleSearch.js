import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import _ from "lodash";
import picDS from '../assets/images/PicDS.png'
import { ROOT_URL } from '../constants/constants';
import Navbar from './Navbar';

// import {ROOT_URL} from '../constants/constants';

var swal = require('sweetalert')


class peopleSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleResult: null,
            filteredPeopleResult: null,
            searchName: null,
            msgBody : null
        }
    }

    componentDidMount() {
        var headers = new Headers()
        axios.defaults.withCredentials = true;


        if (this.props.location.state && this.props.location.state.searchedName) {

            const data = {
                username: this.props.location.state.searchedName
            }
            if (localStorage.getItem("userId")) {
                const id = localStorage.getItem("userId")
                axios.post(`${ROOT_URL}/user/${id}/search/`, data)
                    .then(response => {
                        if (response.status === 200) {
                            this.setState({
                                peopleResult: response.data.info,
                                filteredPeopleResult: response.data.info
                            })
                        }
                    })
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    requestConnection = (e) => {
        console.log("requesting connection to userId: ", e.target.id)
        const data = {
            sentBy: localStorage.getItem("userId"),
            sentTo: e.target.id
        }
        axios.post(`${ROOT_URL}/connection/request`, data)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    //window.location.reload()
                }
            })
    }

    acceptConnection = (e) => {
        console.log("Accept connection of userId: ", e.target.id)
        console.log("Current user", localStorage.getItem("userId"))
        const data = {
            connection: e.target.id
        }
        const id = localStorage.getItem("userId")
        var headers = new Headers()
        axios.defaults.withCredentials = true;

        axios.put(`${ROOT_URL}/connection/${id}/accept`, data)
            .then(response => {
                if (response.status === 200) {
                    console.log("Accepted: ", response.data)
                    //window.location.reload()
                } else {
                    console.log("failed")
                }
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    sendMessage = (e) => {
        const data = {
            member1: localStorage.getItem("userId"),
            member2: e.target.id,
            sentBy: localStorage.getItem("userId"),
            body: this.state.msgBody && this.state.msgBody
        }
        console.log(data)
        axios.defaults.withCredentials = true
        axios.post(`${ROOT_URL}/message`, data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.status) {
                        swal("Sent", "", "success")
                        //window.location.reload()
                    }
                } else {
                    swal("Something went wrong", "", "error")
                }
            })
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

        if (this.state.filteredPeopleResult) {
            var displayData = this.state.filteredPeopleResult.map(user => {
                console.log("Mapped user", user)
                if (user.isConnected == "none") {
                    var button = <div className="col-sm-3 col-md-3 col-lg-4" >
                    </div>
                } else if (user.isConnected == "false") {
                    var button = <div className="col-sm-3 col-md-3 col-lg-4" >
                        <button class="btn btn-primary myConnectionButton" style={{ 'float': 'right', 'width': '50%' }} id={user._id} onClick={this.requestConnection}>Connect</button>
                    </div>
                } else if (user.isConnected == "true") {
                    var button = <div className="col-sm-3 col-md-3 col-lg-4" >
                        <button type="button" class="btn btn-primary myConnectionButton" data-toggle="modal" data-target={"#exampleModalCenter" + user._id}>
                            Message
                  </button>
                        <div class="modal fade" id={"exampleModalCenter" + user._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Message to {user.name}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <textarea rows="10" cols="70" name="msgBody" onChange={this.handleChange}></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" id={user._id} onClick={this.sendMessage}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                } else if (user.isConnected == "pending") {
                    var button = <div className="col-sm-3 col-md-3 col-lg-4" >
                        <p class="myConnectionButton" style={{ 'float': 'right', 'width': '50%' }} id={user._id}>Pending</p>
                    </div>
                } else if (user.isConnected == "Accept") {
                    var button = <div className="col-sm-3 col-md-3 col-lg-4" >
                        <button class="btn btn-primary myConnectionButton" style={{ 'float': 'right', 'width': '50%' }} id={user._id} onClick={this.acceptConnection}>Accept</button>
                    </div>
                }
                return (
                    <div class="row userInvitations">
                        <div className="col-sm-6 col-md-6 col-lg-2">
                            <img src={ROOT_URL+"/"+user.profileImage} className="img-circle profileImage" />
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <Link to={{
                                pathname:"/viewProfile",
                                state:{
                                    applicant_id:user._id
                                }
                            }}>{user.name}</Link>
                            <h5>{user.email}</h5>
                            {/* <h5>Connections {connection.connections.length}</h5> */}
                        </div>
                        {button}
                    </div>
                )
            })

        }

        return (
            <div>
            <Navbar/>
                {/* <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': 'darkblue', "border-radius": "0px", marginBottom: "0px" }}>
                    hi
                </nav> */}
                <div className="myMargin"></div>
                <div class="row myNetworkBackground">


                    {/* column 1- This is the code for user connections */}

                    <div class="col-sm-8 col-md-8 col-lg-8">
                        <div class="card myInvitations">
                            <div class="card-title ">
                                <h4>{this.state.connectionsResult && this.state.connectionsResult.length} People Search</h4><br></br>

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
            </div>
        )
    }
}



export default peopleSearch;