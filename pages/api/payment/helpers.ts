import { endOfMonth, format, parseISO, startOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Expense from '../../../lib/models/expense';
import Payment from '../../../lib/models/payment';
import { getGivingAndReceivingUsers, getTotalUsers } from '../../../lib/utils/expense-calculations';

interface Params {
  accountId: string;
  userId: string;
  date: string;
}

export const updatePayment = async (params: Params) => {
  try {
    const { accountId, userId, date } = params;

    const expenses = await Expense.find({
      account: accountId,
      date: {
        $gte: startOfMonth(parseISO(date)),
        $lte: endOfMonth(parseISO(date)),
      },
    });

    const totalUsers = getTotalUsers(expenses);

    if (totalUsers > 1) {
      const [giving, receiving] = getGivingAndReceivingUsers(expenses);

      const payment = await Payment.findOne({
        account: accountId,
        period: format(parseISO(date), 'MMMM-yyyy'),
      });

      if (!payment) {
        await Payment.create({
          _id: uuidv4(),
          account: accountId,
          period: format(parseISO(date), 'MMMM-yyyy'),
          settled: false,
          giving_users: giving,
          receiving_users: receiving,
          created_by: userId,
          updated_by: userId,
        });
      } else {
        await Payment.updateOne(
          { _id: payment._id },
          {
            $set: {
              giving_users: giving,
              receiving_users: receiving,
              updated_by: userId,
            },
          },
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};
