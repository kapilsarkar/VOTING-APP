const mongoose = require("mongoose");
require("dotenv").config();

//Define the MonGoDb connection URL :
const mongoURL = process.env.MONGODB_URL_LOCAL;
//const mongoURL = process.env.MONGODB_URL;

//Setup MongoDB connection :
mongoose.connect(mongoURL);

//Set the default connection :
//Mongoose maintains a default connection object representing the MongoDB connection :
const db = mongoose.connection;

//Default event listeners for database connection :
db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.error("MongoDbB connection error", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

module.exports = db;