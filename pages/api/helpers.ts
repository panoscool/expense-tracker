import { sign, verify } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../lib/models/user';

export async function getHashedPassword(text: string) {
  const saltRounds = 10;
  return hash(text, saltRounds);
}

export async function checkHashedPassword(text: string, hash: string) {
  return compare(text, hash);
}

export const hasAccess = async (userId?: string, creatorId?: string, entityUserId?: string) => {
  return userId === creatorId?.toString() || userId === entityUserId?.toString();
};

export const setAccessToken = async (user: IUser) => {
  const secret = process.env.JWT_SECRET || '';
  const expires = 1000 * 60 * 60 * 24 * 7;
  const claims = { sub: user._id, name: user.name, email: user.email };

  const accessToken = sign(claims, secret, {
    expiresIn: expires,
  });

  return accessToken;
};

export const getDecodedUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [_, token] = req.headers.authorization?.split(' ') || [];
    const secret = process.env.JWT_SECRET || '';

    const decoded = verify(token, secret);

    if (decoded) {
      return decoded.sub;
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'Not authenticated' });
  }
};

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = await getDecodedUserId(req, res);

    if (userId) {
      return await fn(req, res);
    }

    return res.status(400).send({ error: 'Authentication failed' });
  };
