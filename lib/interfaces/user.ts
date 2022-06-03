import { InferType } from 'yup';
import { registerSchema, loginSchema } from '../utils/yup-schema';

export type UserRegister = InferType<typeof registerSchema>;
export type UserLogin = InferType<typeof loginSchema>;

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface DecodedToken {
  sub: string;
  name: string;
  email: string;
}

export interface Auth extends Partial<User> {
  id: string;
}
