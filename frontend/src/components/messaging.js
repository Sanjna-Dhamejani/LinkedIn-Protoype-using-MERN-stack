import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import ad from '../assets/images/Ad_TDK.png'
import Navbar from './Navbar'
import {ROOT_URL} from '../constants/constants';

var swal = require('sweetalert')

class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: null,
            chatDetails: null,
            member1: null,
            member2: null,
            sentBy: null,
            msgBody: null
        }
    }

    componentDidMount() {
        console.log("Getting all the Conversations")
        if (localStorage.getItem("userId")) {
            const id = localStorage.getItem("userId")
            var header = new Headers()
            axios.defaults.withCredentials = true

            axios.get(`${ROOT_URL}/message/${id}/getChats`)
                .then(result => {
                    if (result.status === 200) {
                        if (result.data.status) {
                            this.setState({
                                messageList: result.data.info.messageList,
                                sentBy: id
                            })
                        }
                    }
                })
        

        axios.get(`${ROOT_URL}/user/${id}`)
            .then(response => {
                console.log("Response for get user is: ",response.data)
            })
        }
    }

    handleClickedViewMsg = (e) => {
        console.log(e.target.id)
        const id = e.target.id
        axios.defaults.withCredentials = true;

        axios.get(`${ROOT_URL}/message/${id}`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.status) {
                        this.setState({
                            chatDetails: response.data.info.messages,
                            member1: response.data.info.messages.members[0],
                            member2: response.data.info.messages.members[1]
                        })
                    }
                }
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendMessage = (e) => {
        console.log("sentBy will be: ", this.state.sentBy)
        console.log("member1 will be: ", this.state.member1)
        console.log("member2 will be: ", this.state.member2)
        const data = {
            member1: this.state.member1 && this.state.member1,
            member2: this.state.member2 && this.state.member2,
            sentBy: this.state.sentBy && this.state.sentBy,
            body: this.state.msgBody && this.state.msgBody
        }
        console.log(data)
        axios.defaults.withCredentials = true
        // axios.post("http://localhost:3001/message", data)
        axios.post(`${ROOT_URL}/message`, data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.status) {
                        swal("Sent", "", "success")
                        window.location.reload()
                    }
                } else {
                    swal("Something went wrong", "", "error")
                }
            })
    }

    render() {
        require('../styles/messaging.css');

        let MsgInfo = null;
        let createMsg = null;
        if (this.state.messageList) {
            var displayMsgList = this.state.messageList.map(message => {
                console.log("Message Id: ", message._id)
                var memberDetails = null
                if (message.members[0] && message.members[1] && message.members[0]._id == localStorage.getItem("userId")) {
                    memberDetails = message.members[1]
                } else {
                    memberDetails = message.members[0]
                }
                return (
                    <div class="row userInvitations hoverEffect">
                        <div className="col-sm-9 col-md-9 col-lg-9 ">
                            <a id={message._id} onClick={this.handleClickedViewMsg}>{memberDetails.fname + " " + memberDetails.lname}</a>
                        </div>

                    </div>
                )
            })
        }
        if (this.state.chatDetails) {
            console.log("Chat Details are: ", this.state.chatDetails)
            var displayChat = this.state.chatDetails.messages.map(chat => {
                console.log("Chat objects: ", chat)
                return (
                    <div class="row userInvitations">
                        <div className="col-sm-9 col-md-9 col-lg-11" style={{ 'textAlign': 'left' }}>
                            <h5>{chat.body}</h5>
                            <p>{chat.sentBy}</p>
                            <hr></hr>
                        </div>
                    </div>
                )
            })
        }
        if (!this.state.createMsgFlag) {
            MsgInfo = (
                <div style={{ 'max-height': '354px', 'overflow-y': 'auto', 'overflow-x': 'hidden' }}>
                    <div class="card-body lowerheight">
                        {displayChat}
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Navbar/>
                <div className="myMargin"></div>
                <div class="row myNetworkBackground">
                    {/*column 1- This is the code for msg list */}
                    <div class="col-sm-3 col-md-3 col-lg-3 " >
                        <div class="card myConnections">
                            <div class="card-title upperheight">
                                <div class="row">
                                    <div class="col-sm-8 col-md-8 col-lg-8 ">
                                        <h4>Messaging</h4>
                                    </div>
                                    <div class="col-sm-4 col-md-4 col-lg-4 ">
                                        <a onClick={this.handleCreateNewMesage} className="msgGlyphicon"><span class="glyphicon glyphicon-edit"></span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body msgListlowerheight">
                                {displayMsgList}
                            </div>

                        </div>
                    </div>

                    {/* column 2- This is the code for msg display */}

                    <div class="col-sm-5 col-md-5 col-lg-5 ">
                        <div class="card myInvitations">
                            {MsgInfo}
                            <div class="card-body belowheight">
                                <textarea className="textBox" placeholder="Enter your message here.." cols="50" rows="4" value={this.state.msgBody} name="msgBody" onChange={this.handleChange}></textarea>
                                <button className="mysendButton" onClick={this.sendMessage}> Send</button>
                            </div>
                        </div>
                    </div>

                    {/* column 3-This is the code for ads */}
                    <div class="col-sm-4 col-md-4 col-lg-4" >
                        <div class="card myads">
                            <div class="card-title ">
                                <p style={{ 'float': 'right' }}>Ad ...</p><br></br><br></br>
                                <img className="myImg" src={ad}></img>
                                <p>Explore relevant opportunities with TDK InvenSense</p>
                                <button class="btn btn-primary myConnectionButton">Follow</button>
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



export default Messaging;
