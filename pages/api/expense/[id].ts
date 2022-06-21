import type { NextApiRequest, NextApiResponse } from 'next';
import Expense from '../../../lib/models/expense';
import dbConnect from '../../../lib/config/db-connect';
import validate from '../../../lib/utils/validate';
import { expenseSchema } from '../../../lib/utils/yup-schema';
import { authenticated, getDecodedUserId, hasAccess } from '../authenticated';
import User from '../../../lib/models/user';
import Account from '../../../lib/models/account';

const getExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);
    const user = await User.findById(userId); // this is to initialize the User model for populate, otherwise userId can be used directly
    const expense = await Expense.findById(req.query.id).populate('user', 'name');

    if (!expense) {
      return res.status(200).json({ error: 'Expense not found' });
    }

    const account = await Account.findOne({ _id: expense.account });

    if (!user || !account || !account.users.includes(userId as string)) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    res.status(200).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const updateExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const expense = await Expense.findById(req.query.id);

    if (!expense) {
      return res.status(200).send({ error: 'Expense not found' });
    }

    const authorized = await hasAccess(userId, expense?.created_by, expense?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    const errors = await validate(expenseSchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const { user, date, account, category, amount, details, description } = req.body;

    await expense.updateOne({
      account,
      date,
      category,
      amount,
      user,
      details,
      description,
      updated_by: userId,
    });

    const updatedExpense = await Expense.findById(req.query.id);

    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const deleteExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const expense = await Expense.findById(req.query.id);

    if (!expense) {
      return res.status(200).send({ error: 'Expense not found' });
    }

    const authorized = await hasAccess(userId, expense?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    await expense.delete();

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getExpense(req, res);
    case 'PUT':
      return updateExpense(req, res);
    case 'DELETE':
      return deleteExpense(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
