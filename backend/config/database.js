const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MONGO DB CONNECT: ${connection.connection.host}`.cyan.underline);
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;