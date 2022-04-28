const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const User = require('../models/user');
const authController = require('../controller/authController')
const bcrypt = require('bcrypt')

/* LOGIN ROUTE */

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/getUser', authController.getUser)

module.exports = router;