const mongoose = require("mongoose")
require('dotenv').config();

const connectToMongo = async()=>{
    mongoose.connect(process.env.mongoDBURI, {dbName: 'inotebook'})
    console.log("Connected To Mongo Successfully!")
}

module.exports = connectToMongo;