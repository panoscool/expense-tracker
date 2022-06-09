import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import User from '../../../lib/models/user';
import { authenticated } from '../authenticated';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await User.findById(req.query.id);

    if (!user) {
      return res.status(200).json({ error: 'User not found' });
    }

    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).end(err || 'Internal server error');
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getUser(req, res);
    default:
      return res.status(405).end('Method not allowed');
  }
});
