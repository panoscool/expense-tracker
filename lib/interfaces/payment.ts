import { User } from './user';

type Payable = { amount: number; user: User }[];

export interface Payment {
  _id: string;
  account: string;
  period: string;
  settled: boolean;
  giving_users: Payable;
  receiving_users: Payable;
}
