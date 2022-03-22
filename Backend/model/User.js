const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email Already Present"]
    },

    password: {
        type: String,
        required: true
    }
})

//create new collection
module.exports = new mongoose.model('myUser', UserSchema);