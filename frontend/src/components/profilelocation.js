import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import Stepper from 'react-stepper-horizontal'
import { connect } from "react-redux";


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
            zipError: false
        }

        this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
        this.next = this.next.bind(this)


    }




    next() {
        if (this.state.country && this.state.zip) {
            this.setState({
                invalid: false
            })

            if (/(^\d{5}$)|(^\d{5}-\d{4}$)/g.test(this.state.zip)) {
                this.state.signupData.country = this.state.country;
                this.state.signupData.zip = this.state.zip

                this.props.onSubmitHandle(this.state.signupData)
                this.setState({
                    redirectNow: true
                })
            } else {
                this.setState({
                    zipError: true
                })
            }

        } else {
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
        require('../styles/profilelocation.css');

        let redirectVar, error, zipError;
        if (!this.state.signupData) {
            redirectVar = <Redirect to="/" />
        }
        if (this.state.redirectNow) {
            redirectVar = <Redirect to="/profileType" />
        }
        if (this.state.invalid) {
            error = <div style={{ textAlign: "center", fontSize: "20px", color: "red" }}>All the fields are required</div>
        } else {
            error = null;
        }
        if (this.state.zipError) {

            zipError = <div style={{ textAlign: "center", fontSize: "15px", color: "red" }}>Incorrect Zip format</div>

        }
        return (
            < div >
            { redirectVar }
            < div className = "profilelocationstepper" >
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
                </div >

            <p className="plWelcome">
                Welcome, {this.state.signupData.firstname}!
            </p>

            <h5 className="welcomedescript">
                Let's start your profile, connect to people you know, and engage with them on topics you care about.
            </h5>
                { error }
        <label for="welcomelocation"><h5 className="welcomelocationlabels">Country/Region</h5></label>
            <div>
                <input type="text" onChange={this.fieldChangeHandler} name="country" className="welcomezipcode" placeholder="  " />

                {/* <select name="welcomelocation" className="welcomelocation">
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="India">India</option>
                        <option value="China">China</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Germany">Germany</option>
                    </select> */}
            </div>
            <label for="welcomezipcode"><h5 className="welcomelocationlabels">Postal code</h5></label>
            <div>
                <input type="text" onChange={this.fieldChangeHandler} name="zip" className="welcomezipcode" placeholder="" />
                {zipError}
            </div>
            <div className="profilelocationbutton">
                <button className="btn btn-primary" onClick={this.next} name="profilelocationbutton" >Next</button>
            </div>
            </div >
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

        }
    }
}



export default (connect(mapStateToProps, mapDispatchStateToProps)(ProfileLocation));

// export default ProfileLocation;