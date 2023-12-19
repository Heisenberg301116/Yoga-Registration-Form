const express = require('express')
const router = express.Router()
const User = require('../models/User_Profile')   // for utilizing User schema and creating a new user profile in the database based upon the inputs received from the POST request
const Register = require('../models/Registration')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "Harryisagoodb$oy"
const moment = require('moment');


// Create user profile from his name, email, password and date of birth
// POST Request: "http://localhost:5000/Create_Account". 
// No authentication required

router.post('/', async (req, res) => {
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({ 'val': [{ "msg": 'Not a valid email ! !' }] })
    }
    if (req.body.name == "") {
        return res.status(400).json({ 'val': [{ "msg": 'Name must not be empty !' }] })
    }
    if (req.body.password === "") {
        return res.status(400).json({ 'val': [{ "msg": "Password can't be blank !" }] })
    }
    if (req.body.date_of_birth === "-undefined-undefined") {
        return res.status(400).json({ 'val': [{ "msg": "Please enter your date of birth !" }] })
    }

    // Check if age is between 18 and 65
    const age = moment().diff(moment(req.body.date_of_birth), 'years');
    if (age < 18 || age > 65) {
        return res.status(400).json({ 'val': [{ "msg": 'Age should be between 18 and 65 !' }] })
    }

    const user_exist = await User.findOne({ email: req.body.email })
    if (user_exist) {
        return res.status(400).json({ 'val': [{ "msg": 'email already exists !' }] })
    }

    // Save user profile into the database
    try {
        const salt = await bcrypt.genSalt(10)     // creating salt value. The number 10 represents the number of iterations the algorithm performs to generate the salt. Higher numbers increase the computational complexity and make password cracking more difficult. bcrypt.gensalt() returns a promise, hence use await before it

        secPass = await bcrypt.hash(req.body.password, salt) // creating hash value of password + salt. bcrypt.hash() returns a promise, hence use await before it

        // Create a new user profile as well as his entry in 'Registration' database
        const user_profile = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            date_of_birth: req.body.date_of_birth
        })

        const registration = await Register.create({
            user_id: user_profile.id,
            batch: '6 A.M - 7 A.M',     // set any random value
            last_registered: "1970-10-30"    // Set an old date which is not of the present date's month so that the user will be able to register for the yoga the very first time     
        })

        const data = {      // token id will be generated on the basis of id of the user profile in MongoDB database
            user: { user_profile_id: user_profile.id }
        }
        const jwt_auth_token = jwt.sign(data, JWT_SECRET)  // sync method, no need to use await
        res.status(200).send({ "val": { 'auth_token': jwt_auth_token, 'register_id': registration.id } })        // send token id and 'Registration' id to the user
    }
    catch (error) {
        return res.status(400).json({ 'val': [{ "msg": 'Some internal error occured !' }] })
    }
}
)

module.exports = router