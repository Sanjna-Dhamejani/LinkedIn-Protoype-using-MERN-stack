import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
// import '../styles/newsfeed.css'
import c1profilepic from '../assets/images/c1profilepic.jpg'
import linkedin from '../assets/images/linkedinnewsfeed.PNG'
import c4profilepic from '../assets/images/c4profilepic.jpg'
import c4newsfeedscroll from '../assets/images/c4newsfeedscroll.jpeg'
import Navbar from './Navbar'
import { ROOT_URL } from '../constants/constants';
import defaultPic from '../assets/images/default-profile-pic.png'


class Newsfeed extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        let uid = localStorage.getItem('userId');
        this.state = {
            myData: myData,
            uid: uid,
            userProfileImage: defaultPic,
            headline:"",
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get(`${ROOT_URL}/user/${this.state.uid}`)
            .then((response) => {

                console.log(response.data);
                if (response.data.status == 1) {
                    let data = response.data.info;
                    let temp = "";
                    if (data) {
                        if (data && data.type == "R") {
                            temp = data.current_position
                        } else {
                            if (data.education && data.education.length > 0) {
                                temp = data.education[data.education.length - 1].college_name

                            } else {
                                temp = [];
                            }
                        }
                        let image = defaultPic;
                        if (data.profileImage) {
                            image = ROOT_URL + "/" + data.profileImage
                        }
                        let connections=0;
                        if(data.connections){
                            connections=data.connections.length
                        }
                        let tempPic=defaultPic;
                        if(data.profileImage){
                            tempPic=ROOT_URL+"/"+data.profileImage
                        }
                        this.setState({
                            fname: data.fname,
                            lname: data.lname,
                            headline: data.headline,
                            no_of_views:data.noOfViews,
                            connections:connections,
                            userProfileImage: tempPic
                        })
                        localStorage.setItem('profile', JSON.stringify({
                            fname: data.fname,
                            lname: data.lname,
                            headline: data.headline,
                            country: data.country,
                            summary: data.profile_summary,
                            connections: data.connections && data.connections.length,
                            contactInfo: data.email,
                            currentInfo: temp,
                            ProfilePic: image
                        }));
                        localStorage.setItem('education', JSON.stringify(data.education));
                        localStorage.setItem('experience', JSON.stringify(data.experience));
                        localStorage.setItem('skill', JSON.stringify(data.skills));
                    }


                }

            });
    }

    render() {

        require('../styles/jobsearch.css')
        require('../styles/newsfeed.css')
        return (
            <div className="page">
                <Navbar />
                <div className="container-1">
                    <img style={{height:"100px",width:"100px",marginLeft:"64px"}} src={this.state.userProfileImage} className="c1profilepic" />
                    <h2 className="c1Name">{this.state.myData.firstname+" "+this.state.myData.lastname}</h2>
                    <p className="c1Descript">
                        {this.state.headline}
                    </p>
                    <hr></hr>
                    <h5 className="c1Profile">Who's viewed your profile</h5>
                    <h5 className="c1ProfileViews">{this.state.no_of_views}</h5>
                    <h5 className="c1Profile">Connections</h5>
                    <h5 className="c1ProfileViews">{this.state.connections}</h5>
                    <h5>&nbsp; &nbsp;Manage your network</h5>
                    <h5 className="c1Profile">Your saved articles</h5>
                    <h5 className="c1ProfileViews">&nbsp;1</h5>
                    <hr></hr>
                    <p className="c1extradescript">Access exclusive tools & insights</p>
                    <h5 className="c1extradescript">Start 1 Month Premium Trial</h5>
                </div>
                <div className="container-2">
                    <p className="c2communities">Your communities</p>
                    <hr></hr>
                    <p className="c2communities">Hashtags</p>
                    <hr></hr>
                    <p className="c2hashtags">#deeplearning</p>
                    <p className="c2hashtags">#hadoop</p>
                    <p className="c2hashtags">#machinelearning</p>
                    <h5 className="c2hashtags">Show more</h5>
                    <hr></hr>
                    <p className="c2communities">Groups</p>
                    <hr></hr>
                    <p className="c2hashtags">DataScienceGO - Professi...</p>
                </div>
                <div className="container-3">
                    <p className="sharenewsfeed">
                        Share an article, photo, video or idea
                    </p>
                    <hr className="shareline"></hr>
                    <button className="btn btn-default article"><h4 className="sharetext">Write an article</h4></button>
                    <button className="btn btn-default imageandvideo"><h4 className="sharetext">Images</h4></button>
                    <button className="btn btn-default imageandvideo"><h4 className="sharetext">Video</h4></button>
                    <button className="btn btn-primary sharepost"><h4 className="sharetext">Post</h4></button>
                </div>
                <div className="container-4">
                    <p className="c4like"><b>Vinita Kundnani</b> and <b>Sagar Advani</b> like this</p>
                    <hr className="c4belowlike"></hr>
                    <img src={c4profilepic} className="c4profilepic" />
                    <p className="c4name"> <b>Varun Panicker</b> • 1st </p>
                    <p className="c4belowname"> Data Science | Business Intelligence</p>
                    <p className="c4belowname"> 41m • Edited</p>
                    <p className="c4descript"> Our team bagged the first place at the T-Mobile Hacksgiving Hackathon this weekend! We created "Retail'ored", a three-step approach to reducing the number of returns in digital commerce by enhancing user experience in a data-driven manner. </p>
                    <img src={c4newsfeedscroll} className="c4newsfeedscroll" />
                    <p className="c4belowimg"> 25 likes • 5 comments</p>
                    <hr className="c4linebelowcomments"></hr>
                    <p className="c4likecomshare">Like &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Comment &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Share</p>
                </div>
                <div className="container-5">
                    <p className="c2communities">What people are talking about now</p>
                    <h4 className="c5readingheadline">How airlines boost their bottom line</h4>
                    <p className="c5readingheadline">11h ago • 3,812 readers</p>
                    <h4 className="c5readingheadline">Bloomberg gifts $1.8B to students</h4>
                    <p className="c5readingheadline">2h ago • 981 readers</p>
                    <h4 className="c5readingheadline">Zuckerberg's fortune falls by $17B</h4>
                    <p className="c5readingheadline">9h ago • 9,085 readers</p>
                    <h4 className="c5readingheadline">The case against 'just bring yourself'</h4>
                    <p className="c5readingheadline">10h ago • 13,190 readers</p>
                    <h4 className="c5readingheadline">Florida sues Walgreens and CVS</h4>
                    <p className="c5readingheadline">7h ago • 8,577 readers</p>
                    <p className="c2communities">Show more</p>
                    <hr></hr>
                    <hr></hr>
                    <p className="c5feed">Add to your feed</p>
                    <h4 className="c5addfeedtopics">#philanthropy</h4>
                    <button className="btn btn-default c5follow"><b>Follow</b></button>
                    <h4 className="c5addfeedtopics">The Economist</h4>
                    <button className="btn btn-default c5follow"><b>Follow</b></button>
                    <h4 className="c5addfeedtopics">TED Conferences</h4>
                    <button className="btn btn-default c5follow"><b>Follow</b></button>
                    <h5 className="c5recom">View all recommendations</h5>
                    <hr></hr>
                    <p className="c5extra">About &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Help Center  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Privacy & Terms</p>
                    <p className="c5extra">Advertising &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Business Services</p>
                    <p className="c5extra">Get the LinkedIn app &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; More</p>
                    <br></br>
                    <p className="c5extra"><img src={linkedin} className="c5linkedinnewsfeed" />LinkedIn Corporation © 2018</p>
                </div>
            </div>
        )
    }
}

export default Newsfeed;