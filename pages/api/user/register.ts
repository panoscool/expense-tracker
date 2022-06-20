import { hash } from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { defaultCategories, defaultAccount } from '../../../lib/config/default-values';
import Account from '../../../lib/models/account';
import Category from '../../../lib/models/category';
import User from '../../../lib/models/user';
import dbConnect from '../../../lib/config/db-connect';
import validate from '../../../lib/utils/validate';
import { registerSchema } from '../../../lib/utils/yup-schema';
import { setAccessToken } from '../authenticated';

async function getHashedPassword(text: string) {
  const saltRounds = 10;
  return hash(text, saltRounds);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    await dbConnect();

    const errors = await validate(registerSchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ error: `User with ${email} already exists` });
    }

    const hashedPassword = await getHashedPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await Account.create({
      _id: uuidv4(),
      ...defaultAccount(user),
    });

    await Category.create({
      _id: uuidv4(),
      user: user._id,
      labels: defaultCategories,
    });

    const token = await setAccessToken(user);

    res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
}
