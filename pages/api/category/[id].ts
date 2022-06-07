import type { NextApiRequest, NextApiResponse } from 'next';
import Category from '../../../lib/models/category';
import Expense from '../../../lib/models/expense';
import dbConnect from '../../../lib/config/db-connect';
import { cleanLabel } from '../../../lib/utils/format-text';
import validate from '../../../lib/utils/validate';
import { categorySchema } from '../../../lib/utils/yup-schema';
import { authenticated, getDecodedUserId, hasAccess } from '../authenticated';
import Account from '../../../lib/models/account';

const getCategory = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const category = await Category.findById(req.query.id);

    if (!category) {
      return res.status(200).json({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user);

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

    const authorized = await hasAccess(userId, category?.user);

    if (!authorized) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const errors = await validate(categorySchema, req.body);

    if (errors) {
      return res.status(400).json({ error: errors });
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
    const account = await Account.findOne({ user: userId });
    const category = await Category.findById(req.query.id);

    if (!category) {
      return res.status(200).json({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user);

    if (!authorized) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // find all expenses with this category and update them to other
    await Expense.updateMany(
      { account: account, category: cleanLabel(req.body.label) },
      { category: 'other' },
    );

    // delete only the req.body.label inside the category labels array
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
