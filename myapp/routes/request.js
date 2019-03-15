const express = require('express');
const router = express.Router();
const traxModel = require('../models/trax_model');


router.get('/', function(req, res){
    console.log(req.session.user.fullname);
    res.send('i just fire a request ');
});



router.post('/', function(req, res){
    let name = req.session.user.fullname;
    console.log("customer name "+ name);

    

// get all transation details from gtpay
let transaction_id = req.body.gtpay_tranx_id;
let amount = req.body.gtpay_tranx_amt;
let cust_id = req.body.gtpay_cust_id;
let customer_name = name;
let status_message = req.body.gtpay_tranx_status_msg;
let status_code = req.body.gtpay_tranx_status_code;
let echo_data = req.body.gtpay_echo_data;


// pass value to database
new traxModel({
    trax_id : transaction_id,
    amount : amount,
    customer_id : cust_id,
    status_message : status_message,
    status_code : status_code,
    acount_name : customer_name,
    echo_data : echo_data
}).save().then(function(trax){
    console.log(trax);
    
})

res.render('request', {transaction_id : transaction_id,
    user : req.session.user.fullname,
    amount : amount, cust_id : cust_id,
     status_message: status_message ,
      status_code : status_code,
      echo_data : echo_data,
      customer_name : customer_name
    });
});

module.exports = router;