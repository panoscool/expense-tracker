import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { forgotPasswordEmail } from '../sendpulse';
import { getUserByEmail } from './repository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    await dbConnect();

    const user = await getUserByEmail(req.body.email);

    if (user) {
      await forgotPasswordEmail(req.body.email, 'hash', user.name);
    }

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
}
