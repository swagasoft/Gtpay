const mongoose = require('mongoose');
let pay_history = new mongoose.Schema({
    amount : {
        type : String
    },
    trax_id : {
        type : String
    },
    customer_id :{
        type : String
    },
    name : {
        type: String
    },
    memo : {
        type :String
    },
    date : {
        type : Date,
        default : Date.now
    }
});

 let subscribers = mongoose.model('pay_history', pay_history);

 module.exports = subscribers;