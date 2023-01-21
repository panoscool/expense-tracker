import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import User from '../../../lib/models/user';
import { authenticated, getDecodedUserId } from '../helpers';
import {
  getExpensesPerDay,
  getExpensesPerMonth,
  getExpensesPerMonthAndCategory,
  getExpensesPerMonthAndUser,
  getExpensesPerQuarter,
  getExpensesPerWeek,
} from './totals';

const getStatistics = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const { accountId } = req.body; // change it to req.query.id

    const category = await getExpensesPerMonthAndCategory(accountId);
    const userE = await getExpensesPerMonthAndUser(accountId);

    const day = await getExpensesPerDay(accountId);
    const week = await getExpensesPerWeek(accountId);
    const month = await getExpensesPerMonth(accountId);
    const quarter = await getExpensesPerQuarter(accountId);

    console.log(
      'day ->',
      day,
      'week ->',
      week,
      'month ->',
      month,
      'quarter ->',
      quarter,
      'category ->',
      category,
      'user ->',
      userE,
    );

    res.status(200).json([]);
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
