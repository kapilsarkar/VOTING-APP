const express = require("express");
const router = express.Router();
const User = require('./../models/user');

//POST router to add a User
router.post('/signup', async(req,res)=>{
    try{
     const data = req.body;  // Assuming the request body contains the user data

     //Create a new User document using the mongoose model
     const newUser = new User(data);
     
     
    //Save the newUser to the database:
     const response = await newUser.save();
     console.log("User Data Saved");
    }
    catch(err){
        console.log(err)
    }
})