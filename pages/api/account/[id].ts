import type { NextApiRequest, NextApiResponse } from 'next';
import Account from '../../../lib/models/account';
import Expense from '../../../lib/models/expense';
import User from '../../../lib/models/user';
import dbConnect from '../../../lib/config/db-connect';
import { accountSchema } from '../../../lib/config/yup-schema';
import { authenticated, hasAccess, getDecodedUserId } from '../helpers';
import validate from '../../../lib/utils/validate';

const getAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await Account.findById(req.query.id).populate('users', 'name email image');

    if (!account) {
      return res.status(200).send({ error: 'Account not found' });
    }

    const isUserInAccount = account.users.some((user: any) => user._id?.toString() === userId);

    if (!isUserInAccount) {
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
    const account = await Account.findById(req.query.id);

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

    const { name, currency, description, email, is_default } = req.body;

    await account.updateOne({
      name,
      currency,
      description,
      is_default,
    });

    const user = await User.findOne({ email });

    // if user.id is equal to account.user, then user is the owner of the account and cannot remove himself
    if (user?._id?.toString() === account.user.toString()) {
      return res.status(400).send({ error: 'You cannot remove yourself from the account' });
    }

    // if user does not exist in the account users array add it
    if (user && !account.users.includes(user._id)) {
      await account.updateOne({
        $push: {
          users: user._id,
        },
      });
    }

    // if user exists in the account users array remove it
    if (user && account.users.includes(user._id)) {
      await account.updateOne({
        $pull: {
          users: user._id,
        },
      });
    }

    const updatedAccount = await Account.findById(req.query.id);

    res.status(200).json({ data: updatedAccount });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const deleteAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await Account.findById(req.query.id);

    if (!account) {
      return res.status(200).send({ error: 'Account not found' });
    }

    const authorized = await hasAccess(userId, account?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    // delete all expenses associated with the account
    await Expense.deleteMany({ account: req.query.id });

    await account.delete();

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
