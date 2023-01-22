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
