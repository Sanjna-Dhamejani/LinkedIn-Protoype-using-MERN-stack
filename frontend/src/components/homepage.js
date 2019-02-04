import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import { ROOT_URL } from '../constants/constants';

import linkedIn from '../assets/images/linkedIn.png'
// import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Navbar from './Navbar';
// import { login } from "../../actions";



class Login extends Component {

    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            email_login: "",
            password_login: "",
            authFlag: false,
            errorFlag: false,
            invalidFlag: false,
            myData: myData,
            signedUp: false
        }
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
        this.login_submit = this.login_submit.bind(this)
    }



    fieldChangeHandler(e) {
        let changedVar = {}
        changedVar[e.target.name] = e.target.value
        this.setState(changedVar)
    }

    renderFieldFirstNames(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className="padding5 " style={{ "margin-top": "4px" }}>
                <label for="reg-label" className="reg-label">First name</label>
                <input type="text" name="firstname" {...field.input} className="inputFields" placeholder=""></input>
                <span className="error">
                    {touched ? error : ""}
                </span>
            </div>
        );
    }
    renderFieldLastName(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className="padding5 " style={{ "margin-top": "-10px" }}>
                <label for="reg-label" className="reg-label">Last name</label>
                <input className="inputFields" name="lastname"  {...field.input} type="text" placeholder=""></input>
                <span className="error">
                    {touched ? error : ""}
                </span>
            </div>
        );
    }
    renderFieldEmail(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className="padding5 " style={{ "margin-top": "-10px" }}>
                <label for="reg-label" className="reg-label">Email</label>
                <input className="inputFields" name="email"  {...field.input} type="text" placeholder=""></input>
                <span className="error">
                    {touched ? error : ""}
                </span>
            </div>
        );
    }
    renderFieldPassword(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className="padding5 " style={{ "margin-top": "-10px" }}>
                <label for="reg-label" className="reg-label">Password (6 or more characters)</label>
                <input className="inputFields" name="password"  {...field.input} type="password" placeholder=""></input>
                <span className="error">
                    {touched ? error : ""}
                </span>
            </div>
        );
    }


    onSubmit(values) {
        console.log(values);
        // values.type = "T";


        this.props.onSubmitHandle(values)
        this.setState({
            signedUp: true
        })
        // setTimeout(() => {
        //     this.setState({
        //         signedUp: true
        //     })
        // }, 5000);



    }

    login_submit() {
        if (this.state.email_login && this.state.password_login && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email_login) && this.state.password_login.length >= 6) {
            const data = {
                email: this.state.email_login,
                pwd: this.state.password_login
            }
            this.props.onSubmitLogin(data).then(response => {
                if (response.status > 0) {
                    localStorage.setItem('myData', JSON.stringify(response.data));
                    localStorage.setItem('userId', response.data.uid);
                    this.setState({
                        myData: data
                    })
                } else {
                    this.setState({
                        invalidFlag: response.data.msg
                    })
                }
            })

        } else {

        }
    }

    render() {
        require('../styles/homepage.css')

        let invalid, redirectVar;

        if (this.state.invalidFlag) {
            invalid = <div className="invalid">
                <span>
                    The email or password you entered is incorrect.
                </span>
            </div>
        }



        if (this.state.myData) {
            redirectVar = <Redirect to="/newsfeed" />
        } else if (this.state.signedUp) {
            redirectVar = <Redirect to="/profilelocation" />

        }

        

        const { handleSubmit } = this.props;

        return (


            <div style={{ backgroundColor: "#f4f4f4" }}>
                {redirectVar}
                <div id="">
                    <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': '#283e4a', "border-radius": "0px", marginBottom: "0px" }}>
                        {invalid}

                        <div className="container-fluid" >
                            <div className="navbar-header" style={{ marginTop: "10px", marginLeft: "8%" }}>
                                <img src={linkedIn}></img>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li style={{ marginRight: "15px" }}>
                                    <input type="text" onChange={this.fieldChangeHandler} name="email_login" className="login-email" autocapitalize="off" tabindex="1" id="login-email" placeholder="Email" autofocus="autofocus" dir="ltr"></input>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <input type="password" onChange={this.fieldChangeHandler} name="password_login" class="login-password" id="login-password" aria-required="true" tabindex="1" placeholder="Password" dir="ltr"></input>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <button tabindex="1" onClick={this.login_submit} className="login-submit" type="submit" value="Sign in">Sign in</button>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <a className="linkForgot">Forgot Password?</a>
                                </li>
                            </ul>
                        </div>

                    </nav>
                </div>
                <div className="login-background">

                    <div style={{ paddingTop: "2%" }}>
                        <div className="formProps">
                            <form style={{ width: "100%" }} onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                <div className="form-title">Be great at what you do </div>
                                <div className="form-subtitle">Get started - it's free. </div>


                                <Field
                                    name="firstname"
                                    component={this.renderFieldFirstNames}
                                />

                                <Field
                                    name="lastname"
                                    component={this.renderFieldLastName}
                                />
                                <Field
                                    name="email"
                                    component={this.renderFieldEmail}
                                />
                                <Field
                                    name="password"
                                    component={this.renderFieldPassword}
                                />


                                <div class="form-group padding5 " style={{ "marginBottom": '-14px', "marginTop": "-5%" }}>
                                    <div className="agreement">By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.
                                    </div>
                                </div>
                                <div class="form-group padding5" style={{ "marginBottom": '0px' }}>
                                    <button type="submit" className="btn btn-primary submitButton" value="Log In" tabindex="4" >Join now</button>
                                </div>
                            </form>

                        </div>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}


function validate(values) {

    const errors = {};
    if (!values.email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = "Enter valid email address";
    }
    if (!values.password || values.password.length < 6) {
        errors.password = "Enter password (6 or more characters)";
    }
    if (!values.firstname) {
        errors.firstname = "Enter firstname ";
    }
    if (!values.lastname) {
        errors.lastname = "Enter lastname ";
    }


    return errors;
}

const mapStateToProps = state => {
    return {
        mydata: state.reducer.myData
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            dispatch({ type: 'SIGNUPDATA', payload: data });

        }
        ,
        onSubmitLogin: (data) => {
            return axios.post(`${ROOT_URL}/user/login`, data, { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    if (response.data.status == 1) {
                        // console.log("Here");
                        let res = {
                            status: 1,
                            data: {
                                uid: response.data.info.uid,
                                email: response.data.info.email,
                                firstname: response.data.info.firstname,
                                lastname: response.data.info.lastname,
                                profileImage: response.data.info.profileImage,
                                type: response.data.info.type,
                                token: response.data.info.token

                            }
                        }
                        let tobeSaved = {
                            uid: response.data.info.uid,
                            email: response.data.info.email,
                            firstname: response.data.info.firstname,
                            lastname: response.data.info.lastname,
                            profileImage: response.data.info.profileImage,
                            type: response.data.info.type,
                            token: response.data.info.token
                        }
                        dispatch({ type: 'SAVEMYDATA', payload: res });
                        // localStorage.setItem('myData', JSON.stringify(res.data))

                        return {
                            data: tobeSaved,
                            status: 1
                        };
                    } else {
                        return {
                            data: { msg: response.data.msg },
                            status: 0

                        };
                    }
                }, (error) => {

                    console.log(error)
                    // return error;
                });
        }

    }
}



export default reduxForm({
    validate,
    form: "signUpForm"
})(connect(mapStateToProps, mapDispatchStateToProps)(Login));

