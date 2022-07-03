import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import Account from '../../../lib/models/account';
import User from '../../../lib/models/user';
import dbConnect from '../../../lib/config/db-connect';
import { accountSchema } from '../../../lib/config/yup-schema';
import { authenticated, getDecodedUserId } from '../helpers';
import validate from '../../../lib/utils/validate';

const getAccounts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);
    const accounts = await Account.find({ users: userId }).populate('users', 'name email image');

    res.status(200).json({ data: accounts });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const addAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const errors = await validate(accountSchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const userId = await getDecodedUserId(req, res);

    const { name, description, email } = req.body;

    const account = await Account.create({
      _id: uuidv4(),
      user: userId,
      name,
      users: [userId],
      description,
    });

    const user = await User.findOne({ email });

    if (user?._id === account.user) {
      return res.status(400).send({ error: 'You cannot add yourself as a user' });
    }

    if (user) {
      await account.updateOne({
        $push: {
          users: user._id,
        },
      });
    }

    res.status(200).json({ data: account });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
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
      return res.status(405).send('Method not allowed');
  }
});
