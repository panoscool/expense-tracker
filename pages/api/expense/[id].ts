import type { NextApiRequest, NextApiResponse } from 'next';
import Expense from '../../../lib/models/expense';

const getExpense = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const expense = await Expense.findById(req.query.id);
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateExpense = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await Expense.findByIdAndUpdate(req.query.id, req.body);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteExpense = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await Expense.findByIdAndDelete(req.query.id);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case 'GET':
      return getExpense(req, res);
    case 'PUT':
      return updateExpense(req, res);
    case 'DELETE':
      return deleteExpense(req, res);
    default:
      return res.status(405).end();
  }
}
