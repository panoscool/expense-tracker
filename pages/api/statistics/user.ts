import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { authenticated } from '../helpers';
import * as Repository from './repository';

const getStatistics = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accountId = req.query.account_id as string;

    const month = await Repository.getExpensesPerMonthAndUser(accountId);

    res.status(200).json({ month });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getStatistics(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
