import { endOfMonth, parseISO, startOfMonth } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../../../lib/config/db-connect';
import Account from '../../../lib/models/account';
import Expense from '../../../lib/models/expense';
import User from '../../../lib/models/user';
import validate from '../../../lib/utils/validate';
import { expenseSchema } from '../../../lib/utils/yup-schema';
import { authenticated, getDecodedUserId } from '../authenticated';

const getExpenses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { account_id, date, user_id, category } = req.query;

    const userId = await getDecodedUserId(req, res);
    const user = await User.findById(userId); // this is to initialize the User model for populate, otherwise userId can be used directly
    const account = await Account.findOne({ _id: account_id });

    if (!user || !account || !account.users.includes(userId as string)) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    const monthStart = startOfMonth(parseISO(date as string));
    const monthEnd = endOfMonth(parseISO(date as string));

    let filters: any = { account: account_id };

    if (date) {
      filters.date = { $gte: monthStart, $lte: monthEnd };
    }
    if (user_id) {
      filters.user = user_id;
    }
    if (category) {
      filters.category = category;
    }

    const expenses = await Expense.find(filters).sort({ date: 'asc' }).populate('user', 'name');

    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const addExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const errors = await validate(expenseSchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const userId = await getDecodedUserId(req, res);

    const { date, account, category, amount, details, description } = req.body;

    const expense = await Expense.create({
      _id: uuidv4(),
      user: userId,
      account: account,
      date,
      category,
      amount,
      description,
      details,
    });

    res.status(200).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getExpenses(req, res);
    case 'POST':
      return await addExpense(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
