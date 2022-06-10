import { User } from '../interfaces/user';

export const defaultCategories: string[] = [
  'transportation',
  'entertainment',
  'supermarket',
  'shopping',
  'water',
  'electricity',
  'telecommunication',
  'education',
  'beauty',
  'health',
  'gift',
  'other',
];

export const defaultAccount = (user: User) => ({
  user: user._id,
  name: 'Default',
  users: [user._id],
  description: 'Default account',
});
