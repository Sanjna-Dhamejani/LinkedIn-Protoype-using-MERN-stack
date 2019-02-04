import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
// import '../styles/userdelete.css';
import Login from './Navbar';
import { ROOT_URL } from '../constants/constants';
var swal = require('sweetalert');
var redirectVar = null;

class UserDelete extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));

        this.state = {
            myData: myData,
            userName: "Alex White",
            userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg",
            userId: localStorage.getItem("userId"),
            userDeleted: false
        }
        this.deleteuserHandler = this.deleteuserHandler.bind(this)
    }

    deleteuserHandler = (e) => {
        let data = {
            email: this.state.myData.email
        }
        axios.post(`${ROOT_URL}/user/` + this.state.userId, data)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.clear()

                    this.setState({
                        userDeleted: true
                    })
                    swal("User Deleted", "Success!", "success")
                }
            })
    }

    render() {
        if (this.state.userDeleted == true) {
            redirectVar = <Redirect to="/" />
        }
        require('../styles/userdelete.css');

        return (
            <div className="page">
                {redirectVar}
                <Login />
                <div className="userdelete">
                    <h2 className="userdeleteh2">
                        <br></br>
                        <br></br>{this.state.myData.firstname}, we're sorry to see you go</h2>
                    <p className="userdeletepandb">Are you sure you want to close your account? You'll lose your connections, messages, endorsements, and recommendations.</p>
                    <b className="userdeletepandb">Don't lose touch with your 556 connections like John, Beth, and George...</b>
                    <div classname="loseconnections">
                    </div>
                    <hr></hr>
                    <b className="userdeletepandb">You'll also lose any recommendations and endorsements you have given or received...</b>
                    <div className="loseendorsements">
                    </div>
                    <hr></hr>
                    <b className="userdeletepandb">Tell us why you're closing your account:</b>
                    <br></br>
                    <div className="userdeleteoptions">
                        <label class="container userdelete">I have a duplicate account
                <input type="radio" checked="checked" name="radio" />
                            <span class="checkmark"></span>
                        </label>
                        <label class="container userdelete">I'm getting too many emails
                <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                        </label>
                        <label class="container userdelete">I'm not getting any value from my membership
                <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                        </label>
                        <label class="container userdelete">I have a privacy concern
                <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                        </label>
                        <label class="container userdelete">I receiving unwanted contact
                <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                        </label>
                        <label class="container userdelete">Other
                <input type="radio" name="radio" />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div>
                        <Link to="/newsfeed" className="btn btn-default backuserdelete"><b>Back </b></Link>
                        <button className="btn btn-primary userdeletebutton" onClick={this.deleteuserHandler}><b>Delete</b></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDelete;