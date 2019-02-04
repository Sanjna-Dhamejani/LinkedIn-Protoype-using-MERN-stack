import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
// import '../styles/profilelocation.css'
import Stepper from 'react-stepper-horizontal'
import { connect } from "react-redux";
import { ROOT_URL } from '../constants/constants';


class ProfileLocation extends Component {
    constructor(props) {
        super(props);
        // let myData;
        // if (this.props.myData) {
        //     myData = this.props.myData
        // } else {
        //     myData = JSON.parse(localStorage.getItem('myData'));
        // }
        let signupData = false;
        if (this.props.signupData) {
            signupData = this.props.signupData
        }

        this.state = {
            // myData: myData,
            signupData: signupData,
            country: "",
            zip: "",
            invalid: false,
            redirectNow: false,
            type: "",
            college_name: "",
            start_date: "",
            end_date: "",
            degree: "",
            feild_of_study: "",
            description: "",
            title: "",
            company: "",
            industry: ""
        }

        this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
        this.handleType = this.handleType.bind(this);
        this.signUp = this.signUp.bind(this);


    }

    handleType(e) {
        this.setState({
            type: e.target.value
        })
    }


    signUp() {
        let flag = false;

        if (this.state.type) {
            let values = {
                "fname": this.state.signupData.firstname,
                "lname": this.state.signupData.lastname,
                "email": this.state.signupData.email,
                "password": this.state.signupData.password,
                "country": this.state.signupData.country,
                "zipcode": this.state.signupData.zip,
                "type": this.state.type,
                "current_title": "",
                "current_company": "",
                "current_industry": "",
                "start_workDate": "",
                "end_workDate": "",
                "education_data": [

                ]
            }
            if (this.state.type == "S") {
                if (this.state.college_name && this.state.start_date && this.state.end_date && this.state.degree && this.state.feild_of_study && this.state.description) {



                    values.education_data = [{
                        "college_name": this.state.college_name,
                        "start_date": this.state.start_date,
                        "end_date": this.state.end_date,
                        "degree": this.state.degree,
                        "feild_of_study": this.state.feild_of_study,
                        "description": this.state.description
                    }]



                    this.props.onSubmitHandle(values).then(response => {
                        this.setState({ redirectNow: true })
                    })


                } else {
                    flag = true
                }
            } else {
                if (this.state.title && this.state.current_company && this.state.industry && this.state.description && this.state.start_date && this.state.end_date) {
                    values.current_title = this.state.title
                    values.current_company = this.state.current_company
                    values.current_industry = this.state.industry
                    values.start_workDate = this.state.start_date
                    values.end_workDate = this.state.end_date
                    this.props.onSubmitHandle(values).then(response => {
                        this.setState({ redirectNow: true })
                    })

                } else {
                    flag = true
                }
            }
        } else {
            flag = true;
        }
        if (flag) {
            this.setState({
                invalid: true
            })
        }
    }

    fieldChangeHandler(e) {
        let changedVar = {}
        changedVar[e.target.name] = e.target.value
        this.setState(changedVar)
    }


