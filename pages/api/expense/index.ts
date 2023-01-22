import { endOfMonth, parseISO, startOfMonth } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { expenseSchema } from '../../../lib/config/yup-schema';
import validate from '../../../lib/utils/validate';
import { authenticated, getDecodedUserId } from '../helpers';
import { updatePayment } from '../payment/helpers';
import * as Repository from './repository';
import * as UserRepository from '../user/repository';
import * as AccountRepository from '../account/repository';

const getExpenses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { account_id, date, user_id, category } = req.query;

    const userId = await getDecodedUserId(req, res);
    const user = await UserRepository.getUserById(userId as string); // this is to initialize the User model for populate, otherwise userId can be used directly
    const account = await AccountRepository.getAccountById(account_id as string);

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

    const expenses = await Repository.getExpensesPopulated(filters);

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
