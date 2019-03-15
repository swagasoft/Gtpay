var express = require('express');
var router = express.Router();
const sub_Models = require('../models/subscribers');
const mongoose = require('mongoose');
const Cryptr  = require('cryptr');
const bodyParser =require('body-parser');
const cryptr = new Cryptr('myTotalSecretKey');
const userMosel = require('../models/users_model');
let wepay = require('wepay');





/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
res.redirect('/home');
  }else{
    res.render('index');
  }

});



 
 


router.post('/', function(req, res , next){
  let sub_mail = req.body.email;

  sub_Models.findOne({email : sub_mail}, function(user){
    if(!user){
      new sub_Models({
        email : sub_mail
      });
      res.render('subscribers');
      console.log(`News letter subscription ${sub_mail}`)
    }else{
      res.render('subscribers');
      console.log(`News letter subscription ${sub_mail}`)
    }

  
  });

});

module.exports = router;
