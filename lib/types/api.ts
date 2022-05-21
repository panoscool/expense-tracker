import { InferType } from 'yup';
import { registerSchema, loginSchema } from '../utils/yup-schema';

export type ErrorRes = {
  message: string | null;
};

export type Auth = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = Auth | ErrorRes;
export type RegisterReq = InferType<typeof registerSchema>;
export type LoginReq = InferType<typeof loginSchema>;
