var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Cryptr  = require('cryptr');
const bodyParser =require('body-parser');
const cryptr = new Cryptr('myTotalSecretKey');
const userModel = require('../models/users_model');
const expressValidator = require('express-validator');
const keys = require('../config/keys');
const random = require('random-number');



let cust_id = random.generator({ min : -100, max : 100000000, integer : true});
let id = cust_id();
console.log(' new customer id '+ id);




// mongoose.connect(keys.mongodb.dbURL);
mongoose.connect('mongodb://localhost:27017/payment_db', {useNewUrlParser : true});


/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('register');
});

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.use(expressValidator());

router.post('/', function(req, res, next){
    req.checkBody('username', 'username is required.').notEmpty();
    req.checkBody('email', 'enter a valid email.').isEmail();
    req.checkBody('fullname', ' full name is required').notEmpty();
    req.checkBody('password', 'mis-match password').isLength({min:4}).equals(req.body.conf_password);

    let errors = req.validationErrors();
    if(errors){
        console.log('error in form')
        res.render('register', {
        errors : errors 
        });
    }else{
        let checKemail = req.body.user_email;
        userModel.findOne({ email : checKemail}).then(function(currentUser){
            if (currentUser){
                let errors = ' email has been taken';
                console.log("current user "+ currentUser);
                res.render('register', { errors : errors});
                console.log(errors);
            }else{
                let email = req.body.email;
                let username = req.body.username;
                let fullname = req.body.fullname;
                let password = req.body.password;
                console.log(password);

                const encrypt_pass = cryptr.encrypt(password);
                console.log(encrypt_pass);

                new userModel({ 
                    username : username,
                    email : email,
                    fullname : fullname,
                    password : encrypt_pass,
                    customer_id : id
                }).save().then(function(newUser){
                    console.log(newUser.email);
            
                    res.render('complete', { name : username});
                });
            }
        });

    }


    
})




module.exports = router;
