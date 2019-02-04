import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
// import '../styles/graphs.css';
import Login from './Navbar'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { ROOT_URL } from '../constants/constants';
//  var recruiterId = localStorage.getItem("userId")
var applicantId = "5c0313af1e6ee47530f590cb"

var nameofapplicant = [];
var arrayofapplicationcount7 = []
var NoOfViews7 = []


class ApplicantGraph extends Component {
  constructor(props) {
    super(props);
    let myData = JSON.parse(localStorage.getItem('myData'));
    let userId = localStorage.getItem('userId');

    this.state = {
      myData: myData,
      applicantId: userId,
      jobId: "5c0315515e24fc5d383ac47e",
      NoOfViews: "",
      jobTitle7: [],
      NoOfApplications7: [],
      chartData7: {},
    }
    this.getChartData7 = this.getChartData7.bind(this)
  }

  componentWillMount() {
    this.getChartData7();
  }


  getChartData7() {
    axios.get(`${ROOT_URL}/user/${this.state.applicantId}/daily_views`)
      .then((response) => {
        console.log("Response received from backend in graphs for chart 4");
        console.log("\nPrinting the response body for chart 4");
        console.log(response.data);
        if (response.data.status == 1) {


          nameofapplicant = response.data.info.result.fname + " " + response.data.info.result.lname
          NoOfViews7.push(response.data.info.result.noOfViews)


          this.setState({
            jobTitle7: response.data.info.jobTitle,
            NoOfViews: response.data.info.count,
          })
        }
        else {
          console.log("Some error occured in the query execution");
          // alert("Some error occured!");
        }

      });
    this.setState({
      chartData7: {
        labels: nameofapplicant,
        datasets: [
          {
            label: 'No Of Views',
            data: NoOfViews7,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ]
          }
        ]
      }
    });
  }


  render() {
    require('../styles/graphs.css')
    return (
      <div>
        <Login />
        <div>
          <div className="container chart7">
            <Bar
              data={this.state.chartData7}
              options={{
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: 'No Of Views for the Applicant: ' + nameofapplicant,
                  fontSize: 25,
                },
                legend: {
                  display: 'true',
                  position: 'right'
                }
              }}
              width={1400}
              height={610}
            />

          </div>

        </div>
      </div>
    )
  }

}

export default ApplicantGraph;