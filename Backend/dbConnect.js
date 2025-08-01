import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.info("Connected to Database Successfully!");
  } catch (error) {
    console.error("Database Connection Error: ", error);
  }
}

export default connectDb;