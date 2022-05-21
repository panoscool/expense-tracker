import { hash } from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../lib/models/user';
import { AuthResponse } from '../../../lib/types/api';
import dbConnect from '../../../lib/utils/db-connect';
import validate from '../validate';
import { registerSchema } from '../../../lib/utils/yup-schema';

async function getHashedPassword(text: string) {
  const saltRounds = 10;
  return hash(text, saltRounds);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    await dbConnect();

    const errors = await validate(registerSchema, req.body);

    if (errors) {
      return res.status(400).json({ message: errors });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: `User with ${email} already exists` });
    }

    const hashedPassword = await getHashedPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
