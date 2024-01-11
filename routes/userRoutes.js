const express = require('express')
const { getSignIn, getRegister, registerUser, signInUser } = require('../controllers/userController')
const router = express.Router()

router.route('/signin').get(getSignIn).post(signInUser)

router.route('/register').get(getRegister).post(registerUser)

module.exports = router