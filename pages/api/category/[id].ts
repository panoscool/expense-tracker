import type { NextApiRequest, NextApiResponse } from 'next';
import Category from '../../../lib/models/category';
import Expense from '../../../lib/models/expense';
import dbConnect from '../../../lib/utils/db-connect';
import { cleanLabel } from '../../../lib/utils/format-text';
import { authenticated, getDecodedUserId, hasAccess } from '../authenticated';

const getCategory = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const category = await Category.findById(req.query.id);

    if (!category) {
      return res.status(200).json({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user_id);

    if (!authorized) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
};

const updateCategory = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const category = await Category.findById(req.query.id);

    if (!category) {
      return res.status(200).json({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user_id);

    if (!authorized) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (category.labels.includes(req.body.label)) {
      return res.status(200).json({ error: 'Category already exists' });
    }

    // update the labels array with the new label if it is not already in the array
    await category.updateOne({
      labels: [...category.labels, cleanLabel(req.body.label)],
    });

    const updatedCategories = await Category.findById(req.query.id);

    res.status(200).json(updatedCategories);
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
};

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const category = await Category.findById(req.query.id);

    if (!category) {
      return res.status(200).json({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user_id);

    if (!authorized) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // find all expenses with this category and update them to uncategorized
    await Expense.updateMany({ category: req.body.label }, { category: 'uncategorized' });

    // delete only the category label inside the category labels array
    await category.updateOne({
      labels: category.labels.filter((label) => label !== cleanLabel(req.body.label)),
    });

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).end((err as Error)?.message || 'Internal server error');
  }
};

export default authenticated(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getCategory(req, res);
    case 'PUT':
      return await updateCategory(req, res);
    case 'DELETE':
      return await deleteCategory(req, res);
    default:
      return res.status(405).end('Method not allowed');
  }
});
