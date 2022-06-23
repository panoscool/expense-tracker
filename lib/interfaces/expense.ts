import { InferType } from 'yup';
import { expenseSchema } from '../config/yup-schema';
import { User } from './user';

export type ExpenseCreate = InferType<typeof expenseSchema>;

export interface Expense {
  _id: string;
  date: string;
  account: string;
  category: string;
  amount: number;
  details: string;
  description: string;
  user: User;
}

export interface ExpensesPerUser {
  id: string;
  name: string | undefined;
  amount: number;
}

export interface ExpensesFilters {
  date: Date;
  user_id: string | null;
  category: string | null;
}
