const mongoose = require("mongoose")
require('dotenv').config();
const mongoURI = process.env.mongoDBURI

const connectToMongo = async()=>{
    mongoose.connect(mongoURI)
    console.log("Connected To Mongo Successfully!")
}

module.exports = connectToMongo;    