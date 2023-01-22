import type { NextApiRequest, NextApiResponse } from 'next';
import Expense from '../../../lib/models/expense';
import User from '../../../lib/models/user';
import dbConnect from '../../../lib/config/db-connect';
import { accountSchema } from '../../../lib/config/yup-schema';
import { authenticated, hasAccess, getDecodedUserId } from '../helpers';
import validate from '../../../lib/utils/validate';
import * as Repository from './repository';
import { hasAccountAccess, isAccountOwner } from './helpers';

const getAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await Repository.getAccountPopulatedById(req.query.id as string);

    if (!account) {
      return res.status(200).send({ error: 'Account not found' });
    }

    const accountAccess = await hasAccountAccess(account, userId);

    if (!accountAccess) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    res.status(200).json({ data: account });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const updateAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await Repository.getAccountById(req.query.id as string);

    if (!account) {
      return res.status(200).send({ error: 'Account not found' });
    }

    const authorized = await hasAccess(userId, account?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    const errors = await validate(accountSchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const { name, currency, description, email } = req.body;

    await Repository.updateAccountById(account._id, {
      name,
      currency,
      description,
    });

    const user = await User.findOne({ email });

    const accountOwner = await isAccountOwner(user?.id, account.user);

    if (accountOwner) {
      return res.status(400).send({ error: 'You cannot remove yourself from the account' });
    }

    const accountAccess = await hasAccountAccess(account, user?._id);

    if (user && !accountAccess) {
      await Repository.addAccountUserById(account._id, user._id);
    }

    if (user && accountAccess) {
      await Repository.removeAccountUserById(account._id, user._id);
    }

    const updatedAccount = await Repository.getAccountById(req.query.id as string);

    res.status(200).json({ data: updatedAccount });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const deleteAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await Repository.getAccountById(req.query.id as string);

    if (!account) {
      return res.status(200).send({ error: 'Account not found' });
    }

    const authorized = await hasAccess(userId, account?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    // delete all expenses associated with the account
    await Expense.deleteMany({ account: req.query.id });

    await Repository.deleteAccountById(account._id);

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
      return await getAccount(req, res);
    case 'PUT':
      return await updateAccount(req, res);
    case 'DELETE':
      return await deleteAccount(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
