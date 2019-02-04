import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
// import '../styles/graphs.css';
import Navbar from './Navbar'
import {Bar, Line, Pie} from 'react-chartjs-2';
import {ROOT_URL} from '../constants/constants';
//  var recruiterId = localStorage.getItem("userId")

var arrayOfJobs1 =[];
var arrayofapplicationcount1 = []
var arrayofmonth1 = []
var arrayOfJobs2 =[];
var arrayofapplicationcount2 = []
var city2 = []
var arrayOfJobs3 =[];
var arrayofapplicationcount3 = []
var arrayofmonth2 = []
var arrayOfJobs4 =[];
var NoOfClicks4 = []
var arrayofmonth4 = []
var arrayOfJobs5 =[];
var arrayofapplicationcount5 = []
var arrayofmonth5 = []
var arrayOfJobs6 =[];
var label6 =["Application Read","Half Filled Application", "Complete Application"]
var arrayofapplicationcount6 = []



class Graphs extends Component{
    constructor(props) {
        super(props);
        this.state={
            recruiterId : localStorage.getItem("userId"),

            jobId : this.props.location.state.job_id,
            month1:"",
            jobTitle1:[],
            NoOfApplications1:[],
            chartData1:{},
            jobTitle2: "",
            jobtitlecity : this.props.location.state.jobTitlefromrd,
            //jobtitlecity : this.props.location.state.jobtitle,
            city:[],
            NoOfApplications2:[],
            month2:"",
            chartData2:{},
            jobTitle3:[],
            NoOfApplications3:[],
            chartData3:{},
            jobTitle4:"",
            NoOfClicks:[],
            chartData4:{},
            jobTitle5:[],
            NoOfApplications5:[],
            chartData5:{},
            jobTitle6:"",
            NoOfApplicationsRead6: "",
            chartData6:{},
            NoOfApplicationsFull6 :"",
            NoOfApplicationsHalf6 : "",
            jobTitle7:['Java Developer','Software Engineer','Data Scientist','Manager','FrontEnd Developer','Javascript Developer','Graphic Designer','Full Stack Developer', 'React Developer','Kafka Employee'],
            NoOfApplications7:['20','12','13','30','45','5','8','22','27','32'],
            chartData7:{},
        }
        this.getChartData1 = this.getChartData1.bind(this)
        this.getChartData2 = this.getChartData2.bind(this)
        this.getChartData3 = this.getChartData3.bind(this)
        this.getChartData4 = this.getChartData4.bind(this)
        this.getChartData5 = this.getChartData5.bind(this)
        this.getChartData6 = this.getChartData6.bind(this)
    } 

    componentWillMount(){
        this.getChartData1();
        this.getChartData2();
        this.getChartData3();
        this.getChartData4();
        this.getChartData5();
        this.getChartData6();
      }
    
