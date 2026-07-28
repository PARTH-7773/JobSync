import mongoose from "mongoose";
import config from "./ENV.config.js";

async function connectDB() {
    await mongoose.connect(config.MONGO_URI).then(()=>{
        console.log('Connect to DB')
    }).catch((err)=>{
        console.log("Erros in database connection", err.message)
    })
}

export default connectDB;