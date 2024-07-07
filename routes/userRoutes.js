const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const { use } = require("passport");

//POST router to add a User
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the user data

    //Create a new User document using the mongoose model
    const newUser = new User(data);

    //Save the newUser to the database:
    const response = await newUser.save();
    console.log("User Data Saved");

    const payLoad = {
      id: response.id,
    };
    console.log(JSON.stringify(payLoad));
    const token = generateToken(payLoad);
    console.log("Token List:".token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    //Extract the username and password from request body
    const { aadharCardNo, password } = req.body;

    //Find the user by username
    const user = await User.findOne({ aadharCardNo: aadharCardNo });

    //If the user does not exists or the password does not match,return error
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ error: "Invalid addharCardNo or password" });
    }

    //Generate Token
    const payLoad = {
      id: user.id,
    };

    const token = generateToken(payLoad);

    //return token as response
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Profile Route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;

    const userId = userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Routes for password update
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user; //Extract the id from the token.
    const { currentPassword, newPassword } = req.body; //Extract the current and new Passwords form request body.

    //Find the user bu userID
    const user = await User.findById(userId);

    //If password does not match return error
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid username and password" });
    }

    //Update the user's password
    user.password = newPassword;
    await user.save();
    console.log("User Password Data Updated");
    res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
