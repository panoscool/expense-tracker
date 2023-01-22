import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { userUpdateSchema } from '../../../lib/config/yup-schema';
import validate from '../../../lib/utils/validate';
import { authenticated, checkHashedPassword, getDecodedUserId, getHashedPassword } from '../helpers';
import * as Repository from './repository';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);

    const user = await Repository.getUserById(userId as string);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const data = { _id: user._id, name: user.name, email: user.email, image: user.image };

    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);

    const user = await Repository.getUserById(userId as string);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const { name, password, newPassword, confirmPassword } = req.body;

    const errors = await validate(userUpdateSchema, {
      name,
      password,
      newPassword,
      confirmPassword,
    });

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    if (name) {
      user.name = name;
    }

    if (password?.trim().length > 0) {
      const passwordMatch = await checkHashedPassword(password, user.password);

      if (!passwordMatch) {
        return res.status(401).send({ error: 'Invalid password' });
      }

      const hashedPassword = await getHashedPassword(newPassword);

      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getUser(req, res);
    case 'POST':
      return await updateUser(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
