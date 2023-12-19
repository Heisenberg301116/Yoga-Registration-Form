const express = require('express')
const router = express.Router()
const User = require('../models/User_Profile')   // for utilizing User schema and creating a new user profile in the database based upon the inputs received from the POST request
const Register = require('../models/Registration')      // for fetching register_id of the user who already has account
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "Harryisagoodb$oy"

// ROUTE: Check whether the user trying to login is new or an old user.
// POST Request: "http://localhost:5000/Authenticate_User". 
// No authentication required

router.post('/', [body('password', 'Password must not be empty !').notEmpty()],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ "val": errors.array() })
        }
        else {
            // Check whether the user has entered the correct password
            try {
                let user_info = await User.findOne({ email: req.body.email })
                const valid = await bcrypt.compare(req.body.password, user_info.password);

                if (valid === false) {          // => the password entered is incorrect
                    return res.status(401).json({ 'val': [{ "msg": 'Wrong Password !' }] })
                }
                else {  // => the password entered is correct
                    const register_info = await Register.findOne({ user_id: user_info.id })      // fetching register_id of this user

                    const register_id = register_info.id

                    const data = {      // token id will be generated on the basis of id of the user profile in MongoDB database
                        user: { user_profile_id: user_info.id }
                    }
                    const jwt_auth_token = jwt.sign(data, JWT_SECRET)  // sync method, no need to use await                    
                    res.status(200).json({ "val": { 'auth_token': jwt_auth_token, 'register_id': register_id } })        // send token id and 'Registration' id to the user
                }
            }
            catch (error) {
                return res.status(400).json({ 'val': [{ "msg": 'Some internal error occured !' }] })
            }
        }
    }
)

module.exports = router