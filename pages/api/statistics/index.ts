import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { Period } from '../../../lib/interfaces/common';
import { authenticated } from '../helpers';
import * as Repository from './repository';

type Query = { account_id: string; period: Period };

const getStatisticsPerAccount = async (accountId: string, period: Period) => {
  switch (period) {
    case Period.quarter:
      return await Repository.getExpensesPerQuarter(accountId);
    case Period.month:
      return await Repository.getExpensesPerMonth(accountId);
    case Period.week:
      return await Repository.getExpensesPerWeek(accountId);
    default:
      return await Repository.getExpensesPerDay(accountId);
  }
};

const getStatistics = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { account_id, period } = req.query as Query;

    const data = await getStatisticsPerAccount(account_id, period);

    res.status(200).json(data);
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
