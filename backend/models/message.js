var mongoose =require('mongoose');

var messageContent = mongoose.Schema({
    sentBy:{
        type:String
    },
    body:{
        type:String
    }
})

var message = mongoose.Schema({
    members : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    messages:[messageContent]
})



module.exports = mongoose.model('Message',message);