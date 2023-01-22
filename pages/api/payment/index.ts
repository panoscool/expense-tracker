import { format, parseISO } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { authenticated, getDecodedUserId } from '../helpers';
import * as Repository from './repository';
import * as UserRepository from '../user/repository';
import * as AccountRepository from '../account/repository';

const getPayments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { account_id, period } = req.query;

    const userId = await getDecodedUserId(req, res);
    const user = await UserRepository.getUserById(userId as string); // this is to initialize the User model for populate, otherwise userId can be used directly
    const account = await AccountRepository.getAccountById(account_id as string);

    if (!user || !account || !account.users.includes(userId as string)) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    let filters: any = { account: account_id };

    if (period) {
      filters.period = format(parseISO(period as string), 'MMMM-yyyy');
    }

    const payments = await Repository.getPaymentsPopulated(filters);

    res.status(200).json({ data: payments });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getPayments(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
