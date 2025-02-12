import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URL : process.env.MONGO_URI;

if (!uri) {
  throw new Error(`${process.env.NODE_ENV === "test" ? "TEST_DB_URL" : "MONGO_URI"} is not defined in the environment variables`);
}

// Connect to MongoDB database
export async function connectDB() {
  try {
    await mongoose.connect(uri as string, {
      dbName: process.env.NODE_ENV === "test" ? "optimotion_test" : "optimotion",
    });
    console.log(`Connected to MongoDB (${process.env.NODE_ENV === "test" ? "Test" : "Production"} Database)`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
