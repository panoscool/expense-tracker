import { endOfMonth, parseISO, startOfMonth } from 'date-fns';
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

const GET_BY_ID = (id: string) => ({
  $or: [{ _id: id }, { id }],
});

// const GET_BY_IDS = (ids: string[]) => ({
//   $or: [{ _id: { $in: ids } }, { id: { $in: ids } }],
// });

export async function createExpense(expense: ExpenseCreate) {
  return await ExpenseModel.create({
    _id: uuidv4(),
    user: expense.user,
    account: expense.account,
    date: expense.date,
    category: expense.category,
    amount: expense.amount,
    description: expense.description,
    details: expense.details,
    created_by: expense.created_by,
    updated_by: expense.updated_by,
  });
}

export async function updateExpenseById(id: string, expense: ExpenseCreate) {
  return ExpenseModel.updateOne(GET_BY_ID(id), {
    user: expense.user,
    account: expense.account,
    date: expense.date,
    category: expense.category,
    amount: expense.amount,
    description: expense.description,
    details: expense.details,
    updated_by: expense.updated_by,
  });
}

export async function getExpenseById(id: string) {
  return await ExpenseModel.findOne(GET_BY_ID(id));
}

export async function getExpensesPopulated(filters: any) {
  const { account_id, date, user_id, category } = filters;

  const monthStart = startOfMonth(parseISO(date as string));
  const monthEnd = endOfMonth(parseISO(date as string));

  let query: any = { account: account_id };

  if (date) {
    filters.date = { $gte: monthStart, $lte: monthEnd };
  }
  if (user_id) {
    filters.user = user_id;
  }
  if (category) {
    filters.category = category;
  }

  return await ExpenseModel.find(query).sort({ date: 'asc' }).populate('user', 'name');
}

export async function getExpensePopulatedById(id: string) {
  return await ExpenseModel.findById(id).populate('user', 'name');
}

export async function deleteExpenseById(id: string) {
  return await ExpenseModel.deleteOne(GET_BY_ID(id));
}

export async function getExpenseByAccountIdAndDates(accountId: string, date: string) {
  const startDate = startOfMonth(parseISO(date));
  const endDate = endOfMonth(parseISO(date));

  return await ExpenseModel.find({
    account: accountId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });
}

export async function updateExpensesByAccountId(accountIds: string[], category: string) {
  return await ExpenseModel.updateMany(
    { $or: [{ _id: { $in: accountIds } }, { id: { $in: accountIds } }], category: category },
    { category: 'other' },
  );
}

export async function deleteExpensesByAccountId(id: string) {
  return await ExpenseModel.deleteMany({ account: id });
}