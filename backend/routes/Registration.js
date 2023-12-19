const express = require('express')
const router = express.Router()
const Register = require('../models/Registration')   // for utilizing 'Registration' schema and creating a new user's registration in the database based upon the inputs received from the POST request
const { body, validationResult } = require('express-validator')
const fetch_user_id = require('../middleware/fetch_user_id')
const { ObjectId } = require('mongodb');        // to validate whether the mongodb id passed as request parameter is valid or not


// Register user profile from his JWT token, and batch
// PUT Request: "http://localhost:5000/Register_User/id".
// Here, id is the index id of 'Registration' mongodb database, not of the 'User_Profile' mongodb database.
// Authentication required

router.put('/:id', fetch_user_id, [
    body('batch', "Please choose the required slot !").notEmpty()],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ 'val': [{ "msg": 'Not a valid database id !' }] })
        }

        const registered_user = await Register.findById(req.params.id)      // req.params.id contains the 'Registrations' database id attached to the end of the endpoint link by the user

        // const registered_user = null
        if (!registered_user) {
            return res.status(404).json({ 'val': [{ "msg": 'Not Found !' }] })
        }
        else if (registered_user.user_id.toString() !== req.user.user_profile_id) {        // => the current user is trying to register at someone's else 'Registration' database.
            return res.status(401).json({ 'val': [{ "msg": 'Not Allowed !' }] })
        }
        else if (registered_user.last_registered.getMonth() === new Date().getMonth()) {         // If the user has already registered this month
            // today's date
            const today = new Date();
            // Get next month's index(0 based)
            const nextMonth = today.getMonth() + 1;
            // Get year
            const year = today.getFullYear() + (nextMonth === 12 ? 1 : 0);
            // Get first day of the next month
            const firstDayOfNextMonth = new Date(year, nextMonth % 12, 1);

            const month = firstDayOfNextMonth.getMonth() + 1; // Adding 1 because getMonth() returns zero-based months (0 for January)
            const day = firstDayOfNextMonth.getDate();
            const fullDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

            return res.status(409).json({ 'val': [{ "msg": `You have already registered, come back on ${fullDate} !` }] })
        }
        else {       // Update the registered date and batch
            const new_registration = {
                "user_id": req.user.user_profile_id,
                "batch": req.body.batch,
                "last_registered": new Date()
            }
            const updated_registration = await Register.findByIdAndUpdate(req.params.id, { $set: new_registration }, { new: true })        // when {new:true} this method will return us the updated document and when {new:false} this method will return the document as it was before the update.
            return res.status(200).send({ "val": "Registration successful !" })
        }
    }
)

module.exports = router