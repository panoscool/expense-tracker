import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import User from '../../../lib/models/user';
import Expense from '../../../lib/models/expense';
import { authenticated, getDecodedUserId } from '../helpers';
import { endOf6Months, startOf6Months } from '../../../lib/utils/date';
import { isValid, parseISO } from 'date-fns';

const getStatistics = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const { accountId, dateFrom, dateTo, groupBy } = req.body;

    const ID = {
      date: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
      category: '$category',
      user: '$user',
    };

    const fromDate = isValid(parseISO(dateFrom)) ? parseISO(dateFrom) : startOf6Months;
    const toDate = isValid(parseISO(dateTo)) ? parseISO(dateTo) : endOf6Months;

    const expenses = await Expense.aggregate([
      {
        $match: {
          user: user._id,
          account: accountId,
          created_at: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: (ID as any)[groupBy],
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      return await getStatistics(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
