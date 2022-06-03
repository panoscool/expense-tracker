import { InferType } from 'yup';
import { categorySchema } from '../utils/yup-schema';

export type CategoryCreate = InferType<typeof categorySchema>;

export interface Category {
  _id: string;
  labels: string[];
  user: string;
}
