require('express-async-errors')
const { StatusCodes } = require('http-status-codes')
const UserSchema = require('../models/auth-model')
const  BadRequestError = require('../error/bad-request')
const  UnAuthenticatedError = require('../error/unauthenticated')

const updateUser = async(req,res)=>{
  const user = await UserSchema.findByIdAndUpdate({_id:req.body.id},{...req.body},{
    new: true,
    runValidators: true,
  }) 

 res.status(StatusCodes.OK).json({
  data:"data needs to be send",
  "msg":"Data updated successfully",
  "status code":StatusCodes.OK,
  "success":true,
})

}

module.exports = {updateUser}






