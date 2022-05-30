import { hash } from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import Account from '../../../lib/models/account';
import Category from '../../../lib/models/category';
import User from '../../../lib/models/user';
import { AuthResponse } from '../../../lib/types/api';
import dbConnect from '../../../lib/utils/db-connect';
import validate from '../../../lib/utils/validate';
import { registerSchema } from '../../../lib/utils/yup-schema';
import { setCookie } from '../set-cookie';

async function getHashedPassword(text: string) {
  const saltRounds = 10;
  return hash(text, saltRounds);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  try {
    await dbConnect();

    const errors = await validate(registerSchema, req.body);

    if (errors) {
      return res.status(400).json({ error: errors });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: `User with ${email} already exists` });
    }

    const hashedPassword = await getHashedPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await Account.create({
      _id: uuidv4(),
      user: user._id,
      name: 'Default',
      users: [user._id],
      description: 'Default account',
    });

    await Category.create({
      _id: uuidv4(),
      user: user._id,
      labels: [
        'supermarket',
        'transportation',
        'health',
        'shopping',
        'gift',
        'leisure',
        'beauty',
        'bills',
        'other',
      ],
    });

    await setCookie(req, res, user._id);

    res.status(200).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
}
