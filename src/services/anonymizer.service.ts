import mongoose from 'mongoose';
import { AnonymizedCustomer, Customer } from '../models/customer';
import type { ICustomer } from '../types/customer';
import generateDeterministicString, {
  anonymizeEmail,
} from '../utils/anonymize-string';

export const anonymizeCustomer = async (customer: ICustomer) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const anonymizedCustomer = new AnonymizedCustomer({
      _id: customer._id,
      firstName: generateDeterministicString(customer.firstName),
      lastName: generateDeterministicString(customer.lastName),
      email: anonymizeEmail(customer.email),
      address: {
        ...customer.address,
        line1: generateDeterministicString(customer.address.line1),
        line2: generateDeterministicString(customer.address.line2),
        postcodee: generateDeterministicString(customer.address.postcodee),
      },
    });

    await anonymizedCustomer.save();

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
  } finally {
    session.endSession();
  }
};
