const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
const User = require("../models/RegistrationModel");

const Registration = async (req, res) => {
  try {
    const { firstname, lastname, email, password, createdAt } = req.body;

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
      email,
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
const Login = async (req, res) => {};

module.exports = { Registration, Login };
