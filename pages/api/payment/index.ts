import { format, parseISO } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../../../lib/config/db-connect';
import { Expense } from '../../../lib/interfaces/expense';
import Account from '../../../lib/models/account';
import Payment from '../../../lib/models/payment';
import User from '../../../lib/models/user';
import { getGivingAndReceivingUsers } from '../../../lib/utils/expense-calculations';
import { authenticated, getDecodedUserId } from '../helpers';

interface Params {
  expenses: Expense[];
  accountId: string;
  userId: string;
  date: string;
}

export const updatePayment = async (params: Params) => {
  try {
    const { expenses, accountId, userId, date } = params;

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
  } catch (error) {
    console.error(error);
  }
};

const getPayments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { account_id, period } = req.query;

    const userId = await getDecodedUserId(req, res);
    const user = await User.findById(userId); // this is to initialize the User model for populate, otherwise userId can be used directly
    const account = await Account.findOne({ _id: account_id });

    if (!user || !account || !account.users.includes(userId as string)) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    let filters: any = { account: account_id };

    if (period) {
      filters.period = format(parseISO(period as string), 'MMMM-yyyy');
    }

    const payments = await Payment.find(filters)
      .populate({
        path: 'giving_users',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name email',
        },
      })
      .populate({
        path: 'receiving_users',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name email',
        },
      });

    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getPayments(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});