import type { ICustomer } from '../types/customer';
import { faker } from '@faker-js/faker';
import { Customer } from '../models/customer';
import { anonymizeCustomer } from './anonymizer.service';
import mongoose from 'mongoose';

export const watchCustomerChanges = () => {
  const changeStream = Customer.watch();
  changeStream.on('change', async (change) => {
    if (
      change.operationType === 'insert' ||
      change.operationType === 'update'
    ) {
      const customer = await Customer.findById(change.documentKey._id);
      if (customer) {
        await anonymizeCustomer(customer);
      }
    }
  });
};

async function generateCustomers() {
  const session = await mongoose.startSession();
  session.startTransaction();

  const customers: ICustomer[] = [];
  const batchSize = Math.floor(Math.random() * 10) + 1;

  console.log(batchSize);
  try {
    for (let i = 0; i < batchSize; i++) {
      const customer: ICustomer = new Customer({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        address: {
          line1: faker.location.streetAddress(),
          line2: faker.location.secondaryAddress(),
          country: faker.location.country(),
          city: faker.location.city(),
          postcodee: faker.location.zipCode(),
          state: faker.location.state(),
        },
      });

      customers.push(customer);
    }

    await Customer.insertMany(customers);
    console.log('Customers inserted');
    await session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    console.log(error);
  } finally {
    session.endSession();
  }
}

export default generateCustomers;
