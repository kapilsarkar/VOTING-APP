const jwt = require("jsonwebtoken");

const jwtAuthMiddleWare = (req, res, next) => {
  //First check the request header has authorization or not
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  //Extract the jwt token from the jwt header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //Verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

//Function to generate jwt token
const generateToken = (userData) => {
  //Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 });
};

module.exports = { jwtAuthMiddleWare, generateToken };


