import { v4 as uuidv4 } from 'uuid';
import CategoryModel from '../../../lib/models/category';

export async function createCategory(category: { user: string; labels: string[] }) {
  return await CategoryModel.create({
    _id: uuidv4(),
    user: category.user,
    labels: category.labels,
  });
}

export async function getCategoryByUserId(userId: string) {
  return await CategoryModel.findOne({ user: { $eq: userId } });
}

export async function getCategoryById(id: string) {
  return await CategoryModel.findById(id);
}

export async function addCategoryById(id: string, label: string) {
  return await CategoryModel.updateOne({ _id: { $eq: id } }, { $push: { labels: label } });
}

export async function removeCategoryById(id: string, label: string) {
  return await CategoryModel.updateOne({ _id: id }, { $pull: { labels: label } });
}
