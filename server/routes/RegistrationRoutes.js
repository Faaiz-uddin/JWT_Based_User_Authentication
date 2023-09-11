const express = require('express');
const router = express.Router(); // Use 'express.Router()' to create a router instance
const RegistrationLoginController = require('../controllers/RegistrationLoginController');

router.post('/registration', RegistrationLoginController.Registration);
router.post('/login', RegistrationLoginController.Login);

module.exports = router;