import mongoose from "mongoose";
import { AnonymizedCustomer, Customer } from "../models/customer";
import { ICustomer } from "../types/customer";
import generateDeterministicString from "../utils/anonymize-string";

export const anonymizeCustomer = async (customer: ICustomer) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const anonymizedCustomer = new AnonymizedCustomer({
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
  } finally {
    session.endSession();
  }
};

const anonymizeEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  return `${generateDeterministicString(localPart)}@${domain}`;
};
