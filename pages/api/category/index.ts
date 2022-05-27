import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import Category from '../../../lib/models/category';
import dbConnect from '../../../lib/utils/db-connect';
import { cleanLabel } from '../../../lib/utils/format-text';
import { categorySchema } from '../../../lib/utils/yup-schema';
import { authenticated, getDecodedUserId } from '../authenticated';
import validate from '../validate';

const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = await getDecodedUserId(req, res);

    const categories = await Category.find({ user_id: userId });

    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const errors = await validate(categorySchema, req.body);

    if (errors) {
      return res.status(400).json({ error: errors });
    }

    const userId = await getDecodedUserId(req, res);

    const category = await Category.create({
      _id: uuidv4(),
      user_id: userId,
      labels: [cleanLabel(req.body.label)],
    });

    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
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
      return res.status(405).end('Method not allowed');
  }
});
