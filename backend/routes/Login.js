const express = require('express')
const router = express.Router()
const User = require('../models/User_Profile')   // for utilizing User schema and creating a new user profile in the database based upon the inputs received from the POST request
const Register = require('../models/Registration')      // for fetching register_id of the user who already has account
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "Harryisagoodb$oy"

// ROUTE: Check whether the user trying to login is new or an old user.
// POST Request: "http://localhost:5000/Login". 
// No authentication required

router.post('/', [body('email', 'Not a valid email !').isEmail()],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ "val": errors.array() })
        }
        else {
            // Check whether the user with the provided email already exists or not
            try {
                let user_info = await User.findOne({ email: req.body.email })
                if (user_info) {         // => the email already exists in database.
                    return res.status(200).json({ 'val': [{ "msg": 'Found an email in the database !' }] })
                }
                else {
                    return res.status(400).json({ 'val': [{ "msg": 'Profile does not exist !' }] })
                }
            }
            catch (error) {
                return res.status(400).json({ 'val': [{ "msg": 'Some internal error occured !' }] })
            }
        }
    }
)

module.exports = router