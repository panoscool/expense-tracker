import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthResponse } from '../../../lib/types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  try {
    res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 2000 00:00:01 GMT;');

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
}
