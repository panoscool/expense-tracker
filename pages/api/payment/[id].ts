import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { hasAccountAccess } from '../account/helpers';
import * as AccountRepository from '../account/repository';
import { authenticated, getDecodedUserId } from '../helpers';
import * as UserRepository from '../user/repository';
import * as Repository from './repository';

const getPayments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);
    const user = await UserRepository.getUserById(userId as string); // this is to initialize the User model for populate, otherwise userId can be used directly
    const account = await AccountRepository.getAccountById(req.query.id as string);

    if (!account) {
      return res.status(404).send({ error: 'Account not found' });
    }

    const accountAccess = await hasAccountAccess(account, user?._id);

    if (!accountAccess) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    const payments = await Repository.getPaymentPopulatedByAccountAndPeriod(req.query);

    res.status(200).json({ data: payments });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const updatePayment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const payment = await Repository.getPaymentById(req.query.id as string);

    if (!payment) {
      return res.status(404).send({ error: 'Payment not found' });
    }

    const account = await AccountRepository.getAccountById(payment.account);

    if (!account) {
      return res.status(404).send({ error: 'Account not found' });
    }

    const accountAccess = await hasAccountAccess(account, userId);

    if (!accountAccess) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    await payment.updateOne({ settled: req.body.settled, updated_by: userId });

    const updatedPayment = await Repository.getPaymentPopulatedById(payment._id);

    res.status(200).json({ data: updatedPayment });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getPayments(req, res);
    case 'PATCH':
      return await updatePayment(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
