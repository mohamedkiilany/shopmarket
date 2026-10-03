export interface Address {
  line1: string;
  city: string;
  zip: string;
  country: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}
