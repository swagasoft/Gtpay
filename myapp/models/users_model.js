const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    email : {
        type : String
    },
    username : {
        type : String
    },
    fullname : {
        type : String
    },
    password : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }

});

let user = mongoose.model('user', userSchema);

module.exports = user;