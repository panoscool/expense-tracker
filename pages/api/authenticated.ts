import { verify } from 'jsonwebtoken';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
      const decoded = verify(req.cookies.token, process.env.JWT_SECRET!);

      if (decoded) {
        return await fn(req, res);
      }
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
