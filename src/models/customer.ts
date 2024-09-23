import mongoose, { mongo, Schema } from 'mongoose';
import type { ICustomer } from '../types/customer';

const CustomerSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
        required: true,
      },
      postcodee: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

export const Customer = mongoose.model<ICustomer>('customers', CustomerSchema);
export const AnonymizedCustomer = mongoose.model<ICustomer>(
  'anonymized_customers',
  CustomerSchema,
); // Since Customer and Anonymized Customer properties are the same, I didn't create an additional schema
