import { v4 as uuidv4 } from 'uuid';
import ExpenseModel from '../../../lib/models/expense';

interface ExpenseCreate {
  user: string;
  account: string;
  date: string;
  category: string;
  amount: number;
  description?: string;
  details?: string;
  created_by?: string;
  updated_by: string;
}

export async function createExpense(expense: ExpenseCreate) {
  return await ExpenseModel.create({
    _id: uuidv4(),
    ...expense,
  });
}

export async function getExpenseById(id: string) {
  return await ExpenseModel.findById(id);
}

export async function getExpensesPopulated(filters: { date: string; user: string; category: string }) {
  return await ExpenseModel.find(filters).sort({ date: 'asc' }).populate('user', 'name');
}

export async function getExpensePopulatedById(id: string) {
  return await ExpenseModel.findById(id).populate('user', 'name');
}

export async function updateExpenseById(id: string, expense: ExpenseCreate) {
  return ExpenseModel.updateOne({ _id: id }, { ...expense });
}

export async function deleteExpenseById(id: string) {
  return await ExpenseModel.deleteOne({ _id: id });
}
