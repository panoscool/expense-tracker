import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../../../lib/config/db-connect';
import { defaultAccount, defaultCategories } from '../../../lib/config/default-values';
import { registerSchema } from '../../../lib/config/yup-schema';
import CategoryModel from '../../../lib/models/category';
import validate from '../../../lib/utils/validate';
import { getHashedPassword, setAccessToken } from '../helpers';
import * as Repository from './repository';
import * as AccountRepository from '../account/repository';

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

    const existingUser = await Repository.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send({ error: `User with ${email} already exists` });
    }

    const hashedPassword = await getHashedPassword(password);

    const user = await Repository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    await AccountRepository.createAccount(defaultAccount(user));

    await CategoryModel.create({
      _id: uuidv4(),
      user: user._id,
      labels: defaultCategories,
    });

    const token = await setAccessToken(user);

    res.status(200).json({ data: token });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
}
