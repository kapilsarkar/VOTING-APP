const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const jwtAuthMiddleware = require('./jwt');


app.get("/", (req, res) => {
  res.send("Welcome to Online Voting Application");
});

//Import the Router Files
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require('./routes/candidateRoute');

//Use the router
app.use("/user", userRoutes);
app.use('./candidate',jwtAuthMiddleware,candidateRoutes);


app.listen(PORT, () => {
  console.log("Server is Listening at port:5000");
});