    render() {
        require('../styles/profileType.css')

        let redirectVar, optionVals, error;
        if (!this.state.signupData) {
            redirectVar = <Redirect to="/" />
        }
        if (this.state.redirectNow) {
            redirectVar = <Redirect to="/" />
        }
        if (this.state.invalid) {
            error = <div style={{ textAlign: "center",marginTop:"-5px", marginBottom:"10px",fontSize: "20px", color: "red" }}>All the fields are required</div>
        }
        if (this.state.type == "S") {
            optionVals =
                <div>
                    <div style={{ marginTop: "10px" }}>
                        <input type="text" onChange={this.fieldChangeHandler} name="college_name" className="welcomezipcode" placeholder="College Name" />
                    </div>
                    <div>
                        <span> <input type="date" onChange={this.fieldChangeHandler} style={{ width: "17%", float: "left" }} name="start_date" className="welcomezipcode" placeholder="Start Date" /></span>
                        <span> <input type="date" onChange={this.fieldChangeHandler} style={{ width: "17%", float: "left", marginLeft: "1%" }} name="end_date" className="welcomezipcode" placeholder="End Date" /></span>

                    </div>
                    <div>
                        <input type="text" name="degree" onChange={this.fieldChangeHandler} className="welcomezipcode" placeholder="Degree" />
                    </div>
                    <div>
                        <input type="text" name="feild_of_study" onChange={this.fieldChangeHandler} className="welcomezipcode" placeholder="Feild of study" />
                    </div>
                    <div>
                        <input type="text" name="description" onChange={this.fieldChangeHandler} className="welcomezipcode" placeholder="Description" />
                    </div>
                    <div className="profilelocationbutton">
                        <button className="btn btn-primary" onChange={this.fieldChangeHandler} name="profilelocationbutton" onClick={this.signUp} style={{ fontSize: "17px" }}>Sign Up</button>
                    </div>
                </div>
        } else if (this.state.type == "R") {
            optionVals =
                <div>
                    <div style={{ marginTop: "10px" }}>
                        <input type="text" name="title" onChange={this.fieldChangeHandler} className="welcomezipcode" placeholder="Title" />
                    </div>

                    <div>
                        <input type="text" name="current_company" onChange={this.fieldChangeHandler} className="welcomezipcode" placeholder="Company " />
                    </div>
                    <div>
                        <input type="text" name="industry" onChange={this.fieldChangeHandler} className="welcomezipcode" placeholder="Industry" />
                    </div>
                    <div>
                        <span> <input type="date" onChange={this.fieldChangeHandler} style={{ width: "17%", float: "left" }} name="start_date" className="welcomezipcode" placeholder="Start Date" /></span>
                        <span> <input type="date" onChange={this.fieldChangeHandler} style={{ width: "17%", float: "left", marginLeft: "1%" }} name="end_date" className="welcomezipcode" placeholder="End Date" /></span>

                    </div>
                    <div>
                        <input type="text" name="description" onChange={this.fieldChangeHandler} className="welcomezipcode" placeholder="Description" />
                    </div>
                    <div className="profilelocationbutton">
                        <button className="btn btn-primary" name="profilelocationbutton" onClick={this.signUp} style={{ fontSize: "17px" }}>Sign Up</button>
                    </div>
                </div>
        } else {
            optionVals = null;
        }
        return (
            <div>
                {redirectVar}
                <div className="profilelocationstepper">
                    {/* <Stepper steps={[{ title: <h5>Profile</h5> }, { title: 'Community' }, { title: 'Interests' }]}
                        activeStep={0}
                        lineMarginOffset={30}
                        defaultTitleColor={"#595959"}
                        size={20}
                        circleFontSize={0}
                        activeBorderColor={"#3177a6"}
                        completeBorderColor={"#c2c2c2"}
                        defaultBorderColor={"#c2c2c2"}
                        activeColor={"#FFFFFFF"}
                        completeColor={"#FFFFFFF"}
                        defaultColor={"#FFFFFFF"}
                        defaultBorderStyle={"solid"}
                        completeBorderStyle={"solid"}
                        activeBorderStyle={"solid"} /> */}
                </div>

                {/* <p className="plWelcome">
                    Welcome, {this.state.signupData.firstname}!
            </p> */}

                <h5 className="welcomedescript">
                    Your profile helps you discover the right people and opportunities
            </h5>
                {/* <label for="welcomelocation"><h5 className="welcomelocationlabels">I am a</h5></label> */}
                <div>
                    {/* <input type="text" name="name" className="welcomezipcode" placeholder="   95112" /> */}

                    {error}
                    <select name="welcomelocation" onChange={this.handleType} className="welcomelocation">
                        <option value="">I am a...</option>
                        <option value="S" selected={this.state.type == "S"}>Student</option>
                        <option value="R" selected={this.state.type == "R"}>Professional</option>
                    </select>
                </div>
                {optionVals}


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

        signupData: state.reducer.signUpData
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            dispatch({ type: 'SIGNUPDATA', payload: data });
            return axios.post(`${ROOT_URL}/user/`, data, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.status) {
                            alert(response.data.msg)
                            return { status: response.data.status }
                        } else {
                            alert(response.data.msg)
                            return { status: response.data.status }
                        }
                    }
                })

        }
    }
}



export default (connect(mapStateToProps, mapDispatchStateToProps)(ProfileLocation));

// export default ProfileLocation;