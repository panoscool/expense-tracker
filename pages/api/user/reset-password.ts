import type { NextApiRequest, NextApiResponse } from 'next';
import { resetPasswordSchema } from '../../../lib/config/yup-schema';
import validate from '../../../lib/utils/validate';
import { getHashedPassword } from '../helpers';
import { getUserByPasswordResetHash } from './repository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const { hash, password, confirmPassword } = req.body;

    const user = await getUserByPasswordResetHash(hash);

    if (!user) {
      return res.status(400).json({ error: 'The link you used has been expired, please try again.' });
    }

    const errors = await validate(resetPasswordSchema, {
      password,
      confirmPassword,
    });

    if (errors) {
      return res.status(400).send({ error: errors || 'The link you used has been expired, please try again.' });
    }

    const hashedPassword = await getHashedPassword(password);

    user.password = hashedPassword;
    user.password_reset_hash = null;

    user.save();

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
}
