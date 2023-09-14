const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/RegistrationModel");
const { validationResult } = require("express-validator");

const Registration = async (req, res) => {
  try {
    const { firstname, lastname, email, password, createdAt } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already registered" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const Registeration = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt,
    });
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      Registeration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const Login = async (req, res) => {
  const SECRET_KEY = process.env.TOKEN_KEY; // Use environment variable for the secret key
  try {
    const { email, password } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Fix typo here
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email" }); // Return a 401 status for authentication failure
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect password" }); // Return a 401 status for authentication failure
    }

    // Create a JWT token with user_id and email as claims
    const token = jwt.sign(
      { user_id: user._id, 
        email: user.email,
        fname: user.firstname,
        lname: user.lastname
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
      
    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 2 * 60 * 60 * 1000 }); // Cookie expires in 2 hours    

    // Send a success response along with the token
    res.json({ message: "Login successful", token }); // Include the token in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Registration, Login };
