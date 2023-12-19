// This file exports the below function to connect to mongodb database

const mongoose = require('mongoose')
// const mongoURI = "mongodb://0.0.0.0:27017/";
const mongoURI = "mongodb+srv://user_1:bPEc9hHrif7WEpGN@cluster0.txgrba7.mongodb.net/";
const connect_to_mongo = async () => {
    await mongoose.connect(mongoURI).then(() => console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}

module.exports = connect_to_mongo