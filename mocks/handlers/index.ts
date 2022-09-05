import { accountHandlers } from './api/account';
import { categoryHandlers } from './api/category';
import { expenseHandlers } from './api/expense';
import { paymentHandlers } from './api/payment';
import { userHandlers } from './api/user';

export const handlers = [
  ...userHandlers,
  ...accountHandlers,
  ...categoryHandlers,
  ...expenseHandlers,
  ...paymentHandlers,
];
