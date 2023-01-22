import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../lib/models/user';
import dbConnect from '../../../lib/config/db-connect';
import { accountSchema } from '../../../lib/config/yup-schema';
import { authenticated, getDecodedUserId } from '../helpers';
import validate from '../../../lib/utils/validate';
import * as Repository from './repository';
import { isAccountOwner } from './helpers';

const getAccounts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const accounts = await Repository.getAccountsPopulatedByUserId(userId);

    res.status(200).json({ data: accounts });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;

    const errors = await validate(accountSchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const { name, currency, description, email } = req.body;

    const account = await Repository.createAccount({ user: userId, name, currency, users: [userId], description });

    const accountOwner = await isAccountOwner(userId, account.user);

    if (accountOwner) {
      return res.status(400).send({ error: 'You cannot add yourself as a user' });
    }

    const user = await User.findOne({ email });

    if (user) {
      await Repository.addAccountUserById(account._id, user._id);
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
      return await createAccount(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
