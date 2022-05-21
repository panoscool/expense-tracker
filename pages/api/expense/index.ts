import type { NextApiRequest, NextApiResponse } from 'next';
import Expense from '../../../lib/models/expense';
import dbConnect from '../../../lib/utils/db-connect';
import { authenticated } from '../authenticated';

type Data = {
  name: string;
};

const getExpenses = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addExpense = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await Expense.create(req.body);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authenticated(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getExpenses(req, res);
    case 'POST':
      return addExpense(req, res);
    default:
      return res.status(405).end();
  }
});
