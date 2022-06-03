import type { NextApiRequest, NextApiResponse } from 'next';
import { parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import Account from '../../../lib/models/account';
import Expense from '../../../lib/models/expense';
import dbConnect from '../../../lib/utils/db-connect';
import { expenseSchema } from '../../../lib/utils/yup-schema';
import { authenticated, getDecodedUserId } from '../authenticated';
import validate from '../../../lib/utils/validate';

const getExpenses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accountId = await Account.findById(req.query.id);

    const monthStart = startOfMonth(parseISO(req.query.date as string));
    const monthEnd = endOfMonth(parseISO(req.query.date as string));

    const expenses = await Expense.find({
      account: accountId,
      date: { $gte: monthStart, $lte: monthEnd },
    })
      .sort({ date: 'desc' })
      .populate('user', 'name');

    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
};

const addExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const errors = await validate(expenseSchema, req.body);

    if (errors) {
      return res.status(400).json({ error: errors });
    }

    const userId = await getDecodedUserId(req, res);

    const { date, account, category, amount, note, description } = req.body;

    const expense = await Expense.create({
      _id: uuidv4(),
      user: userId,
      account: account,
      date,
      category,
      amount,
      note,
      description,
    });

    res.status(200).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
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
      return res.status(405).end('Method not allowed');
  }
});
