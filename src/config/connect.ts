import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log()
    const conn = await mongoose.connect(process.env.DB_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
