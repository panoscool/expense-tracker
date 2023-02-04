import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/config/db-connect';
import { trimToLowerCaseString } from '../../../lib/utils/format-text';
import { categorySchema } from '../../../lib/config/yup-schema';
import { authenticated, getDecodedUserId } from '../helpers';
import { validate } from '../../../lib/utils/validate';
import * as Repository from './repository';

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const categories = await Repository.getCategoryByUserId(userId);

    res.status(200).json({ data: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const createCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);

    const errors = await validate(categorySchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const category = await Repository.createCategory({
      user: userId as string,
      labels: [trimToLowerCaseString(req.body.label)],
    });

    res.status(200).json({ data: category });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getCategories(req, res);
    case 'POST':
      return await createCategory(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
