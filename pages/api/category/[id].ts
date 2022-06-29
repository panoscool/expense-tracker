import type { NextApiRequest, NextApiResponse } from 'next';
import Category from '../../../lib/models/category';
import Expense from '../../../lib/models/expense';
import dbConnect from '../../../lib/config/db-connect';
import { trimToLowerCaseString } from '../../../lib/utils/format-text';
import validate from '../../../lib/utils/validate';
import { categorySchema } from '../../../lib/config/yup-schema';
import { authenticated, getDecodedUserId, hasAccess } from '../helpers';
import Account from '../../../lib/models/account';

const getCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const category = await Category.findById(req.query.id);

    if (!category) {
      return res.status(200).send({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const updateCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const category = await Category.findById(req.query.id);

    if (!category) {
      return res.status(200).send({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    const errors = await validate(categorySchema, req.body);

    if (errors) {
      return res.status(400).send({ error: errors });
    }

    const label = trimToLowerCaseString(req.body.label);

    if (category.labels.includes(label)) {
      return res.status(200).send({ error: 'Category already exists' });
    }

    // update the labels array with the new label if it is not already in the array
    await category.updateOne({
      $push: { labels: label },
    });

    const updatedCategories = await Category.findById(req.query.id);

    res.status(200).json(updatedCategories);
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await Account.findOne({ user: userId });
    const category = await Category.findById(req.query.id);

    if (!category) {
      return res.status(200).send({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    const label = trimToLowerCaseString(req.body.label);

    // find all expenses with this category and update them to other
    await Expense.updateMany({ account: account, category: label }, { category: 'other' });

    // delete the label inside the category labels array
    await category.updateOne({
      $pull: { labels: label },
    });

    res.status(200).json({ message: 'Ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return await getCategory(req, res);
    case 'PUT':
      return await updateCategory(req, res);
    case 'DELETE':
      return await deleteCategory(req, res);
    default:
      return res.status(405).send('Method not allowed');
  }
});
