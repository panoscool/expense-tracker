import { User } from '../interfaces/user';

export const defaultCategories: string[] = [
  'transportation',
  'entertainment',
  'supermarket',
  'shopping',
  'water',
  'electricity',
  'telecommunication',
  'subscription',
  'rent',
  'trips',
  'education',
  'beauty',
  'health',
  'gift',
  'other',
];

export const defaultAccount = (user: User) => ({
  user: user._id,
  name: 'Personal',
  users: [user._id],
  currency: 'EUR',
  description: 'Default personal account',
});
