const express = require('express')
const router  = express.Router()
const {login,register,userAlreadyExists} = require('../controllers/auth-controller')

router.post('/userAlreadyExists',userAlreadyExists)
router.post('/login',login)
router.post('/register',register)

module.exports = router