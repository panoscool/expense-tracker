import ExpenseModel from '../../../lib/models/expense';

export async function getExpensesPerDay(accountId: string) {
  const data = await ExpenseModel.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
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
  const data = await ExpenseModel.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: {
          week: { $week: '$date' },
          year: { $year: '$date' },
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
  const data = await ExpenseModel.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
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
  const data = await ExpenseModel.aggregate([
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
              { $lte: [{ $month: '$date' }, 3] },
              1,
              {
                $cond: [
                  { $lte: [{ $month: '$date' }, 6] },
                  2,
                  {
                    $cond: [{ $lte: [{ $month: '$date' }, 9] }, 3, 4],
                  },
                ],
              },
            ],
          },
          year: { $year: '$date' },
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
  const data = await ExpenseModel.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: { date: { $dateToString: { format: '%Y-%m', date: '$date' } }, category: '$category' },
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
  const data = await ExpenseModel.aggregate([
    {
      $match: {
        account: accountId,
      },
    },
    {
      $group: {
        _id: { date: { $dateToString: { format: '%Y-%m', date: '$date' } }, user: { $toString: '$user' } },
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
