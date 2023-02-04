import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { expenseSchema } from '../../../lib/config/yup-schema';
import { validate } from '../../../lib/utils/validate';
import { hasAccountAccess } from '../account/helpers';
import * as AccountRepository from '../account/repository';
import { authenticated, getDecodedUserId } from '../helpers';
import { updatePayment } from '../payment/helpers';
import * as UserRepository from '../user/repository';
import * as Repository from './repository';

const getExpenses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const user = await UserRepository.getUserById(userId); // this is to initialize the User model for populate, otherwise userId can be used directly
    const account = await AccountRepository.getAccountById(req.query.account_id as string);

    if (!account) {
      return res.status(404).send({ error: 'Account not found' });
    }

    const accountAccess = await hasAccountAccess(account, user?._id);

    if (!accountAccess) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    const expenses = await Repository.getExpensesPopulated(req.query);

    res.status(200).json({ data: expenses });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const createExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const errors = await validate(expenseSchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const userId = (await getDecodedUserId(req, res)) as string;

    const { user_id, date, account_id, category, amount, details, description } = req.body;

    const expense = await Repository.createExpense({
      user: user_id || userId,
      account: account_id,
      date,
      category,
      amount,
      description,
      details,
      created_by: userId,
      updated_by: userId,
    });

    await updatePayment({ accountId: account_id, userId: user_id || userId, date });

    res.status(200).json({ data: expense });
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
      return await createExpense(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
