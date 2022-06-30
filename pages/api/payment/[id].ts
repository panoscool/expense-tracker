import { format, parseISO } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import Account from '../../../lib/models/account';
import Payment from '../../../lib/models/payment';
import User from '../../../lib/models/user';
import { authenticated, getDecodedUserId } from '../helpers';

const getPayments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, period } = req.query;

    const userId = await getDecodedUserId(req, res);
    const user = await User.findById(userId); // this is to initialize the User model for populate, otherwise userId can be used directly
    const account = await Account.findOne({ _id: id });

    if (!user || !account || !account.users.includes(userId as string)) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    let filters: any = { account: id };

    if (period) {
      filters.period = format(parseISO(period as string), 'MMMM-yyyy');
    }

    const payments = await Payment.findOne(filters)
      .populate({
        path: 'giving_users',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name email',
        },
      })
      .populate({
        path: 'receiving_users',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name email',
        },
      });

    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const updatePayment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const payment = await Payment.findById(req.query.id);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const account = await Account.findById(payment.account);
    if (!userId || !account || !account.users.includes(userId as string)) {
      return res.status(401).send({ error: 'Not authorized' });
    }

    const { settled } = req.body;

    await payment.updateOne({ settled, updated_by: userId });

    const updatedPayment = await Payment.findById(payment._id)
      .populate({
        path: 'giving_users',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name email',
        },
      })
      .populate({
        path: 'receiving_users',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name email',
        },
      });

    res.status(200).json(updatedPayment);
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
