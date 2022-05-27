import type { NextApiRequest, NextApiResponse } from 'next';
import Account from '../../../lib/models/account';
import Expense from '../../../lib/models/expense';
import User from '../../../lib/models/user';
import dbConnect from '../../../lib/utils/db-connect';
import { accountSchema } from '../../../lib/utils/yup-schema';
import { authenticated, hasAccess, getDecodedUserId } from '../authenticated';
import validate from '../validate';

const getAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    let account = await Account.findById(req.query.id).populate('users', 'name email');

    if (!account) {
      return res.status(200).json({ error: 'Account not found' });
    }

    const isUserInAccount = account.users.some((user: any) => user._id?.toString() === userId);

    if (!isUserInAccount) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
};

const updateAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await Account.findById(req.query.id);

    if (!account) {
      return res.status(200).json({ error: 'Account not found' });
    }

    const authorized = await hasAccess(userId, account?.user_id);

    if (!authorized) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const errors = await validate(accountSchema, req.body);

    if (errors) {
      return res.status(400).json({ error: errors });
    }

    const { name, description, email } = req.body;

    await account.updateOne({
      name,
      description,
    });

    const user = await User.findOne({ email });

    // if user does not exist in the account users array and email provided, add it
    if (user && !account.users.includes(user._id) && !req.query.email) {
      await account.updateOne({
        $push: {
          users: user._id,
        },
      });
    }

    // if user exists in the account users array and email is in query, remove it
    if (user && req.query.email) {
      await account.updateOne({
        $pull: {
          users: user._id,
        },
      });
    }

    const updatedAccount = await Account.findById(req.query.id);

    res.status(200).json(updatedAccount);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
};

const deleteAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await Account.findById(req.query.id);

    if (!account) {
      return res.status(200).json({ error: 'Account not found' });
    }

    const authorized = await hasAccess(userId, account?.user_id);

    if (!authorized) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // delete all expenses associated with the account
    await Expense.deleteMany({ account: req.query.id });

    await account.delete();

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
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
      return res.status(405).end('Method not allowed');
  }
});
