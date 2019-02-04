var express = require('express');
var router = express.Router();
var pool = require('../connections/mysql')
var mysql = require('mysql')
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var kafka = require('../kafka/client')
var mongoose1 = require('mongoose');

var { mongoose } = require('../connections/mongo');

var kafka = require('../kafka/client');


//var { User } = require('../models/userInfo');
var bcrypt = require('bcryptjs')
var UserInfo = require('../models/userInfo')//.users
var Job = require('../models/job')

const redis = require('redis');
const client = redis.createClient();

var redisClient = require('redis').createClient;
var redis1 = redisClient(6379, 'localhost');



// create redis middleware
let redisMiddleware = (req, res, next) => {
  let key = "__expIress__" + req.originalUrl || req.url;
  console.log("redis call")
  client.get(key, function (err, reply) {
    if (reply) {
      console.log("____reply____", reply)
      res.send(reply);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(body);
      }
      next();
    }
  });
};


/* User Sign up */
router.post('/', async function (req, res, next) {

  console.log('\n\nIn user signup');
  console.log("Request Got: ", req.body)

  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email
  const pwd = bcrypt.hashSync(req.body.password, 10)
  const country = req.body.country
  const zipcode = req.body.zipcode
  const current_title = req.body.current_title
  const current_company = req.body.current_company
  const start_workDate = req.body.start_workDate
  const end_workDate = req.body.end_workDate
  const education_data = req.body.education_data
  const type = req.body.type


  pool.getConnection((
    err, connection) => {
    if (connection) {
      console.log("Connection obtained")
      const sql = `insert into userinfo(email,pwd,firstName,lastName,type) values(${mysql.escape(email)},${mysql.escape(pwd)},${mysql.escape(firstName)},${mysql.escape(lastName)},${mysql.escape(type)})`
      connection.query(sql,
        (err, result) => {
          if (result) {
            console.log("Successfully registered")

            //mongo query here
            console.log("Can i get a name: ", firstName)
            var user = new UserInfo({
              fname: firstName,
              lname: lastName,
              type: type,
              email: email,
              headline: "",
              noOfViews: 0,
              country: country,
              zipcode: zipcode,
              current_position: current_title,
              current_company: current_company,
              current_start: start_workDate,
              current_end: end_workDate,
              education: education_data,
              profileImage: `uploads/default.jpeg`
            })
            //console.log(`user ${user}`);
            user.save().then(result => {
              console.log("user created in mongo");
              // console.log(`user in then is ${user}`);
              res.writeHead(200, {
                'Content-Type': 'application/json'
              })
              const data = {
                "status": 1,
                "msg": "Successfully Signed Up",
                "info": {}
              }
              console.log("data being sent to frontend:\n", JSON.stringify(data))
              res.end(JSON.stringify(data))


            }, (err) => {
              console.log("__________err___________", err)
              console.log(`Signup Failed in mongo`);
              console.log("User already exists ", err.sqlMessage)
              res.writeHead(200, {
                'Content-Type': 'application/json'
              })
              const data = {
                "status": 0,
                "msg": "Unsuccesfull",
                "info": {
                  "error": err.errmsg
                }
              }
              console.log("data being sent to frontend:\n", JSON.stringify(data))
              res.end(JSON.stringify(data))


            })

          } else if (err) {
            console.log("User already exists ", err.sqlMessage)
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            const data = {
              "status": 0,
              "msg": "User already exists",
              "info": {
                "error": err.sqlMessage
              }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
          }
        })
    } else {
      console.log("Connection Refused ", err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Connection Refused")
    }

  })

});

/*
 User Login  with redis cache
*/
router.post('/login', async function (req, res, next) {

  console.log('\n\nIn user login');
  console.log("Request Got: ", req.body)
  const email = req.body.email
  const pwd = req.body.pwd;
  console.log("_______pwd_______", pwd)

  pool.getConnection((
    err, connection) => {
    if (connection) {
      console.log("Connection obtained for Login")
      const sql = "select * from userinfo WHERE email = " + mysql.escape(email);
      connection.query(sql,
        (err, result) => {
          if (err) {
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            const data = {
              "status": 0,
              "msg": "The email or password you entered is incorrect",
              "info": {}
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
          } else {
            console.log(result[0])
            if (result[0] && bcrypt.compareSync(pwd, result[0].pwd)) {
              UserInfo.findOne({
                email: email
              }).exec()
                .then(mongoResult => {
                  console.log("Successfully Logged In")
                  var token = jwt.sign(JSON.stringify(mongoResult), "secret")
                  res.writeHead(200, {
                    'Content-Type': 'application/json'
                  })

                  const data = {
                    "status": 1,
                    "msg": "Successfully Logged In",
                    "info": {
                      "firstname": mongoResult.fname,
                      "lastname": mongoResult.lname,
                      "profileImage": mongoResult.profileImage,
                      "uid": mongoResult._id,
                      "type": mongoResult.type,
                      "email": mongoResult.email,
                      "token": token
                    }
                  }
                  console.log("data being sent to frontend:\n", JSON.stringify(data))
                  console.log(result)
                  res.end(JSON.stringify(data))
                })

            } else if (err) {
              console.log("Some error in sql query", err.sqlMessage)
              res.writeHead(400, {
                'Content-Type': 'application/json'
              })
              res.end("some error in sql query")
            } else {
              //password doesn't match
              console.log("Password doesn't match!")
              res.writeHead(200, {
                'Content-Type': 'application/json'
              })
              const data = {
                "status": 0,
                "msg": "The email or password you entered is incorrect",
                "info": {}
              }
              console.log("data being sent to frontend:\n", JSON.stringify(data))
              res.end(JSON.stringify(data))
            }
          }
        })
    } else {
      console.log("Connection Refused ", err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Connection Refused")
    }
  })
});

/**
 * delete a user
 */
router.post("/:userID", async function (req, res, next) {
  console.log('\n\nIn user Delete');
  console.log("Request Got: ", req.body);


  const email = req.body.email;
  const userID = req.params.userID;

  pool.getConnection((
    err, connection) => {
    if (connection) {
      console.log("Connection obtained")
      const sql = "DELETE FROM userinfo WHERE email=" + mysql.escape(email);
      console.log("\nSQL QUERY: " + sql);
      connection.query(sql,
        (err, result) => {
          if (result) {
            console.log("Successfully deleted from MySQL");
            //mongo query here
            try {
              UserInfo.remove({ "_id": userID })
                .exec()
                .then(result => {
                  console.log("\nSuccessfully deleted from MongoDB");

                  // client.flushdb(function (err, succeeded) {
                  //   if (succeeded) {
                  //     console.log(succeeded); // will be true if successfull
                  //     console.log("cache cleared successfull")
                  //   } else {
                  //     console.log("error in clearing the cache")
                  //   }
                  // })


                  res.writeHead(200, {
                    'Content-Type': 'application/json'
                  })
                  const data = {
                    "status": 1,
                    "msg": "Successfully deleted",
                    "info": result
                  }
                  res.end(JSON.stringify(data))
                })
                .catch(err => {
                  console.log("\nNo Such User");
                  res.writeHead(200, {
                    'Content-Type': 'application/json'
                  })
                  const data = {
                    "status": 0,
                    "msg": "No Such User",
                    "info": {
                      "error": err
                    }
                  }
                  res.end(JSON.stringify(data))
                })
            } catch (error) {
              console.log("\nError in query.");

              res.writeHead(400, {
                'Content-Type': 'application/json'
              })
              const data = {
                "status": 0,
                "msg": error,
                "info": {
                  "error": error
                }
              }
              res.end(JSON.stringify(data))
            }

          } else if (err) {
            console.log("User already exists ", err.sqlMessage)
            res.writeHead(200, {
              'Content-Type': 'application/json'
            })
            const data = {
              "status": 0,
              "msg": "User already exists",
              "info": {
                "error": err.sqlMessage
              }
            }
            console.log("data being sent to frontend:\n", JSON.stringify(data))
            res.end(JSON.stringify(data))
          }
        })
    } else {
      console.log("Connection Refused ", err)
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Connection Refused")
    }

  })

});

/*
* apply for a job
*/
router.post("/:userID/apply", async function (req, res, next) {
  console.log("Inside post apply of job.")

  const data = {
    userId: req.params.userID,
    jobId: req.body.jobId,
    howDidyouHear: req.body.howDidyouHear,
    isDisabled: req.body.isDisabled,
    resume: req.body.resume,
    ethnicity: req.body.ethnicity,
    sponsership: req.body.sponsership
  }

  kafka.make_request("userJobApply", data, function (err, result) {
    if (err) {
      const data = {
        "status": 0,
        "msg": "Error while applying to job",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": result,
        "info": {}
      }

      res.writeHead(200, {
        'Content-Type': 'application/json'
      })

      redis1.flushdb(function (err, succeeded) {
        if (succeeded) {
          console.log(succeeded); // will be true if successfull
          console.log("cache cleared successfull")
        } else {
          console.log("error in clearing the cache")
        }
      })
      res.end(JSON.stringify(data))
    }
  })

})



/*
* saving a job
*/
router.post("/:userID/save", async function (req, res, next) {
  console.log("Inside post of job save.")
  const data = {
    jobId: req.body.jobId,
    userId: req.params.userID
  }

  kafka.make_request('userJobSave', data, function (err, result) {
    console.log(err && err)
    console.log(result && result)
    if (err) {
      const data = {
        "status": 0,
        "msg": "Error while saving a job",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else if (result == "Already saved a job") {
      const data = {
        "status": 0,
        "msg": "Already saved a job",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully saved a job",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      redis1.flushdb(function (err, succeeded) {
        if (succeeded) {
          console.log(succeeded); // will be true if successfull
          console.log("cache cleared successfull")
        } else {
          console.log("error in clearing the cache")
        }

      });
      res.end(JSON.stringify(data))
    }
  })
})

/*
 * get all jobs listed by that user
 */
getAllJobsPostedByUser_Caching = function (UserInfo, redis1, userID, callback) {
  redis1.get(userID, function (err, reply) {
    if (err) callback(null);
    else if (reply) {
      console.log("___________________________from cache_______________________________")
      console.log(reply)
      callback(JSON.parse(reply));
    } //user exists in cache

    else {
      //user doesn't exist in cache - we need to query the main database
      //make kafka call here
      var data = {
        userId: userID
      }

      console.log("The userId of the user for which job details are being fetched : " + data.userId);

      kafka.make_request("userJobList", data, function (err, result) {
        console.log("inside of response from kafka")
        if (err) {

          console.log("_______-err _________", data)
          callback(err);

        }
        else if (typeof (result) == "string") {

        }
        else {

          console.log("The received result is : ", result);
          redis1.set(userID, JSON.stringify(result), function () {
            console.log("_____________setting in cache_________________ ")
            callback(result);
          });


        }
      })


    }
  });
};

router.get("/:userID/joblist", async function (req, res, next) {
  console.log("Inside fetching the joblist for a user")
  const userID = req.params.userID

  if (!userID) {
    // res.status(400).send("Please send a proper userID");
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    const data = {
      "status": 0,
      "msg": "No Such User",
      "info": {
        "error": err
      }
    }
    res.end(JSON.stringify(data))
  }
  else {
    getAllJobsPostedByUser_Caching(UserInfo, redis1, req.params.userID, function (user_data) {
      if (!userID) {
        res.status(500).send("Server error");
      }
      else {
        // res.status(200).send(user_data);
        console.log("_________user.length____", user_data.length);

        res.writeHead(200, {
          'Content-Type': 'application/json'
        })

        const data = {
          "status": 1,
          "msg": "Successfully obtained Job List",
          "info": user_data
        }
        res.end(JSON.stringify(data))



      }
    });
  }

});



/**
 * get user details
 */
router.get("/:userId", async function (req, res, next) {

  const data = {
    userId: req.params.userId
  }

  kafka.make_request('getUserDetails', data, function (err, result) {

    if (err) {
      const data = {
        "status": 0,
        "msg": "Error in fetching result",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
    else if (typeof (result) == "string") {
      const data = {
        "status": 0,
        "msg": "Something went wrong",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
    else {
      const data = {
        "status": 1,
        "msg": "Successfully fetched details",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})


/**
* search by username
*/
router.post("/:userId/search", async function (req, res, next) {

  console.log("inside post request of search by username");
  console.log("req.body", req.body)
  //const connections = []

  const username = "^" + req.body.username;
  const data = {
    userId: req.params.userId,
    username: username
  }


  kafka.make_request('usernameSearch', data, function (err, result) {
    if (err) {
      const data = {
        "status": 0,
        "msg": "Failed searching the details",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else if (result.message) {
      const data = {
        "status": 0,
        "msg": "Failed searching the details",
        "info": result.message
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully searched the usernames",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      console.log("____________data_______________", data)
      res.end(JSON.stringify(data))
    }
  })

})

/**
 * update user profile
 */

router.put("/:userId", async function (req, res, next) {

  console.log("\nInside user profile updation");
  console.log("Request obtained is : ");
  console.log(JSON.stringify(req.body));

  const data = {
    userId: req.params.userId,
    fname: req.body.fname,
    lname: req.body.lname,
    headline: req.body.headline,
    current_position: req.body.current_position,
    country: req.body.country,
    zip: req.body.zipcode,
    state: req.body.state,
    //industry: req.body.industry,
    profile_summary: req.body.summary
  }

  kafka.make_request('editUserDetails', data, function (err, result) {
    if (err) {
      const data = {
        "status": 0,
        "msg": "Failed updating the details",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else if (result.message) {
      const data = {
        "status": 0,
        "msg": "Failed updating the details",
        "info": result.message
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully updated the details",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})


/**
 * getting jobs saved by the user
 */
router.get("/:userId/savedJobs", async function (req, res, next) {

  console.log("Getting saved jobs for the user: ", req.params.userId)

  const data = {
    userId: req.params.userId
  }

  kafka.make_request('userSavedJobs', data, function (err, result) {
    if (err) {
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs saved",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else if (result.message) {
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs saved",
        "info": result.message
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully fetched the details of all the saved jobs",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})

/**
 * getting list of jobs applied by the user
 */
router.get("/:userId/appliedJobs", async function (req, res, next) {

  console.log("Request to get details of jobs applied by the user: ", req.params.userId)

  const data = {
    userId: req.params.userId
  }

  kafka.make_request('userAppliedJobs', data, function (err, result) {
    if (err) {
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs applied",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else if (result.message) {
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs applied",
        "info": result.message
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    } else {
      const data = {
        "status": 1,
        "msg": "Successfully fetched the details of all the applied jobs",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    }
  })
})

/**
 * getting list least 5 applied jobs of a recruiter
 */
router.get("/recruiter/:userId/dashboard/least_5_jobs", async function (req, res, next) {

  console.log("Request to get the list of least 5 applied jobs of a recruiter ", req.params.userId)

  const data = {
    userId: req.params.userId
  }
  const id = req.params.userId
  console.log("_________id__________", id)

  const id1 = mongoose1.Types.ObjectId(req.params.userId)
  console.log(typeof id1)
  Job.aggregate([
    { $match: { postedBy: id1 } },
    { $project: { jobTitle: 1, count: { $size: '$jobApplied' } } },
    { $sort: { count: 1 } },
    { $limit: 5 }

  ])

    // Job.find({ postedBy: req.params.userId }, { jobTitle: 1, jobApplied: 1 }).limit(5).sort({ jobsApplied: -1 })

    .then(result => {
      console.log("_____________result__________", result)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "successfully found least 5 applied jobs",
        "info": {
          "result": result
        }
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of leat applied jobs",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.send(400, err)
    })
})


router.put("/:userId/education", async function (req, res, next) {
  console.log("Editing education details")
  console.log("Request got: ", req.body)
  const data = {
    education: req.body
  }


  console.log(data.education)
  UserInfo.findByIdAndUpdate(req.params.userId, {
    $set: {
      education: data.education
    }
  }).exec()
    .then(result => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "Success",
        info: {}
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 0,
        "msg": "Something went wrong",
        info: {
          "error": err
        }
      }
      res.end(JSON.stringify(data))
    })
})

router.put("/:userId/experience", async function (req, res, next) {
  console.log("Editing experience details")
  console.log("Req body is: ", req.body)
  const data = {
    experience: req.body
  }

  UserInfo.findByIdAndUpdate(req.params.userId, {
    $set: {
      experience: data.experience
    }
  }).exec()
    .then(result => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "Success",
        info: {}
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 0,
        "msg": "Something went wrong",
        info: {
          "error": err
        }
      }
      res.end(JSON.stringify(data))
    })
})




/**
 * getting to show first 10 job listings with its applications/month bar chart
 */
router.get("/recruiter/:userId/dashboard/top_10_jobs", async function (req, res, next) {

  console.log("Request to get details of first 10 jobs applied by the user: ", req.params.userId)
  const id = req.params.userId
  console.log("____id___", id)


  const id1 = mongoose1.Types.ObjectId(req.params.userId)
  // console.log(typeof id1)
  Job.aggregate([
    { $match: { postedBy: id1 } },
    {
      $project: {
        jobTitle: 1, count: { $size: '$jobApplied' }, postedDate: 1,
        month: { "$substr": ["$postedDate", 5, 2] }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }

  ])

    .then(result => {
      console.log("____result___", result)


      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "successfully found top 10 jobs ",
        "info": {
          "result": result
        }
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      const data = {
        "status": 0,
        "msg": "Failed fetching the top 10 jobs applied",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
      console.log("___err___", err)
    })


})


/**
 * City wise application/month (Bar, Pie or any kind of graph) for a Job Posting.
 * return city and city count, distinct cities and their count
 */
router.put("/recruiter/:userId/dashboard/city", async function (req, res, next) {

  console.log("Request to get details of city wise jobs applied by the user: ", req.params.userId)
  // console.log("Request body",req.body);
  console.log("Request body", req.body.jobId);


  const id1 = mongoose1.Types.ObjectId(req.params.userId)
  const j_id = mongoose1.Types.ObjectId(req.body.jobId)
  console.log(typeof id1)
  Job.aggregate([
    { $match: { postedBy: id1} },
    {
      $project: {
        jobTitle: 1, count: { $size: '$jobApplied' }, postedDate: 1,
        location: 1,
        // month: { $month: new Date("$postedDate") }
        month: { "$substr": ["$postedDate", 8, 2] }
      }
    },

  ])

    .then(result => {
      // callback(null,result)
      console.log("____result___", result)


      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "successfully found details of city wise jobs applied by the user",
        "info": {
          "result": result
        }
      }
      // console.log("_____data______", data)
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      // callback(err,err)
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs applied city wise",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
      console.log("___err___", err)
    })


})

/**
 * Graph for number of jobs saved
 */
router.get("/recruiter/:userId/dashboard/saved_jobs", async function (req, res, next) {

  console.log("Request to get details of number of jos saved by the user: ", req.params.userId)
  console.log("Request body", req.body.jobId);

  const id1 = mongoose1.Types.ObjectId(req.params.userId)
  // console.log(typeof id1)
  Job.aggregate([
    { $match: { postedBy: id1 } },
    {
      $project: {
        jobTitle: 1, count: { $size: '$jobSaved' }, postedDate: 1,
        month: { "$substr": ["$postedDate", 5, 2] }
      }
    },

  ])

    .then(result => {

      console.log("____result___", result)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "successfully found details of number of jos saved by the user",
        "info": {
          "result": result
        }
      }
      // console.log("_____data______", data)
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      // callback(err,err)
      const data = {
        "status": 0,
        "msg": "Failed fetching the details  details of number of jos saved by the user",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
      console.log("___err___", err)
    })


})




router.put("/:userId/skills", async function (req, res, next) {
  console.log("Editing skills details")
  const data = {
    skills: req.body
  }

  UserInfo.findByIdAndUpdate(req.params.userId, {
    $set: {
      skills: data.skills
    }
  }).exec()
    .then(result => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "Success",
        info: {}
      }
      res.end(JSON.stringify(data))
    })
    .catch(err => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 0,
        "msg": "Something went wrong",
        info: {
          "error": err
        }
      }
      res.end(JSON.stringify(data))
    })
})


router.post("/:userId/person", async function (req, res, next) {

  console.log("Request to view the profile of other user: ", req.params.userId)
  const user_id = req.params.userId
  const searched_id = req.body.searched_id
  console.log("__________searched_id____________--", searched_id)
  console.log("__________user_id____________--", user_id)
  const connections = []

  UserInfo.findOneAndUpdate(
    { "_id": searched_id },
    { $inc: { "noOfViews": 1 } }
  )
    .exec()
    .then(result => {

      console.log("User is: ", result._id, " and connections are : ", result.connections)
      console.log(result.connections.indexOf(user_id) != -1);
      if (searched_id == user_id) {
        const connectionInfo = {
          _id: result._id,
          name: result.fname + " " + result.lname,
          headline: result.headline,
          email: result.email,
          noOfViews: result.noOfViews,
          headline: result.headline,
          experience: result.experience,
          education: result.education,
          skills: result.skills,
          noOfConnections: result.connections.length,
          profileImage: result.profileImage,
          profile_summary: result.profile_summary,
          isConnected: "none"
        }
        connections.push(connectionInfo)
      }
      else if (result.connections.indexOf(user_id) != -1) {
        const connectionInfo = {
          _id: result._id,
          name: result.fname + " " + result.lname,
          headline: result.headline,
          email: result.email,
          noOfViews: result.noOfViews,
          headline: result.headline,
          experience: result.experience,
          education: result.education,
          skills: result.skills,
          noOfConnections: result.connections.length,
          profileImage: result.profileImage,
          profile_summary: result.profile_summary,
          isConnected: "true"
        }
        connections.push(connectionInfo)
      } else if (result.pending_receive.indexOf(user_id) != -1) {
        const connectionInfo = {
          _id: result._id,
          name: result.fname + " " + result.lname,
          headline: result.headline,
          email: result.email,
          noOfViews: result.noOfViews,
          headline: result.headline,
          experience: result.experience,
          education: result.education,
          skills: result.skills,
          noOfConnections: result.connections.length,
          profileImage: result.profileImage,
          profile_summary: result.profile_summary,
          isConnected: "pending"
        }
        connections.push(connectionInfo)
      }
      else if (result.pending_sent.indexOf(user_id) != -1) {
        const connectionInfo = {
          _id: result._id,
          name: result.fname + " " + result.lname,
          headline: result.headline,
          email: result.email,
          noOfViews: result.noOfViews,
          headline: result.headline,
          experience: result.experience,
          education: result.education,
          skills: result.skills,
          noOfConnections: result.connections.length,
          profileImage: result.profileImage,
          profile_summary: result.profile_summary,
          isConnected: "Accept"
        }
        connections.push(connectionInfo)
      } else {
        const connectionInfo = {
          _id: result._id,
          name: result.fname + " " + result.lname,
          headline: result.headline,
          email: result.email,
          noOfViews: result.noOfViews,
          headline: result.headline,
          experience: result.experience,
          education: result.education,
          skills: result.skills,
          noOfConnections: result.connections.length,
          profileImage: result.profileImage,
          profile_summary: result.profile_summary,

          isConnected: "false"
        }
        connections.push(connectionInfo)
      }

      const data = {
        "status": "1",
        "msg": "Successfully Searched the profile other user",
        "info": connections
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
      console.log("__________________result_______________", connections);

    })
    .catch(err => {
      console.log("_____________err______________", err)
      res.send(400, err)
      res.writeHead(400, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 0,
        "msg": "Backend Error",
        "info": {
          "error": err
        }
      }
      res.end(JSON.stringify(data))
    })

})


/**
 * get the daily views of the user i.e. profile views of the user
 */
router.get("/:userId/daily_views", async function (req, res, next) {

  console.log("Request to get no of profile views of the user: ", req.params.userId)


  const id1 = mongoose1.Types.ObjectId(req.params.userId)

  console.log(typeof id1)
  UserInfo.findById(req.params.userId, { fname: 1, lname: 1, noOfViews: 1 })
    .exec()
    .then(result => {
      // callback(null,result)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "successfully found no of profile views of the user",
        "info": {
          "result": result
        }
      }
      // console.log("____________data_________________", data)
      res.end(JSON.stringify(data))

    })
    .catch(err => {

      const data = {
        "status": 0,
        "msg": "Failed fetching the no of views of the user",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
      console.log("______err__________", err)
    })

})

/**
 * user clicks on the apply button to fill the appli so update the noOfViews_applied count
 */
router.put("/:jobId/start_application", async function (req, res, next) {

  const job_id = req.params.jobId
  console.log("__________user_id____________--", job_id)

  Job.findOneAndUpdate(
    { "_id": job_id },
    { $inc: { "noOfViews_applied": 1 } }
  )
    .exec()
    .then(result => {
      console.log("~~~~~~~~~~~~~~~result~~~~~~~~~~~~~~~~~", result);
      const data = {
        "status": "1",
        "msg": "Successfully updated the application started counter",
        "info": result
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))

    })
    .catch(err => {
      console.log("_____________err______________", err)
      res.send(400, err)
      res.writeHead(400, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 0,
        "msg": "Backend Error",
        "info": {
          "error": err
        }
      }
      res.end(JSON.stringify(data))
      // callback(err, err)
    })

})

/**
 * tracing the user no of users who have viewed, applied and submitted the application for the job
 */
router.get("/:jobId/tracing_the_activity", async function (req, res, next) {

  console.log("Request to get details of no of users who have viewed, applied and submitted the application for the job", req.params.jobId)

  const id1 = mongoose1.Types.ObjectId(req.params.userId)

  console.log(typeof id1)
  Job.findById(req.params.jobId, { jobTitle: 1, noOfViews: 1, noOfViews_applied: 1, noOfViews_submitted: 1 })

    .exec()
    .then(result => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      console.log("___result____", result)

      const result_data = {
        "_id": result._id,
        "Job_Title": result.jobTitle,
        "Application_Read": result.noOfViews,
        "Half_Filled_Application": result.noOfViews_applied - result.noOfViews_submitted,
        "Complete_Application": result.noOfViews_submitted
      }
      const data = {
        "status": 1,
        "msg": "successfully found the tracing data",
        "info": {
          "result": result_data
        }
      }
      // console.log("_____data______", data)
      res.end(JSON.stringify(data))

    })
    .catch(err => {
      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs applied",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
      console.log("___err___", err)
    })

})



/**
 * clicks per job posting
 */
router.get("/recruiter/:userId/dashboard/:jobId", async function (req, res, next) {

  console.log("Request to get views per job posting posted by the recruiter: ", req.params.userId)
  const id1 = mongoose1.Types.ObjectId(req.params.userId)
  const j_id = mongoose1.Types.ObjectId(req.params.jobId)
  console.log(typeof id1)
  Job.aggregate([
    { $match: { postedBy: id1, _id: j_id } },
    {
      $project: {
        jobTitle: 1, noOfViews: 1,
      }
    },

  ])

    .then(result => {
      console.log("____result___", result)


      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      const data = {
        "status": 1,
        "msg": "successfully found views per job posting posted by the recruiter",
        "info": {
          "result": result
        }
      }
      // console.log("_____data______", data)
      res.end(JSON.stringify(data))
    })
    .catch(err => {

      const data = {
        "status": 0,
        "msg": "Failed fetching the details of jobs applied",
        "info": err
      }
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(data))
      console.log("___err___", err)
    })


})



module.exports = router;