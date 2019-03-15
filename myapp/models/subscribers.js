const mongoose = require('mongoose');
let sub_Schema = new mongoose.Schema({
    email : {
        type : String
    }
});

 let subscribers = mongoose.model('subscribers', sub_Schema);

 module.exports = subscribers;