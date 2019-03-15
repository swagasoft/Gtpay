const mongoose = require('mongoose');
let transactions = new mongoose.Schema({
    trax_id : {
        type : String
    },
    acount_name :{
        type : String
    },
    amount : {
        type : Number
    },
    customer_id : {
        type : String
    },
    status_message : {
        type : String
    },
    status_code : {
        type : String
    },
    echo_data : {
        type : String
    },
    time : {
        type : Date,
        default : Date.now
    }
});

 let trax = mongoose.model('transactions', transactions);

 module.exports = trax;;