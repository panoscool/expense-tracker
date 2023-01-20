import { InferType } from 'yup';
import { accountSchema } from '../config/yup-schema';
import { User } from './user';

export type AccountCreate = InferType<typeof accountSchema>;

export interface Account {
  _id: string;
  name: string;
  currency: string;
  description: string;
  user: string;
  users: User[];
  is_default: boolean;
}

export interface AccountUpdate extends Partial<Account> {
  email?: string;
}
