const express = require('express');
const router = express.Router(); // Use 'express.Router()' to create a router instance
const RegistrationLoginController = require('../controllers/RegistrationLoginController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
// Validation middleware
const registrationValidation = [
    body('firstname')
      .notEmpty()
      .withMessage('First name is required'),
  
    body('lastname')
      .notEmpty()
      .withMessage('Last name is required'),
  
    body('email')
      .isEmail()
      .withMessage('Invalid email address'),
  
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];

  const loginValidation = [
    body('email')
      .isEmail()
      .withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];

router.post('/registration', registrationValidation, RegistrationLoginController.Registration);
router.post('/login',loginValidation, RegistrationLoginController.Login);
router.post('/user',AuthMiddleware.userVerification);
module.exports = router;