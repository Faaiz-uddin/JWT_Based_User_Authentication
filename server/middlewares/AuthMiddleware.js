const User = require("../models/RegistrationModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // Import dotenv package
dotenv.config(); // Load environment variables from .env file
const SECRET_KEY = process.env.TOKEN_KEY;



const userVerification  = async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ message: "A token is required for authentication" });  
      }
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        if (decoded) return res.json({ status: true, user: decoded.email })
        else return res.json({ status: false })
        //req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
   
    
  };
  
  module.exports = { userVerification  };