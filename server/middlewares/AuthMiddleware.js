const User = require("../models/RegistrationModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // Import dotenv package
dotenv.config(); // Load environment variables from .env file
const SECRET_KEY = process.env.TOKEN_KEY;



const userVerification = async (req, res) => {
  const token = req.cookies.token;
  //console.log("Faaiz"+token);
  
  if (!token) {
    return res.status(401).json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded) {
      return res.json({ status: true, email: decoded.email,fname: decoded.fname ,lname: decoded.lname });
    } else {
      return res.status(401).json({ message: "Invalid Token" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
  
  module.exports = { userVerification  };