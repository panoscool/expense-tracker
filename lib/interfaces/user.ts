import { InferType } from 'yup';
import { registerSchema, loginSchema } from '../config/yup-schema';

export type UserRegister = InferType<typeof registerSchema>;
export type UserLogin = InferType<typeof loginSchema>;
export type UserUpdate = InferType<typeof registerSchema>;

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface DecodedToken {
  sub: string;
  name: string;
  email: string;
}
