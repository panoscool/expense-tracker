import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';

export const setCookie = async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
  const expires = 1000 * 60 * 60 * 24 * 7;
  const claims = { sub: userId };
  const token = sign(claims, process.env.JWT_SECRET!, {
    expiresIn: expires,
  });

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: expires,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }),
  );
};
