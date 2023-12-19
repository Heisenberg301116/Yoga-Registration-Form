// Creating User database schema
const mongoose = require('mongoose')
const { Schema } = mongoose

const RegistrationSchema = new Schema({
    user_id: {      //  this field will store MongoDB Object ID. It will act as a foregin key to 'Registration' collection so that we can tell the given Registration belongs to which user's profile
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_Profile'        // ref is used to establish a relationship with another Mongoose model. Here, it references the 'User_Profile' model, suggesting that the user field in the RegistrationSchema relates to documents in the 'User_Profile' collection via their ObjectIDs.
    },
    batch: {
        type: String,
        required: true
    },
    last_registered: {
        type: Date,
        default: Date.now   // only specify function name, not the function call !!!
    }
})

module.exports = mongoose.model('Registrations', RegistrationSchema)     // 'user' represents the name of the mongodb collection that the model 'UserSchema' will interact with