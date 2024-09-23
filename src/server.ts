import express from 'express';
import { connectDB } from './config/connect';
import * as dotenv from 'dotenv';
import generateCustomers, {
  watchCustomerChanges,
} from './services/customers.service';
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

const startApp = async () => {
  try {
    await connectDB();

    watchCustomerChanges();

    setInterval(() => {
      console.log('Interval started');
      generateCustomers();
    }, 200);

    app.listen(PORT, () => {
      console.log(`app is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the app:', error);
  }
};

startApp();
