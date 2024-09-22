import { MongoClient } from "mongodb";
import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI as string);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
