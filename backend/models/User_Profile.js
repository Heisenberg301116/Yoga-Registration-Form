// Creating User database schema
const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('User_Profile', UserSchema)     // 'user' represents the name of the mongodb collection that the model 'UserSchema' will interact with