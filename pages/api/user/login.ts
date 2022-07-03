import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import User from '../../../lib/models/user';
import { checkHashedPassword, setAccessToken } from '../helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    await dbConnect();

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const passwordMatch = await checkHashedPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = await setAccessToken(user);

    res.status(200).json({ data: token });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
}
