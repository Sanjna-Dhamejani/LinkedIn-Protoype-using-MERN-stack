import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './Navbar'
import linkedIn from '../assets/images/linkedIn.png'
import Axios from 'axios';
import { throws } from 'assert';
import { ROOT_URL } from '../constants/constants';
var swal = require('sweetalert')

class myNetwork extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     userConnections : "205",    //number of connections user have
        //     userInvitations : "20",
        //     userName : "Alex White",
        //     userInfo : "Student at San Jose State University",
        //     userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"
        // }
        this.state = {
            pendingConnectionsDetails: null,
            totalConnections: null
        }
    }

    componentDidMount() {

        console.log("Getting pending connections ")
        if (localStorage.getItem("userId")) {
            const id = localStorage.getItem("userId")
            var header = new Headers()
            axios.defaults.withCredentials = true;

            axios.get(`${ROOT_URL}/connection/${id}/getPendingConnections`)
                .then(response => {
                    if (response.status === 200) {
                        console.log("Result is: ", response.data.info.pendingConnections)
                        if (response.data.status) {
                            this.setState({
                                pendingConnectionsDetails: response.data.info.pendingConnections.pending_receive
                            })
                        } else {
                            //swal("Sorry","Something went wrong","error")
                        }
                    }
                })

            axios.get(`${ROOT_URL}/connection/${id}/getConnections`)
                .then(response => {
                    if (response.status === 200) {
                        console.log("Total connections are: ")
                        if (response.data.status) {
                            this.setState({
                                totalConnections: response.data.info.totalConnections
                            })
                        }
                    }
                })
        }
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
                    if (response.data.status) {
                        swal(response.data.msg, "New Connection Made", "success")
                        window.location.reload()
                    }
                } else {
                    swal(response.data.msg, response.data.info.error, "success")
                }
            })
    }

    render() {
        require('../styles/myNetwork.css');
        let redirect = null;

        let DisplayData = null;

        if (this.state.pendingConnectionsDetails) {
            var displayData = this.state.pendingConnectionsDetails.map(connection => {
                console.log("pending connections are: ", connection.fname)
                return (
                    <div class="row userInvitations">
                        <div className="col-sm-6 col-md-6 col-lg-2">
                            <img src={ROOT_URL + "/" + connection.profileImage} style={{ width: "50px", height: "50px" }} className="img-circle profileImage" />
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5">
                            <h4>{connection.fname + " " + connection.lname}</h4>
                            <h5>{connection.email}</h5>
                            <h5>{connection.headline}</h5>
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-2">
                            <a href="" style={{ 'float': 'right', 'font-size': '150%' }}>Ignore</a>
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <button class="btn btn-primary myConnectionButton" id={connection._id} onClick={this.acceptConnection}>Accept</button>
                        </div>
                    </div>
                )
            })
        }
        // DisplayData = (



        //     <div class="row userInvitations">
        //         <div className="col-sm-6 col-md-6 col-lg-2">
        //             <img src={this.state.userProfileImage} className="img-circle profileImage" />
        //         </div>
        //         <div className="col-sm-5 col-md-5 col-lg-5">
        //             <h4>{this.state.userName}</h4>
        //             <h5>{this.state.userInfo}</h5>
        //         </div>
        //         <div className="col-sm-2 col-md-2 col-lg-2">
        //             <a href="" style={{ 'float': 'right', 'font-size': '150%' }}>Ignore</a>
        //         </div>
        //         <div className="col-sm-3 col-md-3 col-lg-3">

        //             <button class="btn btn-primary myConnectionButton">Accept</button>
        //         </div>
        //     </div>


        // )


        return (
            <div>

                <Login />
                <div className="myMargin"></div>
                <div class="row myNetworkBackground">
                    {/*column 1- This is the code for user connections */}
                    <div class="col-sm-3 col-md-3 col-lg-3" >
                        <div class="card myConnections">
                            <div class="card-title myConnectionsUpper">
                                <h2 className="myConnectionFontColor">{this.state.totalConnections && this.state.totalConnections}</h2>
                                <h4>Your connections</h4>
                                <Link to="/connections"><h5 className="myConnectionFontColor">See All</h5></Link>

                            </div>
                            <div class="card-body myConnectionsLower">
                                <h5 class="card-title">Your contact import is ready</h5>
                                <p class="card-text">Connect with your contacts and never lose touch</p>
                                <button class="btn btn-primary myConnectionButton">Continue</button>
                                <br></br><br></br>
                                <p>More Options</p>
                            </div>
                        </div>
                    </div>

                    {/* column 2- This is the code for user invitations */}

                    <div class="col-sm-5 col-md-5 col-lg-5">
                        <div class="card myInvitations">
                            <div class="card-title ">
                                <h4>Invitations({this.state.pendingConnectionsDetails && this.state.pendingConnectionsDetails.length})<a style={{ 'float': 'right' }}>Manage All</a></h4>
                                <hr></hr>

                                {displayData}

                            </div>
                        </div>
                    </div>

                    {/* column 3-This is the code for ads */}
                    <div class="col-sm-4 col-md-4 col-lg-4" >
                        <div class="card myads">
                            <div class="card-title ">
                                <p style={{ 'float': 'right' }}>Ad ...</p><br></br><br></br>
                                <p>California 2018 Fall Virtual Teaching Careers Fair Nov. 27-30, 2018</p>
                                <img src="https://media.licdn.com/dms/image/C4E0BAQFaPaenF1fVoA/company-logo_100_100/0?e=1550707200&v=beta&t=ZDhj3O_txFA81y5iESViZAF12r3sfFE5w-xXS0C6O8s" />
                                <p>Explore the benefits of the teaching profession.</p>
                                <button class="btn btn-primary myConnectionButton">Register</button>
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



export default myNetwork;