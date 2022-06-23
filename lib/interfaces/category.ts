import { InferType } from 'yup';
import { categorySchema } from '../config/yup-schema';

export type CategoryCreate = InferType<typeof categorySchema>;

export interface Category {
  _id: string;
  labels: string[];
  user: string;
}
