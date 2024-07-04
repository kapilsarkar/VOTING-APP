const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

//Define the person schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    aadharCardNo:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['voter','user'],
        default:'voter',
    },
    isVoted:{
        type:Boolean,
        default:false,
    },

  });

const User = mongoose.model("User", userSchema);
module.exports = User;