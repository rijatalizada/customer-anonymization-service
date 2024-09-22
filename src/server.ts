import express from "express";
import { connectDB } from "./config/connect";
import * as dotenv from "dotenv";
import generateCustomers, {
  watchCustomerChanges,
} from "./services/customers.service";
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

connectDB();

watchCustomerChanges();

setInterval(() => {
  console.log("Interval started")
  generateCustomers();
}, 2000);


app.listen(PORT, () => {
  console.log(`app is listening to the port ${PORT}`);
});
