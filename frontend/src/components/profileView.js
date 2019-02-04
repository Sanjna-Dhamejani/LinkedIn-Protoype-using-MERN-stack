import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import Navbar from './Navbar';
import defaultPic from '../assets/images/default-profile-pic.png'
import linkedIn from '../assets/images/linkedIn.png'

class profileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userConnections: "205",    //number of connections user have
            userInvitations: "20",
            userName: "Alex White",
            userInfo: "Student at San Jose State University",
            userProfileImage: "https://image.freepik.com/free-vector/abstract-dark-blue-polygonal-background_1035-9700.jpg"
        }
    }
    render() {
        require('../styles/profileView.css');
        let redirect = null;

        let DisplayData = null;

        DisplayData = (



            <div class="row userInvitations">
                <div className="col-sm-6 col-md-6 col-lg-2">
                    <img src={this.state.userProfileImage} className="img-circle profileImage" />
                </div>
                <div className="col-sm-5 col-md-5 col-lg-5">
                    <h4>{this.state.userName}</h4>
                    <h5>{this.state.userInfo}</h5>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                    <a href="" style={{ 'float': 'right', 'font-size': '150%' }}>Ignore</a>
                </div>
                <div className="col-sm-3 col-md-3 col-lg-3">

                    <button class="btn btn-primary myConnectionButton">Accept</button>
                </div>
            </div>


        )


        return (
            <div>

                {/* <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': 'darkblue', "border-radius": "0px", marginBottom: "0px" }}>
                       hi
                </nav> */}
                {/* {navbar} */}
                <Navbar />
                <div className="myMargin"></div>
                <div class="row myNetworkBackground">
                    <div class="col-sm-8 col-md-8 col-lg-8" >
                        <div class="card myConnections">
                            <div class="card-title coverPic myConnectionsUpper">


                            </div>
                            <div style={{ marginTop: "-10%" }}>
                                <img data-toggle="modal" data-target="#myModal1" style={{ marginRight: "0%", marginLeft: "4%" }} className="profileImg" src={defaultPic} />
                            </div>
                            <div className="graphics">
                                <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-edit" data-toggle="modal" data-target="#myModal"></i>
                            </div>

                            <table className="table_styling">
                                <tr>
                                    <td>

                                        <div className="manager">
                                            <div><span className="manager-text">Sjsu Student</span></div>
                                            <div style={{ marginTop: "4px" }}><span className="manager-text_1">Project Manager at Hk L</span></div>
                                            <div style={{ marginTop: "4px" }}><span className="manager-text_2">San Francisco Bay Area</span></div>
                                        </div>

                                        <div style={{ marginTop: "10px", marginLeft: "4%", marginBottom: "6%" }}>
                                            <span><button className="button-style" >Add profile section <span class="caret"></span></button></span>
                                            <span><button className="button-style_1" style={{ marginLeft: "5px", "border-style": "initial" }} >More...</button></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>San Jose State University</div>
                                        <div style={{ marginTop: "10px" }}> <i className=""></i>See contact info</div>
                                        <div style={{ marginTop: "10px" }}> <i className="ion-person-stalker"></i> 75 connections</div>
                                    </td>
                                </tr>

                            </table>

                            <div className="summary">
                                <p>
                                    Since the invention of mobile phones and portable desktops, I was quite intrigued by what these small machines could do to help us in our day to day life, especially those Smart Voice Assistants which are getting smarter since 2008. This motivated me to choose this field for my further education as I want...
                                </p>
                                <p id="demo" className="collapse">
                                    Since the invention of mobile phones and portable desktops, I was quite intrigued by what these small machines could do to help us in our day to day life, especially those Smart Voice Assistants which are getting smarter since 2008. This motivated me to choose this field for my further education as I wanted to contribute to the growth of this field. With this motivation, I started my journey with Bachelor’s degree in Computer Engineering and now continuing the journey with Master's degree in Software Engineering to achieve what I initially strived for.

    I am especially proud of my Final Year project which was titled: “Home on Phone: Adding Value to Your Home”. The key challenge here was to design smart products that could improve the quality of our daily life and make our homes smarter. The icing on the cake for me was when we won the First Prize for our efforts in the prestigious Projects Showcase Competition held by the Computer Society of India – an achievement that makes me proud till this day.

    In addition to my academic endeavors I have always strived to gain practical knowledge whenever possible. A case in point is my three months internship at the R.K. Infratel Company between May-July 2017. As the leader of the four-person team that worked on this project I learnt how to organize and delegate responsibilities effectively among my team members as per their individual capabilities and more importantly how to work and lead seamlessly as part of a team. This internship also gave me an opportunity to learn new tools like Node.JS and MongoDB in addition to enhancing my working knowledge of programs like Express, Google-Map APIs and JWT Tokens which is used for authentication.

    With these projects and experiences, that I have had throughout my journey, hold me in good stead to contribute even more to this field and learning along with it.
                                </p>

                            </div>
                            <div style={{ padding: "2% 4%", textAlign: "center" }}>
                                <a href="#demo" data-toggle="collapse" style={{ textDecoration: "none", color: "#0073b1", "line-height": "0px", fontWeight: "600", "font-size": "1.61rem" }}>
                                    show
                                    </a>
                                <span class="caret"></span>
                            </div>
                        </div>
                    </div>



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

                <div class="row myNetworkBackground">
                    <div class="col-sm-8 col-md-8 col-lg-8" >
                        <div class="card myConnections_1">
                            <div>
                                <h2 style={{ "font-size": "2rem", "line-height": "1.4" }}>
                                    Experience
                                </h2>
                            </div>
                            <table className="" style={{ marginBottom: "6%" }}>
                                <tr>
                                    <td>

                                        <div className="manager">
                                            <div><span className="manager-text_11">Sjsu Student</span></div>
                                            <div style={{ marginTop: "4px" }}><span className="manager-text_111">Deep Technologies</span></div>
                                            <div style={{ marginTop: "2px", color: "#a4a4a4" }}><span className="manager-text_21">Nov 2017 - Jul 2017</span></div>
                                            <div style={{ marginTop: "8px" }}><span className="manager-text_1112">- Got training in Web Development where I created a POC on Food Ordering System using technologies like HTML, CSS, JavaScript, PHP and MySql.</span></div>
                                        </div>


                                    </td>
                                    <td>

                                    </td>
                                </tr>

                            </table>


                        </div>
                        <div style={{ marginTop: "20px" }} class="card myConnections_1">
                            <div>
                                <h2 style={{ "font-size": "2rem", "line-height": "1.4" }}>
                                    Education
                                </h2>
                            </div>
                            <table className="" style={{ marginBottom: "6%" }}>
                                <tr>
                                    <td>
                                        <div className="manager">
                                            <div><span className="manager-text_11">Sjsu Student</span></div>
                                            <div style={{ marginTop: "4px" }}><span className="manager-text_111">Deep Technologies</span></div>
                                            <div style={{ marginTop: "2px", color: "#a4a4a4" }}><span className="manager-text_21">Nov 2017 - Jul 2017</span></div>
                                            <div style={{ marginTop: "8px" }}><span className="manager-text_1112">- Got training in Web Development where I created a POC on Food Ordering System using technologies like HTML, CSS, JavaScript, PHP and MySql.</span></div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style={{ marginTop: "20px" }} class="card myConnections_1">
                            <div>
                                <h2 style={{ "font-size": "2rem", "line-height": "1.4" }}>
                                    Skills and endorsement
                                </h2>
                            </div>

                            <div className="manager">
                                <div><span className="manager-text_11">Node Js</span></div>
                                <hr style={{ borderWidth: "1.7px" }} />
                                <div><span className="manager-text_11">Node Js</span></div>

                            </div>
                            <hr style={{ borderWidth: "1.7px" }} />



                        </div>

                        <div id="myModal" class="modal fade" role="dialog" >
                            <div class="modal-dialog" style={{ width: "57%" }}>


                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Edit Intro</h4>
                                    </div>
                                    <div class="modal-body" style={{ padding: "0px" }}>
                                        <div class="card myConnections_12">
                                            <div class="card-title coverPic myConnectionsUpper">
                                            </div>
                                            <div style={{ marginTop: "-10%" }}>
                                                <img style={{ marginRight: "0%", marginLeft: "5%" }} className="profileImg" src={defaultPic} />
                                            </div>
                                            <div style={{ padding: "1% 4%" }}>
                                                <table style={{ width: "100%" }}>
                                                    <tr style={{ marginTop: "10px" }}>
                                                        <td style={{ paddingTop: "10px" }}>
                                                            <div>
                                                                <span>First Name *</span>
                                                            </div>
                                                            <div>
                                                                <input className="input_styling" placeholder="Sjsu" />
                                                            </div>
                                                        </td>
                                                        <td style={{ paddingTop: "10px" }}>
                                                            <div>
                                                                <span style={{ marginLeft: "10px" }}>Last Name *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "10px", width: "97.5%" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Headline *</span>
                                                            </div>
                                                            <div>
                                                                <textarea className="input_styling_1" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Current Position *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                    </tr>
                                                    <tr style={{ marginTop: "10px" }}>
                                                        <td style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Country/ Region *</span>
                                                            </div>
                                                            <div>
                                                                <input className="input_styling" placeholder="Sjsu" />
                                                            </div>
                                                        </td>
                                                        <td style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span style={{ marginLeft: "10px" }}>ZIP code *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "10px", width: "97.5%" }} text="number" className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Locations within this area *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Industry *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Contact info</span>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Email *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Summary *</span>
                                                            </div>
                                                            <div>
                                                                <textarea style={{ marginLeft: "0px", height: "85px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>School *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Degree *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Field of study *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Grade *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "10px" }}>
                                                        <td style={{ paddingTop: "10px" }}>
                                                            <div>
                                                                <span>From Year *</span>
                                                            </div>
                                                            <div>
                                                                <input className="input_styling" placeholder="Sjsu" />
                                                            </div>
                                                        </td>
                                                        <td style={{ paddingTop: "10px" }}>
                                                            <div>
                                                                <span style={{ marginLeft: "10px" }}>To year(or expected) *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "10px", width: "97.5%" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Description *</span>
                                                            </div>
                                                            <div>

                                                                <textarea style={{ marginLeft: "0px", height: "85px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div classname="under" style={{ "color": "#0073b1", fontWeight: "600", cursor: "pointer" }}>
                                                                + Add new education
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Title *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px", width: "97.5%" }} className="input_styling" placeholder="Student" />

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Company *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px", width: "97.5%" }} className="input_styling" placeholder="Student" />

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Location *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px", width: "97.5%" }} className="input_styling" placeholder="Student" />

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "10px" }}>
                                                        <td style={{ paddingTop: "10px" }}>
                                                            <div>
                                                                <span>From Year *</span>
                                                            </div>
                                                            <div>

                                                                <input className="input_styling" placeholder="Sjsu" />
                                                            </div>
                                                        </td>
                                                        <td style={{ paddingTop: "10px" }}>
                                                            <div>
                                                                <span style={{ marginLeft: "10px" }}>To year(or expected) *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "10px", width: "97.5%" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div classname="under" style={{ "color": "#0073b1", fontWeight: "600", cursor: "pointer" }}>
                                                                + Add Experience
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Media </span>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div style={{ "marginTop": "15px" }}>
                                                                <span><button className="button-style_1" style={{ borderColor: "#0073b1", marginLeft: "0px", "border-style": "solid", color: "#0073b1", padding: "8px 20px", borderWidth: "thin", boxShadow: "none" }} >Upload</button></span>
                                                                <span><button className="button-style_1" style={{ marginLeft: "5px", "border-style": "initial", padding: "8px 20px" }} >Link</button></span>
                                                            </div>

                                                        </td>
                                                    </tr>

                                                </table>

                                            </div>
                                            {/* <div className="graphics">
                                                <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-edit" data-toggle="modal" data-target="#myModal"></i>
                                            </div>                                          */}
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="myModal1" class="modal fade" role="dialog">
                            <div class="modal-dialog">

                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Modal Header</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div style={{ "margin-bottom": "3%" }}>
                                            <div className="displayImage">
                                                <img style={{ width: "75%%", height: "300px" }} src={this.state.tempImage}></img>
                                            </div>
                                            <div style={{ color: "#0d03a1", marginLeft: "25%", width: "50%", fontSize: "17px" }}>
                                                <span style={{ float: "left", marginLeft: "12px", cursor: "pointer" }} onClick={this.browseImage}>Browse Computer</span>
                                                <span style={{ marginLeft: "57%", cursor: "pointer" }} onClick={this.cancelImageUpload}>Cancel</span>
                                                <span style={{ float: "right", marginRight: "12px", cursor: "pointer" }} onClick={this.uploadImage}>Save</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Save</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <br />
                        <br />
                        <br /><br />
                        <br />
                        <br /><br />
                        <br />
                        <br /><br />
                        <br />
                        <br /><br />
                        <br />
                        <br />
                    </div>

                </div>


            </div>
        )
    }
}



export default profileView;