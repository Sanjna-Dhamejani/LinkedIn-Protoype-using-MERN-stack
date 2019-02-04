import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ROOT_URL } from '../constants/constants';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import Navbar from './Navbar';
import defaultPic from '../assets/images/default-profile-pic.png'


import linkedIn from '../assets/images/linkedIn.png'

class profile extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        let uid = localStorage.getItem('userId');
        this.state = {
            myData: myData,
            uid: uid,
            userConnections: "205",    //number of connections user have
            userInvitations: "20",
            fname: "Alex White",
            lname: "",
            headline: "",
            current_position: "",
            country: "",
            zip: "",
            location: "",
            industry: "",
            type: "",
            email: "",
            summary: "",
            school: "",
            degree: "",
            Experience: [
            ],
            addTitle: "",
            addCompany: "",
            addStart_date: "",
            addEnd_date: "",
            addDescription: "",
            tempEdit: [],
            selectedFilePdf: "",
            Education: [],
            addCollege_name: "",
            addDegree: "",
            addField_of_study: "",
            tempEdu: [],
            skill: [],
            tempSkill: [],
            addSkill: "",
            ProfilePic: defaultPic,
            profileInvalid: false,
            ziperror: false,
            hidePopUp: false
        }

        this.changeExperienceTitle = this.changeExperienceTitle.bind(this)
        this.changeExperienceCompany = this.changeExperienceCompany.bind(this)
        this.changeExperienceLocation = this.changeExperienceLocation.bind(this)
        this.changeExperienceFromYear = this.changeExperienceFromYear.bind(this)
        this.changeExperienceToYear = this.changeExperienceToYear.bind(this)
        this.changeEducationCollege = this.changeEducationCollege.bind(this)
        this.changeEducationDegree = this.changeEducationDegree.bind(this)
        this.changeEducationField_of_study = this.changeEducationField_of_study.bind(this)
        this.changeEducationStart_date = this.changeEducationStart_date.bind(this)
        this.changeEducationEnd_date = this.changeEducationEnd_date.bind(this)
        this.changeEducationDescription = this.changeEducationDescription.bind(this)
        this.changeSkill = this.changeSkill.bind(this)
        this.updateExperience = this.updateExperience.bind(this)
        this.resetSection = this.resetSection.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
        this.addNewExperience = this.addNewExperience.bind(this)
        this.addNewEducation = this.addNewEducation.bind(this)
        this.addNewSkill = this.addNewSkill.bind(this)
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
        this.updateEducation = this.updateEducation.bind(this)
        // this.updateExperience = this.updateEducation.bind(this)
        this.updateSkill = this.updateSkill.bind(this)
        this.saveImage = this.saveImage.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.fieldLocation = this.fieldLocation.bind(this)
        this.selectPdf = this.selectPdf.bind(this)
        this.savePDF = this.savePDF.bind(this)
    }

    saveProfile() {
        if (this.state.fname && this.state.lname && this.state.headline && this.state.current_position && this.state.country && this.state.zip && this.state.summary) {
            this.setState({
                profileInvalid: false
            })
            if (/(^\d{5}$)|(^\d{5}-\d{4}$)/g.test(this.state.zip)) {

                let data1 = {
                    fname: this.state.fname,
                    lname: this.state.lname,
                    headline: this.state.headline,
                    current_position: this.state.current_position,
                    country: this.state.country,
                    summary: this.state.profile_summary,
                    zipcode: this.state.zip,
                    state: this.state.location,
                    summary: this.state.summary,



                }

                axios.defaults.withCredentials = true;
                axios.put(`${ROOT_URL}/user/${this.state.uid}`, data1)
                    .then((response) => {

                        console.log(response.data);

                        this.setState({
                            currentInfo: this.state.current_position
                        })
                        // if (response.data.status == 1) {
                        //     let data = response.data.info;
                        //     let temp = "";
                        //     if (data.type == "R") {
                        //         temp = data.current_position
                        //     } else {
                        //         temp = data.education[data.education.length - 1].college_name
                        //     }
                        //     let data2 = {
                        //         fname: data.fname,
                        //         lname: data.lname,
                        //         headline: data.headline,
                        //         country: data.country,
                        //         summary: data.profile_summary || "",
                        //         Experience: data.experience,
                        //         tempEdit: data.experience,
                        //         Education: data.education,
                        //         tempEdu: data.education,
                        //         skill: data.skills,
                        //         tempSkill: data.skills,
                        //         connections: data.connections.length,
                        //         contactInfo: data.email,
                        //         currentInfo: temp,

                        //     }
                        //     localStorage.setItem('profile', JSON.stringify({
                        //         fname: data.fname,
                        //         lname: data.lname,
                        //         headline: data.headline,
                        //         country: data.country,
                        //         summary: data.profile_summary,
                        //         connections: data.connections.length,
                        //         contactInfo: data.email,
                        //         currentInfo: temp
                        //     }));

                        // }

                    });
                this.setState({
                    profileInvalid: false,
                    ziperror: false,
                    hidePopUp: true
                })



            } else {
                this.setState({
                    ziperror: true
                })
            }

        } else {
            this.setState({
                profileInvalid: true
            })
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
                        this.setState({
                            fname: data.fname,
                            lname: data.lname,
                            headline: data.headline,
                            country: data.country,
                            summary: data.profile_summary || "",
                            Experience: data.experience,
                            tempEdit: data.experience,
                            Education: data.education,
                            tempEdu: data.education,
                            skill: data.skills,
                            tempSkill: data.skills,
                            connections: data.connections && data.connections.length,
                            contactInfo: data.email,
                            currentInfo: temp,
                            ProfilePic: image,
                            current_position: temp,
                            zip: data.zipcode
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

        const state = {
            foo: this.state.Experience
        };

        const copy = [...state.foo, this.state.Experience];
        this.setState({
            tempEdit: [...this.state.Experience],
        })

        //   console.log(copy === state.foo);
        // let temp = this.state.Experience

        // let temp = Object.assign({}, this.state.Experience);

        // this.setState({
        //     tempEdit: Object.assign({}, temp)
        // })
        let temp1 = this.state.Education

        this.setState({
            tempEdu: temp1
        })
        let temp2 = this.state.skill
        this.setState({
            tempSkill: temp2
        })
    }


    resetSection() {
        let experience = JSON.parse(localStorage.getItem('experience'))
        let education = JSON.parse(localStorage.getItem('education'))
        let skill = JSON.parse(localStorage.getItem('skill'))
        let data = JSON.parse(localStorage.getItem('profile'))
        this.setState({
            Experience: experience,
            Education: education,
            skill: skill,
            fname: data.fname,
            lname: data.lname,
            headline: data.headline,
            country: data.country,
            summary: data.summary,
            connections: data.connections,
            contactInfo: data.contactInfo,
            currentInfo: data.currentInfo,

        })


    }

    onImageChange = (e) => {
        if (e.target.files[0] && e.target.files.length > 0) {
            this.setState({
                selectedFile: e.target.files[0],
                tempImage: URL.createObjectURL(e.target.files[0]),
                viewImagePreview: true,

            })
        }

    }

    selectPdf = (e) => {
        if (e.target.files[0] && e.target.files.length > 0) {
            this.setState({
                selectedFilePdf: e.target.files[0],
                // tempImage: URL.createObjectURL(e.target.files[0]),
                // viewImagePreview: true,

            })
        }

    }

    saveImage() {

        let formData = new FormData();

        // formData.append('description', description);
        formData.append('selectedFile', this.state.selectedFile);
        // formData.set("uid", this.state.myData.uid)
        // formData.set("token", this.state.myData.token)
        axios.defaults.withCredentials = true;

        axios.post(`${ROOT_URL}/${this.state.uid}/upload`, formData).then((resp) => {
            console.log(resp)
            if (resp.status == 200) {
                if (resp.data.status == 1) {
                    this.setState({
                        ProfilePic: ROOT_URL + "/" + resp.data.info.path,
                        viewImagePreview: false
                    })
                    console.log(this.state.ProfilePic)
                }

            }

        })
    }


    savePDF() {

        let formData = new FormData();

        formData.append('selectedFile', this.state.selectedFilePdf);
        axios.defaults.withCredentials = true;

        axios.post(`${ROOT_URL}/${this.state.uid}/resumeUpload`, formData).then((resp) => {
            console.log(resp)
            if (resp.status == 200) {
                if (resp.data.status == 1) {
                    // this.setState({
                    //     ProfilePic: ROOT_URL + "/" + resp.data.info.path,
                    //     viewImagePreview: false
                    // })
                    console.log(this.state.ProfilePic)
                }

            }

        })
    }

    fieldChangeHandler(e) {
        let changedVar = {}
        changedVar[e.target.name] = e.target.value
        this.setState(changedVar)
    }

    fieldLocation(e) {

        this.setState({ location: e })
    }

    changeSkill(e, key) {
        let temp = this.state.tempSkill
        temp[key] = e.target.value
        this.setState({
            skill: temp
        })
    }


    changeEducationCollege(e, key) {
        let temp = this.state.tempEdu
        temp[key].college_name = e.target.value
        this.setState({
            tempEdu: temp
        })
    }

    changeEducationDegree(e, key) {
        let temp = this.state.tempEdu
        temp[key].degree = e.target.value
        this.setState({
            tempEdu: temp
        })
    }

    changeEducationField_of_study(e, key) {
        let temp = this.state.tempEdu
        temp[key].field_of_study = e.target.value
        this.setState({
            tempEdu: temp
        })
    }

    changeEducationStart_date(e, key) {
        let temp = this.state.tempEdu
        temp[key].start_date = e.target.value
        this.setState({
            tempEdu: temp
        })
    }
    changeEducationEnd_date(e, key) {
        let temp = this.state.tempEdu
        temp[key].end_date = e.target.value
        this.setState({
            tempEdu: temp
        })
    }
    changeEducationDescription(e, key) {
        let temp = this.state.tempEdu
        temp[key].description = e.target.value
        this.setState({
            tempEdu: temp
        })
    }

    addNewExperience() {
        let data = {
            title: this.state.addTitle,
            company: this.state.addCompany,
            work_startDate: this.state.addStart_date,
            work_endDate: this.state.addEnd_date,
            description: this.state.addDescription
        };
        let temp = this.state.Experience;
        temp.push(data)
        console.log(temp)
        //this.state.myData.uid
        axios.put(`${ROOT_URL}/user/${this.state.uid}/experience`, temp, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                if (response.data.status == 1) {
                    console.log("successfully completed")
                    this.setState({
                        Experience: temp
                    })

                    localStorage.setItem("experience", JSON.stringify(temp))
                } else {
                    console.log("error")

                }
            }, (error) => {
                console.log(error)
            });
    }
    addNewEducation() {
        let data = {
            college_name: this.state.addCollege_name,
            degree: this.state.addDegree,
            start_date: this.state.addStart_date,
            end_date: this.state.addEnd_date,
            field_of_study: this.state.addField_of_study,
            description: this.state.addDescription
        };
        let temp;
        if (this.state.Education) {
            temp = this.state.Education;
        } else {
            temp = [];
        }

        temp.push(data)
        console.log(temp)
        //this.state.myData.uid
        axios.put(`${ROOT_URL}/user/${this.state.uid}/education`, temp, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                if (response.data.status == 1) {
                    console.log("successfully completed")
                    this.setState({
                        Education: temp
                    })

                    localStorage.setItem("education", JSON.stringify(temp))
                } else {
                    console.log("error")

                }
            }, (error) => {
                console.log(error)
            });
    }
    addNewSkill() {

        let temp = this.state.skill;
        temp.push(this.state.addSkill)
        console.log(temp)
        //this.state.myData.uid
        axios.put(`${ROOT_URL}/user/${this.state.uid}/skills`, temp, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                if (response.data.status == 1) {
                    console.log("successfully completed")
                    this.setState({
                        skill: temp
                    })

                    localStorage.setItem("skill", JSON.stringify(temp))
                } else {
                    console.log("error")

                }
            }, (error) => {
                console.log(error)
            });
    }


    updateExperience() {
        let data = this.state.tempEdit;
        console.log(data)
        console.log(this.state.Experience === this.state.tempEdit)

        axios.put(`${ROOT_URL}/user/${this.state.uid}/experience`, data, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                if (response.data.status == 1) {
                    console.log("successfully completed")
                    this.setState({
                        Experience: data
                    })
                    localStorage.setItem("experience", JSON.stringify(data))

                } else {

                }
            }, (error) => {

                // return error;
            });
    }

    updateEducation() {
        let data = this.state.tempEdu;
        data.forEach(element => {
            delete element._id;

        });
        console.log(data)

        axios.put(`${ROOT_URL}/user/${this.state.uid}/education`, data, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                if (response.data.status == 1) {
                    console.log("successfully completed")
                    this.setState({
                        Education: data
                    })
                    localStorage.setItem("education", JSON.stringify(data))

                } else {

                }
            }, (error) => {

                // return error;
            });
    }

    updateSkill() {
        let data = this.state.tempSkill;
        console.log(data)
        console.log(this.state.Experience === this.state.tempEdit)

        axios.put(`${ROOT_URL}/user/${this.state.uid}/skills`, data, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                if (response.data.status == 1) {
                    console.log("successfully completed")
                    this.setState({
                        skill: data
                    })
                    localStorage.setItem("skill", JSON.stringify(data))

                } else {

                }
            }, (error) => {

                // return error;
            });
    }





    changeExperienceTitle(e, key) {
        let temp = this.state.tempEdit
        temp[key].title = e.target.value
        this.setState({
            tempEdit: temp
        })
    }
    changeExperienceCompany(e, key) {
        let temp = this.state.tempEdit
        temp[key].company = e.target.value
        this.setState({
            tempEdit: temp
        })
    }
    changeExperienceDescription(e, key) {
        let temp = this.state.tempEdit
        temp[key].description = e.target.value
        this.setState({
            tempEdit: temp
        })
    }
    changeExperienceLocation(e, key) {
        let temp = this.state.tempEdit
        temp[key].description = e.target.value
        this.setState({
            tempEdit: temp
        })
    }
    changeExperienceFromYear(e, key) {
        let temp = this.state.tempEdit
        temp[key].start_date = e.target.value
        this.setState({
            tempEdit: temp
        })
    }
    changeExperienceToYear(e, key) {
        let temp = this.state.tempEdit
        temp[key].end_date = e.target.value
        this.setState({
            tempEdit: temp
        })
    }





    render() {
        require('../styles/profile.css');
        let redirect = null;

        let DisplayData = null;
        let experiences = null;
        let experEdit = null, educationEdit = null;
        let educations = null;
        let skills = null, skillEdit = null;
        let profileInvalid = null;
        if (this.state.profileInvalid) {
            profileInvalid = <div style={{ width: "100%", textAlign: "center", fontSize: "20px", color: "red" }}>
                <span>
                    All fields are required
                </span>
            </div>
        } else {
            profileInvalid = null
        }

        if (this.state.hidePopUp) {
            document.getElementById('hide').click();
            this.setState({
                hidePopUp: false
            })
        }
        let zipError = null
        if (this.state.ziperror) {
            zipError = <div style={{ width: "100%", textAlign: "center", fontSize: "13px", color: "red" }}><span>Invalid zip Type</span></div>
        } else {
            zipError = null
        }

        if (this.state.Experience && this.state.Experience.length > 0) {
            experiences = this.state.Experience.map(exp => {
                return (<tr>
                    <td>
                        <div className="manager">
                            <div><span className="manager-text_11">{exp.title}</span></div>
                            <div style={{ marginTop: "4px" }}><span className="manager-text_111">{exp.company}</span></div>
                            <div style={{ marginTop: "2px", color: "#a4a4a4" }}><span className="manager-text_21">{exp.work_startDate} - {exp.work_endDate}</span></div>
                            <div style={{ marginTop: "8px" }}><span className="manager-text_1112">{exp.description}</span></div>

                        </div>
                    </td>
                    <td>
                    </td>
                </tr>
                )
            })
        }

        if (this.state.viewImagePreview) {
            document.getElementById("imagePreview").click();
        }

        if (this.state.tempEdit && this.state.tempEdit.length > 0) {
            experEdit = this.state.tempEdit.map((exp1, key) => {
                return (<table style={{ width: "100%" }}>
                    <tr style={{ marginTop: "20px" }}>
                        <td colspan="2" style={{ paddingTop: "20px" }}>
                            <div>
                                <span>Title *</span>
                            </div>
                            <div>
                                <input style={{ marginLeft: "0px", width: "97.5%" }} value={exp1.title} name="title" onChange={(e) => this.changeExperienceTitle(e, key)} className="input_styling" placeholder="Student" />

                            </div>
                        </td>
                    </tr>
                    <tr style={{ marginTop: "20px" }}>
                        <td colspan="2" style={{ paddingTop: "20px" }}>
                            <div>
                                <span>Company *</span>
                            </div>
                            <div>
                                <input style={{ marginLeft: "0px", width: "97.5%" }} value={exp1.company} className="input_styling" placeholder="Student" onChange={(e) => this.changeExperienceCompany(e, key)} />

                            </div>
                        </td>
                    </tr>
                    <tr style={{ marginTop: "10px" }}>
                        <td style={{ paddingTop: "10px" }}>
                            <div>
                                <span>From Year *</span>
                            </div>
                            <div>

                                <input type="date" className="input_styling" value={exp1.start_date} onChange={(e) => this.changeExperienceFromYear(e, key)} placeholder="Sjsu" />
                            </div>
                        </td>
                        <td style={{ paddingTop: "10px" }}>
                            <div>
                                <span style={{ marginLeft: "10px" }}>To year(or expected) *</span>
                            </div>
                            <div>
                                <input type="date" style={{ marginLeft: "10px", width: "97.5%" }} value={exp1.end_date} onChange={(e) => this.changeExperienceToYear(e, key)} className="input_styling" placeholder="Student" />
                            </div>
                        </td>
                    </tr>
                    <tr style={{ marginTop: "20px" }}>
                        <td colspan="2" style={{ paddingTop: "20px" }}>
                            <div>
                                <span>Description *</span>
                            </div>
                            <div>
                                <input style={{ marginLeft: "0px", width: "97.5%" }} value={exp1.description} onChange={(e) => this.changeExperienceLocation(e, key)} className="input_styling" placeholder="Student" />

                            </div>
                        </td>
                    </tr>
                    <hr style={{
                        "margin-bottom": -"7px",
                        "margin-top": "30px",
                        "width": "203%"
                    }} />
                </table>
                )
            })
        }

        if (this.state.Education && this.state.Education.length > 0) {
            educations = this.state.Education.map(exp => {
                return (<tr>
                    <td>
                        <div className="manager">
                            <div><span className="manager-text_11">{exp.college_name}</span></div>
                            <div style={{ marginTop: "4px" }}><span className="manager-text_111">{exp.degree}</span></div>
                            <div style={{ marginTop: "4px" }}><span className="manager-text_111">{exp.field_of_study}</span></div>
                            <div style={{ marginTop: "2px", color: "#a4a4a4" }}><span className="manager-text_21">{exp.start_date} - {exp.end_date}</span></div>
                            <div style={{ marginTop: "8px" }}><span className="manager-text_1112">{exp.description}</span></div>

                        </div>
                    </td>
                    <td>
                    </td>
                </tr>
                )
            })
        }

        if (this.state.tempEdu && this.state.tempEdu.length > 0) {
            educationEdit = this.state.tempEdu.map((exp1, key) => {
                return (<table style={{ width: "100%" }}>
                    <tr style={{ marginTop: "20px" }}>
                        <td colspan="2" style={{ paddingTop: "20px" }}>
                            <div>
                                <span>School *</span>
                            </div>
                            <div>
                                <input style={{ marginLeft: "0px" }} value={exp1.college_name} name="addCollege_name" onChange={(e) => this.changeEducationCollege(e, key)} className="input_styling" placeholder="College Name" />
                            </div>
                        </td>
                    </tr>
                    <tr style={{ marginTop: "20px" }}>
                        <td colspan="2" style={{ paddingTop: "20px" }}>
                            <div>
                                <span>Degree *</span>
                            </div>
                            <div>
                                <input style={{ marginLeft: "0px" }} value={exp1.degree} name="addDegree" onChange={(e) => this.changeEducationDegree(e, key)} className="input_styling" placeholder="Degree" />
                            </div>
                        </td>
                    </tr>
                    <tr style={{ marginTop: "20px" }}>
                        <td colspan="2" style={{ paddingTop: "20px" }}>
                            <div>
                                <span>Field of study *</span>
                            </div>
                            <div>
                                <input style={{ marginLeft: "0px" }} value={exp1.field_of_study} name="addField_of_study" onChange={(e) => this.changeEducationField_of_study(e, key)} className="input_styling" placeholder="Student" />
                            </div>
                        </td>
                    </tr>
                    <tr style={{ marginTop: "10px" }}>
                        <td style={{ paddingTop: "10px" }}>
                            <div>
                                <span>From Year *</span>
                            </div>
                            <div>
                                <input type="date" value={exp1.start_date} name="addStart_date" onChange={(e) => this.changeEducationStart_date(e, key)} className="input_styling" placeholder="Sjsu" />
                            </div>
                        </td>
                        <td style={{ paddingTop: "10px" }}>
                            <div>
                                <span style={{ marginLeft: "10px" }}>To year(or expected) *</span>
                            </div>
                            <div>
                                <input type="date" name="addEnd_date" value={exp1.end_date} onChange={(e) => this.changeEducationEnd_date(e, key)} style={{ marginLeft: "10px", width: "97.5%" }} className="input_styling" placeholder="Student" />
                            </div>
                        </td>
                    </tr>
                    <tr style={{ marginTop: "20px" }}>
                        <td colspan="2" style={{ paddingTop: "20px" }}>
                            <div>
                                <span>Description *</span>
                            </div>
                            <div>

                                <textarea name="addDescription" value={exp1.description} onChange={(e) => this.changeEducationDescription(e, key)} style={{ marginLeft: "0px", height: "85px" }} className="input_styling" placeholder="Student" />
                            </div>
                        </td>
                    </tr>
                    <hr style={{
                        "margin-bottom": -"7px",
                        "margin-top": "30px",
                        "width": "203%"
                    }} />
                </table>
                )
            })
        }


        if (this.state.skill && this.state.skill.length > 0) {
            skills = this.state.skill.map(exp => {
                return (
                    <div className="manager">
                        <div style={{ marginTop: "0%" }}><span className="manager-text_11">{exp}</span></div>
                        <hr style={{ borderWidth: "1.7px" }} />


                    </div>
                )
            })
        }

        if (this.state.tempSkill && this.state.tempSkill.length > 0) {
            skillEdit = this.state.tempSkill.map((exp1, key) => {
                return (<table style={{ width: "100%" }}>
                    <tr style={{ marginTop: "20px" }}>
                        <td colspan="2" style={{ paddingTop: "20px" }}>
                            <div>
                                <span>Skill*</span>
                            </div>
                            <div>
                                <input style={{ marginLeft: "0px", width: "97.5%" }} value={exp1} name="addSkill" onChange={(e) => this.changeSkill(e, key)} className="input_styling" placeholder="Your Skill" />
                            </div>
                        </td>
                    </tr>

                </table>
                )
            })
        }


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

                                {/* <img data-toggle="modal" data-target="#myModal" style={{ marginRight: "0%", marginLeft: "4%" }} className="profileImg" src={defaultPic} /> */}
                                <form id="uploadForm"
                                    enctype="multipart/form-data"
                                    action="/api/photo"
                                    className="selectImage"
                                    method="post">
                                    <label for="formInput" >
                                        <input id="formInput" style={{ display: "none" }} type="file" onChange={this.onImageChange} name="selectedFile" accept="image/*" />
                                        <img style={{ "margin-right": "0%", "margin-left": "20%", "width": "175px", "margin-top": "0%", height: "175px" }} className="profileImg" src={this.state.ProfilePic} />

                                    </label>
                                </form>
                            </div>
                            <div className="graphics">
                                <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-edit" data-toggle="modal" data-target="#myModal"></i>
                            </div>
                            <div id="imagePreview" data-toggle="modal" data-target="#imageModal"></div>
                            <table className="table_styling">
                                <tr>
                                    <td>

                                        <div className="manager">
                                            <div><span className="manager-text">{this.state.fname + " " + this.state.lname}</span></div>
                                            <div style={{ marginTop: "4px" }}><span className="manager-text_1">{this.state.headline}</span></div>
                                            <div style={{ marginTop: "4px" }}><span className="manager-text_2">{this.state.country}</span></div>
                                        </div>

                                        <div style={{ marginTop: "10px", marginLeft: "4%", marginBottom: "6%" }}>
                                            <span><button className="button-style" >Add profile section <span class="caret"></span></button></span>
                                            <span><button className="button-style_1" style={{ marginLeft: "5px", "border-style": "initial" }} >More...</button></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{this.state.currentInfo}</div>
                                        <div style={{ marginTop: "10px" }}> <i className=""></i>contact: {this.state.contactInfo}</div>
                                        <div style={{ marginTop: "10px" }}> <i className="ion-person-stalker"></i> {this.state.connections} connections</div>
                                    </td>
                                </tr>

                            </table>

                            <div className="summary">
                                <p>
                                    {this.state.summary}                                     </p>
                                <p id="demo" className="collapse">
                                    {this.state.summary}
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
                            <div style={{ "margin-top": "-35px", "margin-left": "96%" }}>
                                <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-edit" data-toggle="modal" data-target="#experienceModalEdit"></i>
                                <div>
                                    <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-plus-round" data-toggle="modal" data-target="#experienceModalAdd"></i>

                                </div>
                            </div>


                            <table className="" style={{ marginBottom: "6%", width:"100%" }}>

                                {experiences}

                            </table>


                        </div>
                        <div style={{ marginTop: "20px" }} class="card myConnections_1">
                            <div>
                                <h2 style={{ "font-size": "2rem", "line-height": "1.4" }}>
                                    Education
                                </h2>
                            </div>
                            <div style={{ "margin-top": "-35px", "margin-left": "96%" }}>
                                <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-edit" data-toggle="modal" data-target="#editEducation"></i>
                                <div>
                                    <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-plus-round" data-toggle="modal" data-target="#addEductaion"></i>

                                </div>
                            </div>
                            <table className="" style={{ marginBottom: "6%" }}>
                                {educations}


                            </table>
                        </div>
                        <div style={{ marginTop: "20px" }} class="card myConnections_1">
                            <div>
                                <h2 style={{ "font-size": "2rem", "line-height": "1.4" }}>
                                    Skills and endorsement
                                </h2>
                            </div>
                            <div style={{ "margin-top": "-35px", "margin-left": "96%" }}>
                                <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-edit" data-toggle="modal" data-target="#editSkils"></i>
                                <div>
                                    <i style={{ color: "#0073b1", fontSize: "22px", cursor: "pointer" }} className="ion-plus-round" data-toggle="modal" data-target="#addSkills"></i>

                                </div>
                            </div>

                            {skills}

                            {/* <hr style={{ borderWidth: "1.7px" }} /> */}



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
                                                <form id="uploadForm"
                                                    enctype="multipart/form-data"
                                                    action="/api/photo"
                                                    className="selectImage"
                                                    method="post">
                                                    <label for="formInput" >
                                                        <input id="formInput" style={{ display: "none" }} type="file" onChange={this.onImageChange} name="selectedFile" accept="image/*" />
                                                        <img className="profileImg popupImageStyling" src={this.state.ProfilePic} />

                                                    </label>
                                                </form>
                                            </div>
                                            <div style={{ padding: "1% 4%" }}>
                                                {profileInvalid}
                                                <table style={{ width: "100%" }}>
                                                    <tr style={{ marginTop: "10px" }}>
                                                        <td style={{ paddingTop: "10px" }}>
                                                            <div>
                                                                <span>First Name *</span>
                                                            </div>
                                                            <div>
                                                                <input className="input_styling" name="fname" value={this.state.fname} onChange={this.fieldChangeHandler} placeholder="" />
                                                            </div>
                                                        </td>
                                                        <td style={{ paddingTop: "10px" }}>
                                                            <div>
                                                                <span style={{ marginLeft: "10px" }}>Last Name *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "10px", width: "97.5%" }} value={this.state.lname} name="lname" onChange={this.fieldChangeHandler} className="input_styling" placeholder="" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Headline *</span>
                                                            </div>
                                                            <div>
                                                                <textarea className="input_styling_1" name="headline" value={this.state.headline} onChange={this.fieldChangeHandler} placeholder="" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Current Position *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} name="current_position" onChange={this.fieldChangeHandler} value={this.state.current_position} className="input_styling" placeholder="" />
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
                                                                <input className="input_styling" name="country" value={this.state.country} onChange={this.fieldChangeHandler} placeholder="" />
                                                            </div>
                                                        </td>
                                                        <td style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span style={{ marginLeft: "10px" }}>ZIP code *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "10px", width: "97.5%" }} name="zip" value={this.state.zip} onChange={this.fieldChangeHandler} text="number" className="input_styling" placeholder="" />
                                                                {zipError}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>State *</span>
                                                            </div>
                                                            <div>


                                                                <PlacesAutocomplete value={this.state.location} onChange={this.fieldLocation}>
                                                                    {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
                                                                        <div className="autocomplete-root">
                                                                            <input {...getInputProps({ name: "location", autoComplete: "noop", className: "input_styling" })} />

                                                                            <div className="autocomplete-dropdown-container">
                                                                                {loading && <div>Loading...</div>}
                                                                                {suggestions.map(suggestion => (
                                                                                    <div {...getSuggestionItemProps(suggestion)} style={{ borderWidth: "thin", borderColor: "black" }}>
                                                                                        <span>{suggestion.description}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </PlacesAutocomplete>
                                                            </div>
                                                            <div>
                                                                {/* <input style={{ marginLeft: "0px" }} className="input_styling" value={this.state.location} name="location" onChange={this.fieldChangeHandler} placeholder="" /> */}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {/* <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Industry *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr> */}
                                                    {/* <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Contact info</span>
                                                            </div>

                                                        </td>
                                                    </tr> */}
                                                    {/* <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Email *</span>
                                                            </div>
                                                            <div>
                                                                <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                            </div>
                                                        </td>
                                                    </tr> */}
                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Summary *</span>
                                                            </div>
                                                            <div>
                                                                <textarea style={{ marginLeft: "0px", height: "85px" }} onChange={this.fieldChangeHandler} value={this.state.summary} name="summary" className="input_styling" placeholder="" />
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div>
                                                                <span>Summary *</span>
                                                            </div>
                                                            <div>
                                                                <input name="file1" onChange={this.selectPdf} type="file" accept="application/pdf" />
                                                            </div>
                                                        </td>
                                                    </tr>


                                                    {/* <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div onClick={this.addEdu} classname="under" style={{ "color": "#0073b1", fontWeight: "600", cursor: "pointer" }}>
                                                                + Add new education
                                                            </div>
                                                        </td>
                                                    </tr> */}

                                                    {/* <tr style={{ marginTop: "20px" }}>
                                                        <td colspan="2" style={{ paddingTop: "20px" }}>
                                                            <div classname="under" style={{ "color": "#0073b1", fontWeight: "600", cursor: "pointer" }}>
                                                                + Add Experience
                                                            </div>
                                                        </td>
                                                    </tr> */}
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
                                                                <span><button className="button-style_1" onClick={this.savePDF} style={{ borderColor: "#0073b1", marginLeft: "0px", "border-style": "solid", color: "#0073b1", padding: "8px 20px", borderWidth: "thin", boxShadow: "none" }} >Upload</button></span>
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
                                        <button type="button" class="btn btn-primary" onClick={this.saveProfile}>Save</button>
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.resetSection}>Cancel</button>
                                        <button type="button" id="hide" class="btn btn-primary" style={{ display: "none" }} data-dismiss="modal" ></button>

                                    </div>
                                </div>

                            </div>
                        </div>



                        <div id="addEductaion" class="modal fade" role="dialog">
                            <div class="modal-dialog" style={{ width: "57%" }}>

                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Add Education</h4>
                                    </div>
                                    <div class="modal-body">
                                        <table style={{ width: "100%" }}>
                                            <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>School *</span>
                                                    </div>
                                                    <div>
                                                        <input style={{ marginLeft: "0px" }} name="addCollege_name" onChange={this.fieldChangeHandler} className="input_styling" placeholder="College Name" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>Degree *</span>
                                                    </div>
                                                    <div>
                                                        <input style={{ marginLeft: "0px" }} name="addDegree" onChange={this.fieldChangeHandler} className="input_styling" placeholder="Degree" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>Field of study *</span>
                                                    </div>
                                                    <div>
                                                        <input style={{ marginLeft: "0px" }} name="addField_of_study" onChange={this.fieldChangeHandler} className="input_styling" placeholder="Student" />
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>Grade *</span>
                                                    </div>
                                                    <div>
                                                        <input style={{ marginLeft: "0px" }} className="input_styling" placeholder="Student" />
                                                    </div>
                                                </td>
                                            </tr> */}
                                            <tr style={{ marginTop: "10px" }}>
                                                <td style={{ paddingTop: "10px" }}>
                                                    <div>
                                                        <span>From Year *</span>
                                                    </div>
                                                    <div>
                                                        <input type="date" name="addStart_date" onChange={this.fieldChangeHandler} className="input_styling" placeholder="Sjsu" />
                                                    </div>
                                                </td>
                                                <td style={{ paddingTop: "10px" }}>
                                                    <div>
                                                        <span style={{ marginLeft: "10px" }}>To year(or expected) *</span>
                                                    </div>
                                                    <div>
                                                        <input type="date" name="addEnd_date" onChange={this.fieldChangeHandler} style={{ marginLeft: "10px", width: "97.5%" }} className="input_styling" placeholder="Student" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>Description *</span>
                                                    </div>
                                                    <div>

                                                        <textarea name="addDescription" onChange={this.fieldChangeHandler} style={{ marginLeft: "0px", height: "85px" }} className="input_styling" placeholder="Student" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.addNewEducation}>Save</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="experienceModalAdd" class="modal fade" role="dialog">
                            <div class="modal-dialog" style={{ width: "57%" }}>

                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Add Experience</h4>
                                    </div>
                                    <div class="modal-body">
                                        <table style={{ width: "100%" }}>
                                            <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>Title *</span>
                                                    </div>
                                                    <div>
                                                        <input style={{ marginLeft: "0px", width: "97.5%" }} name="addTitle" onChange={this.fieldChangeHandler} className="input_styling" placeholder="Title" />

                                                    </div>
                                                </td>
                                            </tr>
                                            <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>Company *</span>
                                                    </div>
                                                    <div>
                                                        <input style={{ marginLeft: "0px", width: "93.5%" }} name="addCompany" onChange={this.fieldChangeHandler} className="input_styling" placeholder="Company" />

                                                    </div>
                                                </td>
                                            </tr>
                                            <tr style={{ marginTop: "10px" }}>
                                                <td style={{ paddingTop: "10px" }}>
                                                    <div>
                                                        <span>From Year *</span>
                                                    </div>
                                                    <div>

                                                        <input type="date" name="addStart_date" className="input_styling" onChange={this.fieldChangeHandler} placeholder="" />
                                                    </div>
                                                </td>
                                                <td style={{ paddingTop: "10px" }}>
                                                    <div>
                                                        <span style={{ marginLeft: "10px" }}>To year(or expected) *</span>
                                                    </div>
                                                    <div>
                                                        <input type="date" name="addEnd_date" style={{ marginLeft: "10px", width: "97.5%" }} onChange={this.fieldChangeHandler} className="input_styling" placeholder="Student" />
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>Description *</span>
                                                    </div>
                                                    <div>
                                                        <input style={{ marginLeft: "0px", width: "97.5%" }} className="input_styling" name="addDescription" onChange={this.fieldChangeHandler} placeholder="Description" />

                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.addNewExperience}>Save</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal" >Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="experienceModalEdit" class="modal fade" role="dialog">
                            <div class="modal-dialog" style={{ width: "57%" }}>

                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" onClick={this.resetSection} data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Edit Experience</h4>
                                    </div>
                                    <div class="modal-body">
                                        {experEdit}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" onClick={this.updateExperience} data-dismiss="modal">Save</button>
                                        <button type="button" class="btn btn-default" onClick={this.resetSection} data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div id="editEducation" class="modal fade" role="dialog">
                            <div class="modal-dialog" style={{ width: "57%" }}>

                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Edit Education</h4>
                                    </div>
                                    <div class="modal-body">
                                        {educationEdit}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.updateEducation}>Save</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.resetSection}>Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="editSkils" class="modal fade" role="dialog">
                            <div class="modal-dialog" style={{ width: "57%" }}>

                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Edit Education</h4>
                                    </div>
                                    <div class="modal-body">
                                        {skillEdit}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.updateSkill}>Save</button>
                                        <button type="button" class="btn btn-default" onClick={this.resetSection} data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="addSkills" class="modal fade" role="dialog">
                            <div class="modal-dialog" style={{ width: "57%" }}>

                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Add Skill</h4>
                                    </div>
                                    <div class="modal-body">
                                        <table style={{ width: "100%" }}>
                                            <tr style={{ marginTop: "20px" }}>
                                                <td colspan="2" style={{ paddingTop: "20px" }}>
                                                    <div>
                                                        <span>Skill*</span>
                                                    </div>
                                                    <div>
                                                        <input style={{ marginLeft: "0px", width: "97.5%" }} name="addSkill" onChange={this.fieldChangeHandler} className="input_styling" placeholder="Your Skill" />
                                                    </div>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" onClick={this.addNewSkill} data-dismiss="modal">Save</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="imageModal" class="modal fade" role="dialog">
                            <div class="modal-dialog">

                                <div class="modal-content">
                                    <div class="modal-header">
                                        {/* <button type="button" class="close" data-dismiss="modal">&times;</button> */}
                                        <h4 class="modal-title">Profile Image</h4>
                                    </div>
                                    <div class="modal-body" style={{ backgroundColor: "black" }}>
                                        <div style={{ "margin-bottom": "0%" }}>
                                            <div className="displayImage">
                                                <img style={{ width: "75%%", height: "300px" }} className="imageStyles" src={this.state.tempImage}></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">

                                        <button type="button" onClick={this.saveImage} class="btn btn-default" data-dismiss="modal">Save</button>
                                        <button type="button" onClick={() => {
                                            this.setState({
                                                viewImagePreview: false
                                            })
                                        }} class="btn btn-default" data-dismiss="modal">Close</button>
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



export default profile;