import express from "express";
import { connectDB } from "./config/connect";
import * as dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`App listens to port ${PORT}`);
});
