import { verify } from 'jsonwebtoken';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const getDecodedUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const decoded = verify(req.cookies.token, process.env.JWT_SECRET!);

    if (decoded) {
      return decoded.sub;
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export const hasAccess = async (userId?: string, userEntityId?: string) => {
  return userId === userEntityId?.toString();
};

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
      const decoded = verify(req.cookies.token, process.env.JWT_SECRET!);

      if (decoded) {
        return await fn(req, res);
      }
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