      getChartData1(){
        axios.get(`${ROOT_URL}/user/recruiter/${this.state.recruiterId}/dashboard/top_10_jobs`)
                .then((response) => {
                    console.log("Response received from backend in graphs for chart 1");
                    console.log("\nPrinting the response body for chart 1");
                    console.log(response.data);
                    if(response.data.status==1)
                    {
                        
                        response.data.info.result.map(job => {
                            arrayOfJobs1.push(job.jobTitle)
                            arrayofapplicationcount1.push(job.count)
                            arrayofmonth1.push(job.month)
                        })
                        this.setState({
                          chartData1:{
                            labels: arrayOfJobs1,
                            datasets:[
                              {
                                label:'No Of Applications',
                                data:arrayofapplicationcount1,
                                backgroundColor:[
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

                        console.log("arrayOfJobs1",arrayOfJobs1)
                        console.log("arrayofapplicationcount1",arrayofapplicationcount1)
                        console.log("arrayofmonth1",arrayofmonth1)
                        console.log("city", this.state.city)

                        this.setState({
                            jobTitle1 : arrayOfJobs1,
                            NoOfApplications1 : arrayofapplicationcount1,
                            month1: arrayofmonth1,
                        })
                        console.log("jobTitle1", this.state.jobTitle1)
                    }
                    else{
                        console.log("Some error occured in the query execution");
                        // alert("Some error occured!");
                    }
                    
                });
        
      }

      getChartData2(){
          const data={
            jobTitle: this.state.jobtitlecity
          }
        axios.put(`${ROOT_URL}/user/recruiter/${this.state.recruiterId}/dashboard/city`,data)
                .then((response) => {
                    console.log("Response received from backend in graphs for chart 2");
                    console.log("\nPrinting the response body for chart 2");
                    console.log(response.data);
                    if(response.data.status==1)
                    {

                        response.data.info.result.map(job2 => {
                            arrayOfJobs2.push(job2.jobTitle)
                            arrayofapplicationcount2.push(job2.count)
                            city2.push(job2.location)
                            arrayofmonth2.push(job2.month)
                        })
                        

                        this.setState({
                            jobTitle2 : response.data.info.jobTitle,
                            NoOfApplications2 : response.data.info.count,
                            city : response.data.info.location,
                            month2: response.data.info.month, 
                        })


                        console.log("city", city2)
                        console.log("arrayofapplicationcount2",arrayofapplicationcount2)
                        this.setState({
                          chartData2:{
                            labels: city2,
                            datasets:[
                              {
                                label:'No Of Applications',
                                data:arrayofapplicationcount2,
                                backgroundColor:[
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
                    else{
                        console.log("Some error occured in the query execution");
                        // alert("Some error occured!");
                    }
                    
                });
       
      }


      
      getChartData3(){
        axios.get(`${ROOT_URL}/user/recruiter/${this.state.recruiterId}/dashboard/least_5_jobs`)
        .then((response) => {
            console.log("Response received from backend in graphs for chart 3");
            console.log("\nPrinting the response body for chart 3");
            console.log(response.data);
            if(response.data.status==1)
            {

                response.data.info.result.map(job3 => {
                    arrayOfJobs3.push(job3.jobTitle)
                    arrayofapplicationcount3.push(job3.count)
                })

                this.setState({
                    jobTitle3 : response.data.info.jobTitle,
                    NoOfApplications3 : response.data.info.count,  
                })
                this.setState({
                  chartData3:{
                    labels: arrayOfJobs3,
                    datasets:[
                      {
                        label:'No Of Applications',
                        data:arrayofapplicationcount3,
                        backgroundColor:[
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
            else{
                console.log("Some error occured in the query execution");
                // alert("Some error occured!");
            }
            
        });
        
      }

 getChartData4(){
    axios.get(`${ROOT_URL}/user/recruiter/${this.state.recruiterId}/dashboard/${this.state.jobId}`)
            .then((response) => {
                console.log("Response received from backend in graphs for chart 4");
                console.log("\nPrinting the response body for chart 4");
                console.log(response.data);
                if(response.data.status==1)
                {

                    response.data.info.result.map(job4 => {
                        arrayOfJobs4.push(job4.jobTitle)
                        NoOfClicks4.push(job4.noOfViews)
                    })

                    this.setState({
                        jobTitle4 : response.data.info.jobTitle,
                        NoOfClicks : response.data.info.noOfViews, 
                    })
                    this.setState({
                      chartData4:{
                        labels: arrayOfJobs4,
                        datasets:[
                          {
                            label:'No Of Clicks',
                            data:NoOfClicks4,
                            backgroundColor:[
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
                else{
                    console.log("Some error occured in the query execution");
                    // alert("Some error occured!");
                }
                
            });
        
      }

      getChartData5(){
        axios.get(`${ROOT_URL}/user/recruiter/${this.state.recruiterId}/dashboard/saved_jobs`)
        .then((response) => {
            console.log("Response received from backend in graphs for chart 5");
            console.log("\nPrinting the response body for chart 5");
            console.log(response.data);
            if(response.data.status==1)
            {

                response.data.info.result.map(job5 => {
                    arrayOfJobs5.push(job5.jobTitle)
                    arrayofapplicationcount5.push(job5.count)
                })

                this.setState({
                    jobTitle5 : response.data.info.jobTitle,
                    NoOfApplications5 :response.data.info.count
                     
                })
                this.setState({
                  chartData5:{
                    labels: arrayOfJobs5,
                    datasets:[
                      {
                        label:'No Of Applications',
                        data:arrayofapplicationcount5,
                        backgroundColor:[
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
            else{
                console.log("Some error occured in the query execution");
                // alert("Some error occured!");
            }
            
        });
       
      }

      getChartData6(){
        axios.get(`${ROOT_URL}/user/${this.state.jobId}/tracing_the_activity`)
            .then((response) => {
                console.log("Response received from backend in graphs for chart 6");
                console.log("\nPrinting the response body for chart 6");
                console.log(response.data);
                if(response.data.status==1)
                {


                        arrayOfJobs6.push(response.data.info.result.Job_Title)
                        arrayofapplicationcount6.push(response.data.info.result.Application_Read)
                        arrayofapplicationcount6.push(response.data.info.result.Half_Filled_Application)
                        arrayofapplicationcount6.push(response.data.info.result.Complete_Application)
                        console.log("response.data.info.result.Application_Read",response.data.info.result.Application_Read)
                        console.log("arrayofapplication6",arrayofapplicationcount6)    
                        this.setState({
                            jobTitle6 : response.data.info.Job_Title,
                            NoOfApplicationsRead6 : response.data.info.Application_Read,
                            NoOfApplicationsHalf6 : response.data.info.Half_Filled_Application,
                            NoOfApplicationsFull6 : response.data.info.Complete_Application,
                             
                        }) 
                        this.setState({
                          chartData6:{
                            labels: label6,
                            datasets:[
                              {
                                label:'No Of Applications',
                                data:arrayofapplicationcount6,
                                backgroundColor:[
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
                else{
                    console.log("Some error occured in the query execution");
                    // alert("Some error occured!");
                }
                
            });
       
      }

    

    render(){
      require('../styles/graphs.css')
        return(
            <div>
            <Navbar/>
            <div>
            {/*<Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>*/}
            <div className="container chart1">
        <Bar
          data={this.state.chartData1}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'No Of Applications in First 10 Jobs Posted',
              fontSize:25,
            },
            legend:{
              display:'true',
              position:'right'
            }
          }}
          width={1000}
          height={610}
        />
        
        </div>
        <div className="container chart2">
        <Bar
          data={this.state.chartData2}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'City Wise Applications For A Job Posting',
              fontSize:25,
            },
            legend:{
              display:'true',
              position:'right'
            },
          }}
          width={1400}
          height={610}
        />
          </div>
          <div className="container chart3">
        <Bar
          data={this.state.chartData3}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'Top 5 Job Postings with Less Number of Applicants',
              fontSize:25,
            },
            legend:{
              display:'true',
              position:'right'
            }
          }}
          width={1400}
          height={610}
        />

        </div>
          <div className="container chart4">

        <Bar
          data={this.state.chartData4}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'Clicks per Job Posting',
              fontSize:25,
            },
            legend:{
              display:'true',
              position:'right'
            }
          }}
          width={1400}
          height={610}
        />

        </div>
          <div className="container chart5">

        <Bar
          data={this.state.chartData5}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'Number Of Saved Jobs',
              fontSize:25,
            },
            legend:{
              display:'true',
              position:'right'
            }
          }}
          width={1000}
          height={610}
        />

        </div>
          <div className="container chart6">

        <Bar
          data={this.state.chartData6}
          options={{
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'Trace Diagram',
              fontSize:25,
            },
            legend:{
              display:'true',
              position:'right'
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

export default Graphs;