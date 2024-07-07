const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const { use } = require("passport");
const Candidate = require("./../models/candidate");

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user.role === "admin";
  } catch (err) {
    return false;
  }
};

//POST router to add a Candidate
router.post("/", async (req, res) => {
  try {
    if (!checkAdminRole(req.user.id))
      return res.status(404).json({ message: "User has not admin role" });
    const data = req.body; // Assuming the request body contains the candidate data

    //Create a new User document using the mongoose model
    const newCandidate = new Candidate(data);

    //Save the newUser to the database:
    const response = await newCandidate.save();
    console.log("Candidate Data Saved");

    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});
