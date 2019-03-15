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
  res.render('login');
});



 /*login user  */
router.post('/', function(req, res, next){
  // get user form values
let email = req.body.email;
let password = req.body.password;
// find user in database
userMosel.findOne({email : email}, function(error, user){
  if(!user){
      let msg = ' User not found!';
      res.render('login', {  error : msg});
  }else{
      let db_user = user.username;
      let db_pass = user.password;
      

    // decrypt user password and check for equality.
      const decrypt_pass = cryptr.decrypt(db_pass);
      if (decrypt_pass === password){
          req.session.user = user;
          res.redirect('/home');
        
      }else{
          res.render('login', { error : ' Invalid Password!'});
          console.log('wrong password');
      }


  }
})
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
