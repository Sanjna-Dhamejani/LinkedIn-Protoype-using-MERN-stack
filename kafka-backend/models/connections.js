var mongoose =require('mongoose');

var connections= mongoose.Schema({
    people : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        }
    ],
    status:{
        type: Boolean
    }
})



module.exports = mongoose.model('Connection',connections);