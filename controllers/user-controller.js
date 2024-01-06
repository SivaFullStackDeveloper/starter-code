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
  data: "Data needs to be send ", 
  "status code":StatusCodes.OK,
  "success":true,
})

}

module.exports = {updateUser}






