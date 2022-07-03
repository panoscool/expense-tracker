import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import Category from '../../../lib/models/category';
import dbConnect from '../../../lib/config/db-connect';
import { trimToLowerCaseString } from '../../../lib/utils/format-text';
import { categorySchema } from '../../../lib/config/yup-schema';
import { authenticated, getDecodedUserId } from '../helpers';
import validate from '../../../lib/utils/validate';

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);

    const categories = await Category.findOne({ user: userId });

    res.status(200).json({ data: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const addCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const errors = await validate(categorySchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const userId = await getDecodedUserId(req, res);

    const category = await Category.create({
      _id: uuidv4(),
      user: userId,
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
      return await addCategory(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
