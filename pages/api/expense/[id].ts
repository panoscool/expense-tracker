import { format } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { expenseSchema } from '../../../lib/config/yup-schema';
import validate from '../../../lib/utils/validate';
import { hasAccountAccess } from '../account/helpers';
import * as AccountRepository from '../account/repository';
import { authenticated, getDecodedUserId, hasAccess } from '../helpers';
import { updateExpensePayment, updatePayment } from '../payment/helpers';
import * as UserRepository from '../user/repository';
import * as Repository from './repository';

const getExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const userId = (await getDecodedUserId(req, res)) as string;
    const user = await UserRepository.getUserById(userId); // this is to initialize the User model for populate, otherwise userId can be used directly
    const expense = await Repository.getExpensePopulatedById(id as string);

    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    const account = await AccountRepository.getAccountById(expense.account);

    if (!account) {
      return res.status(404).send({ error: 'Account not found' });
    }

    const accountAccess = await hasAccountAccess(account, user?._id);

    if (!accountAccess) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    res.status(200).json({ data: expense });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const updateExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const userId = (await getDecodedUserId(req, res)) as string;
    const expense = await Repository.getExpenseById(id as string);

    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    const authorized = await hasAccess(userId, expense?.created_by, expense?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    const errors = await validate(expenseSchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const { user_id, date, account_id, category, amount, details, description } = req.body;

    await Repository.updateExpenseById(id as string, {
      account: account_id,
      date,
      category,
      amount,
      user: user_id,
      details,
      description,
      updated_by: userId,
    });

    await updateExpensePayment({
      expense,
      userId: user_id || userId,
      accountId: account_id,
      date,
    });

    const updatedExpense = await Repository.getExpenseById(id as string);

    res.status(200).json({ data: updatedExpense });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const deleteExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const userId = (await getDecodedUserId(req, res)) as string;
    const expense = await Repository.getExpenseById(id as string);

    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    const authorized = await hasAccess(userId, expense?.created_by, expense?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    await Repository.deleteExpenseById(id as string);

    await updatePayment({
      accountId: expense.account,
      userId: userId,
      date: format(expense.date, 'yyyy-MM-dd'),
    });

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
