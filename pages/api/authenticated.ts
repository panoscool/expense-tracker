import { sign, verify } from 'jsonwebtoken';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../lib/models/user';

export const setAccessToken = async (user: IUser) => {
  const expires = 1000 * 60 * 60 * 24 * 7;
  const claims = { sub: user._id, name: user.name, email: user.email };
  const accessToken = sign(claims, process.env.JWT_SECRET!, {
    expiresIn: expires,
  });

  return accessToken;
};

export const getDecodedUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const decoded = verify(req.headers.authorization!, process.env.JWT_SECRET!);

    if (decoded) {
      return decoded.sub;
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Not authenticated' });
  }
};

export const hasAccess = async (userId?: string, userEntityId?: string) => {
  return userId === userEntityId?.toString();
};

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
      const userId = await getDecodedUserId(req, res);

      if (userId) {
        return await fn(req, res);
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: 'Not authenticated' });
    }
  };
