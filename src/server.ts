import express from "express";
import { connectDB } from "./config/connect";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

const start = () => {
  try {
    app.listen(PORT, () => {
      connectDB();
      console.log(`app is listening to the port ${PORT}`);
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

start();
