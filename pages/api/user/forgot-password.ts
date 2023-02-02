import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { v4 as uuidv4 } from 'uuid';
import { forgotPasswordEmail } from '../sendgrid';
import { getUserByEmail } from './repository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    await dbConnect();

    const user = await getUserByEmail(req.body.email);

    if (user) {
      const hash = `${Date.now()}-${uuidv4()}`;

      await forgotPasswordEmail(req.body.email, user.name, hash);

      user.password_reset_hash = hash;

      user.save();
    }

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
}
