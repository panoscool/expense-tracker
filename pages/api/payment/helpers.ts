import { format, isSameMonth, parseISO } from 'date-fns';
import { Expense } from '../../../lib/interfaces/expense';
import { getGivingAndReceivingUsers, getTotalUsers } from '../../../lib/utils/expense-calculations';
import * as ExpenseRepository from '../expense/repository';
import * as Repository from './repository';

interface Params {
  accountId: string;
  userId: string;
  date: string;
}

export async function updatePayment(params: Params) {
  try {
    const { accountId, userId, date } = params;

    const expenses = await ExpenseRepository.getExpenseByAccountIdAndDates(accountId, date);

    const totalUsers = getTotalUsers(expenses);

    if (totalUsers > 1) {
      const [giving, receiving] = getGivingAndReceivingUsers(expenses);

      const payment = await Repository.getPaymentByAccountIdAndPeriod(accountId, date);

      if (!payment) {
        await Repository.createPayment({
          account: accountId,
          period: date,
          settled: false,
          giving_users: giving,
          receiving_users: receiving,
          created_by: userId,
          updated_by: userId,
        });
      } else {
        await Repository.updatePaymentById(payment._id, {
          giving_users: giving,
          receiving_users: receiving,
          updated_by: userId,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

interface UpdateExpensePayment {
  expense: Expense;
  accountId: string;
  userId: string;
  date: string;
}

export async function updateExpensePayment(params: UpdateExpensePayment) {
  const { expense, accountId, userId, date } = params;

  const sameAccount = expense.account.toString() === accountId;
  const sameMonth = isSameMonth(expense.date, parseISO(date));
  const formattedDate = format(expense.date, 'yyyy-MM-dd');

  if (!sameAccount && !sameMonth) {
    await updatePayment({
      accountId: expense.account,
      userId: userId,
      date: formattedDate,
    });
  }
  if (!sameAccount && sameMonth) {
    await updatePayment({
      accountId: expense.account,
      userId: userId,
      date,
    });
  }
  if (sameAccount && !sameMonth) {
    await updatePayment({
      accountId: accountId,
      userId: userId,
      date: formattedDate,
    });
  }

  await updatePayment({
    accountId: accountId,
    userId: userId,
    date,
  });
}
