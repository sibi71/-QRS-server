const mongoose = require("mongoose")

const url = "mongodb+srv://sibi:arunsibi@hospital-systems.wgqwd8m.mongodb.net/ors-db?retryWrites=true&w=majority";

mongoose.set("strictQuery",false)

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(url)
        console.log(`mongoDB connected ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;