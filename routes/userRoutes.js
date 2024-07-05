const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

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

    // Extract user id from decoded token
    const userId = userData.id;

    // Find the user by id
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
