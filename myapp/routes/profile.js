var express = require('express');
var router = express.Router();
const Cryptr  = require('cryptr');
const bodyParser =require('body-parser');
const cryptr = new Cryptr('myTotalSecretKey');
const userModel = require('../models/users_model');
const traxModel = require('../models/trax_model');
let wepay = require('wepay');



/* GET users listing. */
router.get('/', function(req, res, next) {
    let user = req.session.user.username;
    console.log(' user id '+ user);
userModel.findOne({username : user}, function( error, current_user){
    if(error){
        res.send(404).status('error finding user');
    }

let my_id = current_user._id;
let my_fullname = current_user.fullname;
let my_username  = current_user.username;
let my_email  = current_user.email;

    
    console.log(" my id "+ my_id)
   res.render('profile', {
       my_fullname : my_fullname,
       user : req.session.user.fullname,
       my_username : my_username,
       my_id : my_id,
       my_email : my_email
    });

})

// res.json(current_user);

});

 

module.exports = router;
