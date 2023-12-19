const connect_to_mongo = require('./db')
connect_to_mongo()
const express = require('express')
const cors = require("cors");

const app = express()

// The below line is required to allow cross - origin requests
// app.use(cors({
//     origin: 'http://localhost:3000',        // client port number = 3000
//     credentials: true, // If you're using credentials (e.g., cookies)
// }));

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration


const port = process.env.PORT || 5000;

app.use(express.json())      // middleware

// Available routes
app.use('/Login', require('./routes/Login'))

app.use('/Create_Account', require('./routes/Create_User_Profile'))      // Create_User_Profile is a js file that will process and return the output at this endpoint: http://localhost:5000/Create_User_Profile

app.use('/Register_User', require('./routes/Registration'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})