var UserInfo = require('../models/userInfo');
var Job = require('../models/job')
var { mongoose } = require('../connections/mongo');

//var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for get job list request")


     let userID = msg.userID;
     console.log("\nUserID: "+userID);
    // let password = msg.password;
    // let type = msg.type;
    
    Job.find({
        postedBy: userID},{'jobTitle':1,'_id':0})
    .exec()
    .then(result => {
      console.log("The received result is : ", result);
       
      /*const data = {
        "status": 1,
        "msg": "Successfully obtained Job List",
        "info": result
      }*/
    //   callback(null, data);
      callback(null, result);

      //res.end(JSON.stringify(data))

    })
    .catch(err => {
      /*res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 0,
        "msg": "No Such User",
        "info": {
          "error": err
        }
      }
      res.end(JSON.stringify(data))*/
      console.log("This is an error-----"+err);
      callback(err,"Error");
    })


}


exports.handle_request = handle_request;