export type ICustomer = {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    postcodee: string;
    city: string;
    state: string;
    country: string;
  };
  createdAt?: Date;
};
