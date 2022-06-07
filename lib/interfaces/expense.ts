import { InferType } from 'yup';
import { expenseSchema } from '../utils/yup-schema';
import { User } from './user';

export type ExpenseCreate = InferType<typeof expenseSchema>;

export interface Expense {
  id: string;
  date: string;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
  user: User;
}

export interface ExpensesPerUser {
  id: string;
  name: string | undefined;
  amount: number;
}
