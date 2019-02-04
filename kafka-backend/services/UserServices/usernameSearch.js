var UserInfo = require('../../models/userInfo') //.users
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {
    const connections = []
    console.log("\n\nInside kafka backend for editing details of job")
    console.log("\n\n User data is: ", msg)
    // console.log("\n\n User data is: ", msg.setJobId)
    const username = "^" + msg.username;
    UserInfo.find({         
        $or: [{ fname: { $regex: username, $options: 'i' } }, { lname: { $regex: username, $options: 'i' } }]
    })
        .then(result => {
            result.forEach((user) => {
                console.log("User is: ", user._id, " and connections are : ", user.connections)
                console.log(user._id == msg.userId)
                if(user._id == msg.userId){
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        email: user.email,
                        profileImage : user.profileImage,
                        isConnected: "none"
                    }
                    connections.push(connectionInfo)
                }else if (user.connections.indexOf(msg.userId) != -1) {
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        email: user.email,
                        profileImage : user.profileImage,
                        isConnected: "true"
                    }
                    connections.push(connectionInfo)
                } 
                else if (user.pending_receive.indexOf(msg.userId) != -1) {
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        email: user.email,
                        profileImage : user.profileImage,
                        isConnected: "pending"
                    }
                    connections.push(connectionInfo)
                } else if (user.pending_sent.indexOf(msg.userId) != -1) {
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        profileImage : user.profileImage,
                        email: user.email,
                        isConnected: "Accept"
                    }
                    connections.push(connectionInfo)
                } else {
                    const connectionInfo = {
                        _id: user._id,
                        name: user.fname + " " + user.lname,
                        headline: user.headline,
                        email: user.email,
                        profileImage : user.profileImage,
                        isConnected: "false"
                    }
                    connections.push(connectionInfo)
                }
            })
            console.log("__________________result_______________", connections);
            callback(null, connections)
        })
        .catch(err => {
            // res.send(400, err)
            //   res.writeHead(400, {
            //     'Content-Type': 'application/json'
            //   })
            //   const data = {
            //     "status": 0,
            //     "msg": "Backend Error",
            //     "info": {
            //       "error": err
            //     }
            //   }
            //   res.end(JSON.stringify(data))
            console.log("_____________err__________________", err)
            callback(err, err)
        })

}


exports.handle_request = handle_request;