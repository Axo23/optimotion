import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI!;
if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
