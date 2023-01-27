import { sign } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
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
      const sub = user._id.toString();
      const hash = uuidv4();

      const token = sign({ sub, hash }, process.env.JWT_SECRET!, {
        expiresIn: '24h',
      });

      await forgotPasswordEmail(req.body.email, token, user.name);

      user.password_reset_hash = hash;

      user.save();
    }

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
}
