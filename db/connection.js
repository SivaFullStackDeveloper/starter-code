const mongoose = require('mongoose')
const connectToDb = async(url)=>{
    await mongoose.connect(url).then(()=>{
        console.log('connected to DB')
    })
}

module.exports = connectToDb