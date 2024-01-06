
const user = require('../models/auth-model')
const jwt = require('jsonwebtoken')
const { UnAuthenticatedError } = require('../error')

const authMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthenticatedError('Authentication invalid');
    }
    const token = req.headers.authorization.split(' ')[1];


    try{
        const payload =  await jwt.verify(token,process.env.JWT_PASSWORD )
        req.user = {userId:payload.userId,name:payload.name}
        next()

    }catch(e){

        throw new UnAuthenticatedError("Invalid Authentication")
    }
}

module.exports = authMiddleware