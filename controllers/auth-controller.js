require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const  BadRequestError = require('../error/bad-request')
const  UnAuthenticatedError = require('../error/unauthenticated')



const register = async(req,res)=>{

    const user = await UserSchema.create(req.body)
    const token =  user.createJwt(user._id,user.name)

    res.status(StatusCodes.CREATED).json({
        data:'data need to be send',
        "msg":"user registered successfully",
        "statusCode":StatusCodes.OK,
       })
}



const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError("Invalid credentials")
    }
    const user = await UserSchema.findOne({email})
    if(!user){
        throw new UnAuthenticatedError('Invalid Credentials')  
    }

    const isPassword = await user.comparePassword(password)
    if(!isPassword){
        throw new UnAuthenticatedError('Invalid Credentials')  
    }
 const token = user.createJwt(user._id,user.name)

    res.status(StatusCodes.OK).json({
        data:'data need to be send',
        "msg":"user loggedIn successfully",
        "statusCode":StatusCodes.OK,
        "success":true,

     })
}



module.exports = {login,register}