const jwt = require('jsonwebtoken')
const JWT_SECRET = "Harryisagoodb$oy"

const fetch_user_id = (req, res, next) => {
    // Get the user's database id from the JWT token passed as header to req
    const token = req.header('auth_token')
    if (!token) {     // if no 'auth_token' header is attached to the request body
        return res.status(401).json({ 'val': [{ "msg": 'Please authenticate using a valid token !' }] })
    }
    else {      // Attach the user's data (except user's password) to the request body
        try {        // verify whether the token id is correct or not

            const data = jwt.verify(token, JWT_SECRET)      //  data variable holds the decoded payload of the JWT. The payload typically contains information like user details, permissions, or any other data that was encoded into the JWT when it was initially signed.

            req.user = data.user     // because when you created JWT token in routes/Create_User_Profile.js, then the 'user' field of the data consisted of the user's profile id

            next()      // Run the next function as mentioned in the endpoint after middleware
        }
        catch (error) {
            return res.status(401).json({ 'val': [{ "msg": 'Please authenticate using a valid token !' }] })
        }
    }
}

module.exports = fetch_user_id