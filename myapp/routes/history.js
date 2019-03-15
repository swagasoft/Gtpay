const express = require('express');
const router = express.Router();
const bodyParser =require('body-parser');
const historyModel = require('../models/history_models');
const userModel = require('../models/users_model');



/* GET users listing. */
router.get('/', function(req, res, next) {
    let my_id = req.session.user._id;

    console.log('my id '+ my_id);

historyModel.find({customer_id : my_id}).sort('-date').then(function(doc){
    let count = doc.length;
    console.log("file "+ doc);

    doc.forEach( function(file){
        let fileAmount = file.amount;
        let file_trax_id = file.trax_id;
        let file_memo = file.memo;
        let file_customer_name = file.name;
      
    })
    res.render('history',{
        doc, count,
       user : req.session.user.fullname,
      
    });
});

router.post('/', function(req, res, next){
    let file_id = req.body.trax;
    console.log(file_id);
   historyModel.findOneAndDelete({ trax_id: file_id} , function(error, success){
       if(error)
       {  res.send(500).status('Error deleting  while deleting file .');
    }else{
        console.log('File delete success!');
        res.redirect('/history');
    }
   });
  
  
});
  
    
});


module.exports = router;