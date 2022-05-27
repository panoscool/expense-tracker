import { InferType } from 'yup';
import { registerSchema, loginSchema } from '../utils/yup-schema';

export type ErrorRes = {
  error: string | null;
};

export type SuccessRes = {
  message: string;
};

export type Auth = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = Auth | SuccessRes | ErrorRes;
export type RegisterReq = InferType<typeof registerSchema>;
export type LoginReq = InferType<typeof loginSchema>;
