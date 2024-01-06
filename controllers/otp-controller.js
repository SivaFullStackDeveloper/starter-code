const nodeMailer =  require('nodemailer')
const UserSchema = require('../models/auth-model')
const OTPSchema = require('../models/otp-model')
const bcrypt = require('bcryptjs')
const speakeasy = require('speakeasy');
const { StatusCodes } = require('http-status-codes');


const secret = speakeasy.generateSecret({ length: 20 }); 

const code = speakeasy.totp({ 
    secret: secret.base32, 
    encoding: 'base32'
}); 


var transporter = nodeMailer.createTransport({
service:'gmail',
auth:{
    user:process.env.GMAIL,
    pass:process.env.GMAIL_PASSWORD
}
})



const sendOtp = async(req,res)=>{
    const {email} = req.body
    const user = await UserSchema.findOne({email})

    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:`user does not exists with this email  ${email}`,
            statusCode:StatusCodes.BAD_REQUEST,success:false
        })
    }else{
        const otpExists = await OTPSchema.findOne({email})
      if(otpExists){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:`OTP Already sent to the email. Please kindly check the Email.  or  Try Agin after 5 minutes`,
            statusCode:StatusCodes.BAD_REQUEST,success:false
        })
      }
        const otpSchema = await OTPSchema.create({
            email:email,
            otp:code
        })
        
        transporter.sendMail({
                from:'sivasivacoa@gmail.com',
                to:otpSchema.email,
                subject: 'Dailer OTP to Reset Password',
                text: 'Dailer OTP to Reset Password',
                html:`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Email Template</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                            background-color: #f4f4f4;
                        }
                
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                
                        h1 {
                            color: #333333;
                        }
                
                        p {
                            color: #666666;
                        }
                
                        .otp-code {
                            font-size: 24px;
                            font-weight: bold;
                            color: #007bff;
                        }
                
                        .note {
                            color: #999999;
                        }
                    </style>
                </head>
                <body>
                
                <div class="container">
                    <h1>OTP Verification for Dailer</h1>
                    <p>Hello Dailer,</p>
                    <p>Your One-Time Password (OTP) for verification is:</p>
                    <p class="otp-code">${code}</p>
                    <p class="note">Note: This OTP is valid for a short period. Do not share it with anyone.</p>
                    <p>Best regards,</p>
                    <p>Dailer App</p>
                </div>
                
                </body>
                </html>
                `
            },(err,info)=>{
            if(err){
                res.status(404).json({
                    //sorry something went wrong. Not able to deliver otp to the mail id 
                    "message":`sorry something went wrong. Not able to deliver otp to the mail id  ${email}`,
                    "status code":404
                })
            }
            else {
              
                res.status(200).json({
                    "message":`OTP Sent to email id  ${email}`,
                    "status code":200,
                    "success":true
                })
    
            }
        })

    }
}


const verifyOTP = async(req,res)=>{
 
    let {email,otp,newPassword} = req.body
    const salt = await bcrypt.genSalt(10)
    newPassword = await bcrypt.hash(newPassword,salt)
    const OTPSchemaGetter = await OTPSchema.findOne({email})
    if(!OTPSchemaGetter){
         res.status(StatusCodes.BAD_REQUEST).json({
            message:`OTP Expired or Something went wrong please Try After Sometime `,
            statusCode:StatusCodes.BAD_REQUEST,success:false
        })}else if(otp  !== OTPSchemaGetter.otp){
             res.status(StatusCodes.BAD_REQUEST).json({
                message:`OTP is invalid `,
                statusCode:StatusCodes.BAD_REQUEST,success:false
            })}

            if(otp === OTPSchemaGetter.otp){
                const user = await UserSchema.findOne({email:email}) 
                if(!user){
                    res.status(StatusCodes.BAD_REQUEST).json({
                       message:`OTP Expired or Something went wrong please Try After Sometime `,
                       statusCode:StatusCodes.BAD_REQUEST,success:false
                   })}
                await UserSchema.findByIdAndUpdate({_id:user._id},{password:newPassword},{
                    new: true,
                    runValidators: true,
                  })

               return res.status(StatusCodes.OK).json({
                   message:`Password Updated successfully`,
                   statusCode:StatusCodes.OK,success:true
               })}
        }  
 



module.exports = {sendOtp,verifyOTP}

