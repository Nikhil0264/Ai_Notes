import mongoose from "mongoose";
import { MONGODB_URL } from "../env.js";

const connectDB = async()=>{
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("database connected successfully");
    }catch(error){
        console.error("Databse failed to connect",error);
        process.exit(1);
    }
}

export default connectDB;