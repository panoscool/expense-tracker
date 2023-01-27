import { JwtPayload, verify } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getHashedPassword } from '../helpers';
import { getUserById } from './repository';

interface JWTDecoded extends JwtPayload {
  sub: string;
  hash: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const { token, password, confirmPassword } = req.body;

    const decodedToken = verify(token, process.env.JWT_SECRET!) as JWTDecoded;

    if (!decodedToken) {
      return res.status(400).json({ error: 'Invalid token' });
    }
    if ((!password || !confirmPassword) && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords should match' });
    }

    const user = await getUserById(decodedToken.sub);

    if (user && user.password_reset_hash === decodedToken.hash) {
      const hashedPassword = await getHashedPassword(password);

      user.password = hashedPassword;
      user.password_reset_hash = null;

      user.save();
    }

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
}
