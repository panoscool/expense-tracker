import { InferType } from 'yup';
import { accountSchema } from '../config/yup-schema';
import { User } from './user';

export type AccountCreate = InferType<typeof accountSchema>;

export interface Account {
  _id: string;
  name: string;
  currency: string;
  description: string | null;
  user: string;
  users: User[];
}
