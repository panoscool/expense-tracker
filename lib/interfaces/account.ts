import { InferType } from 'yup';
import { accountSchema } from '../utils/yup-schema';
import { User } from './user';

export type AccountCreate = InferType<typeof accountSchema>;

export interface Account {
  _id: string;
  name: string;
  description: string;
  user: string;
  users: User[];
}
