import { endOfMonth, format, parseISO, startOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import ExpenseModel from '../../../lib/models/expense';
import PaymentModel from '../../../lib/models/payment';
import { getGivingAndReceivingUsers, getTotalUsers } from '../../../lib/utils/expense-calculations';

interface Params {
  accountId: string;
  userId: string;
  date: string;
}

export async function updatePayment(params: Params) {
  try {
    const { accountId, userId, date } = params;

    const expenses = await ExpenseModel.find({
      account: accountId,
      date: {
        $gte: startOfMonth(parseISO(date)),
        $lte: endOfMonth(parseISO(date)),
      },
    });

    const totalUsers = getTotalUsers(expenses);

    if (totalUsers > 1) {
      const [giving, receiving] = getGivingAndReceivingUsers(expenses);

      const payment = await PaymentModel.findOne({
        account: accountId,
        period: format(parseISO(date), 'MMMM-yyyy'),
      });

      if (!payment) {
        await PaymentModel.create({
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
        await PaymentModel.updateOne(
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
}
