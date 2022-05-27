import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import Account, { IAccount } from '../../../lib/models/account';
import User from '../../../lib/models/user';
import dbConnect from '../../../lib/utils/db-connect';
import { accountSchema } from '../../../lib/utils/yup-schema';
import { authenticated, getDecodedUserId } from '../authenticated';
import validate from '../validate';

const getAccounts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);

    let accounts: IAccount[] = [];
    if (req.query.shared) {
      accounts = await Account.find({ users: userId }).populate('users', 'name email');
    } else {
      accounts = await Account.find({ user_id: userId });
    }

    res.status(200).json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
};

const addAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const errors = await validate(accountSchema, req.body);

    if (errors) {
      return res.status(400).json({ error: errors });
    }

    const userId = await getDecodedUserId(req, res);

    const { name, description, email } = req.body;

    const account = await Account.create({
      _id: uuidv4(),
      user_id: userId,
      name,
      users: [userId],
      description,
    });

    const user = await User.findOne({ email });

    if (user) {
      await account.updateOne({
        $push: {
          users: user._id,
        },
      });
    }

    res.status(200).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getAccounts(req, res);
    case 'POST':
      return await addAccount(req, res);
    default:
      return res.status(405).end('Method not allowed');
  }
});
