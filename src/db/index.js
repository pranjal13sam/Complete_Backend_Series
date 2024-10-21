import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv'


const connectDB = async () => {
    try {
      const connectionInstance = await mongoose.connect(
        `${process.env.MONGODB_URI}/${DB_NAME}`, // Use process.env.MONGODB_URL
      );
      console.log(`MONGODB CONNECTED !! ${connectionInstance.connection.host}`);
    } catch (error) {
      console.error(error);
      process.exit(1)
    }
  };


export default connectDB