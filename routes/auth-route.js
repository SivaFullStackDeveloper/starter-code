const express = require('express')
const router  = express.Router()
const {sendOtp,verifyOTP} = require('../controllers/otp-controller')
const {login,register} = require('../controllers/auth-controller')


router.post('/login',login)
router.post('/register',register)
router.post('/sendOTP',sendOtp)
router.post('/verifyOTP',verifyOTP)

module.exports = router