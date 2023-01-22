import Expense from '../../../lib/models/expense';

export async function getExpensesPerDay(accountId: string) {
  const data = await Expense.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
        count: { $sum: 1 },
        total_amount: { $sum: '$amount' },
      },
    },

    {
      $sort: { _id: 1 },
    },
  ]);

  return data;
}

export async function getExpensesPerWeek(accountId: string) {
  const data = await Expense.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: {
          week: { $week: '$created_at' },
          year: { $year: '$created_at' },
        },
        count: { $sum: 1 },
        total_amount: { $sum: '$amount' },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.week': 1 },
    },
  ]);

  return data;
}

export async function getExpensesPerMonth(accountId: string) {
  const data = await Expense.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
        count: { $sum: 1 },
        total_amount: { $sum: '$amount' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return data;
}

export async function getExpensesPerQuarter(accountId: string) {
  const data = await Expense.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: {
          quarter: {
            $cond: [
              { $lte: [{ $month: '$created_at' }, 3] },
              1,
              {
                $cond: [
                  { $lte: [{ $month: '$created_at' }, 6] },
                  2,
                  {
                    $cond: [{ $lte: [{ $month: '$created_at' }, 9] }, 3, 4],
                  },
                ],
              },
            ],
          },
          year: { $year: '$created_at' },
        },
        count: { $sum: 1 },
        total_amount: { $sum: '$amount' },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.quarter': 1 },
    },
  ]);

  return data;
}

export async function getExpensesPerMonthAndCategory(accountId: string) {
  const data = await Expense.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: { date: { $dateToString: { format: '%Y-%m', date: '$created_at' } }, category: '$category' },
        count: { $sum: 1 },
        total_amount: { $sum: '$amount' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return data;
}

export async function getExpensesPerMonthAndUser(accountId: string) {
  const data = await Expense.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: { date: { $dateToString: { format: '%Y-%m', date: '$created_at' } }, user: { $toString: '$user' } },
        count: { $sum: 1 },
        total_amount: { $sum: '$amount' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return data;
}
