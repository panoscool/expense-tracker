import { compare } from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../lib/models/user';
import { AuthResponse } from '../../../lib/types/api';
import dbConnect from '../../../lib/utils/db-connect';
import { setCookie } from '../set-cookie';

async function checkHashedPassword(text: string, hash: string) {
  return compare(text, hash);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  try {
    await dbConnect();

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await checkHashedPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    await setCookie(req, res, user._id);

    res.status(200).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
}
