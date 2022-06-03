import { User } from './user';

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
