import type { NextApiRequest, NextApiResponse } from 'next';
import ExpenseModel from '../../../lib/models/expense';
import dbConnect from '../../../lib/config/db-connect';
import { trimToLowerCaseString } from '../../../lib/utils/format-text';
import validate from '../../../lib/utils/validate';
import { categorySchema } from '../../../lib/config/yup-schema';
import { authenticated, getDecodedUserId, hasAccess } from '../helpers';
import * as Repository from './repository';
import * as AccountRepository from '../account/repository';

const getCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const userId = (await getDecodedUserId(req, res)) as string;
    const category = await Repository.getCategoryById(id as string);

    if (!category) {
      return res.status(200).send({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    res.status(200).json({ data: category });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const updateCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const userId = (await getDecodedUserId(req, res)) as string;
    const category = await Repository.getCategoryById(id as string);

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

    await Repository.addCategoryById(category._id, label);

    const updatedCategories = await Repository.getCategoryById(id as string);

    res.status(200).json({ data: updatedCategories });
  } catch (err) {
    console.error(err);
    res.status(500).send(err || 'Internal server error');
  }
};

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const userId = (await getDecodedUserId(req, res)) as string;
    const account = await AccountRepository.getAccountsPopulatedByUserId(userId);
    const category = await Repository.getCategoryById(id as string);

    if (!category) {
      return res.status(200).send({ error: 'Category not found' });
    }

    const authorized = await hasAccess(userId, category?.user);

    if (!authorized) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    const label = trimToLowerCaseString(req.body.label);

    // find all expenses with this category and update them to other
    await ExpenseModel.updateMany({ account: account, category: label }, { category: 'other' });

    await Repository.removeCategoryById(category._id, label);

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
