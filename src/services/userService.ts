import type { User } from '@/types';
import { delay } from './api';

const mockUser: User = {
  id: 'u-1',
  firstName: 'Sara',
  lastName: 'Hassan',
  email: 'sara.hassan@example.com',
  phone: '+20 100 555 0142',
  address: { line1: '12 Nile St', city: 'Ismailia', zip: '41511', country: 'Egypt' },
};

export async function getCurrentUser(): Promise<User> {
  return mockUser;
}

export async function updateUser(values: Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'>): Promise<User> {
  await delay(500);
  return { ...mockUser, ...values };
}
