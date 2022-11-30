import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import User from '../../../lib/models/user';
import Expense from '../../../lib/models/expense';
import Account from '../../../lib/models/account';
import { authenticated, getDecodedUserId } from '../helpers';

// POST /api/analytics
const getExpensesByAccountAndMonth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // get all expenses by account and month
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date('2021-01-01'),
            $lte: new Date('2021-01-31'),
          },
        },
      },
      {
        $group: {
          _id: '$account',
          total: { $sum: '$amount' },
        },
      },
      {
        $lookup: {
          from: 'accounts',
          localField: '_id',
          foreignField: '_id',
          as: 'account',
        },
      },
      {
        $unwind: '$account',
      },
      {
        $project: {
          _id: 0,
          account: 1,
          total: 1,
        },
      },
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      return await getExpensesByAccountAndMonth(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
