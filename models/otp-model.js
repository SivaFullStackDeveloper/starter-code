const mongoose = require('mongoose')

const OTPSchema = new mongoose.Schema({

        email:{
            type:String,
            required:[true, "Please Provide email "],
            match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,"Please provide valid email "],
            unique:true,
    
    },
    otp:{
        type:Number,
        required:[true, "Please Provide OTP"],
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '10m' },
      },
})

module.exports = mongoose.model('OTPSchema',OTPSchema)