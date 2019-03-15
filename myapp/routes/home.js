var express = require('express');
var router = express.Router();
const Cryptr  = require('cryptr');
const bodyParser =require('body-parser');
const cryptr = new Cryptr('myTotalSecretKey');
const userMosel = require('../models/users_model');
const traxModel = require('../models/trax_model');
let wepay = require('wepay');



/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('the query '+ req.query);
    console.log(req.query.name);
   
 res.render('mainpage', {user : req.session.user.fullname});
});

/* GET users listing. */
router.get('/logout', function(req, res, next) {
    console.log('you just logged out ');
    req.session.destroy();
 res.redirect('/login');
});

//transaction
router.get('/transactions', function(req, res, next){
   let user = req.session.user.fullname;
 

    traxModel.find({acount_name  : user}).sort('-date').then(function(doc){
        let count = doc.length;
        console.log("the files "+doc);
        doc.forEach( function(file){
           
            let fileAmount = file.amount;
            let file_trax_id = file.trax_id;
            let file_memo = file.memo;
          
           
        })
        console.log('count '+ count);
        
        res.render('tranx',{
         doc, count,
           user : req.session.user.fullname
        });
    });

   
    });
       
 

module.exports = router;
