import { format } from 'date-fns';
import { Expense } from '../interfaces/expense';
import { CategoryStatistic } from '../interfaces/statistics';

export const getTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
};

/**
 * @param expenses
 * @description Returns the total unique users included in the expenses
 * @returns {number} Total unique users
 */
export const getTotalUsers = (expenses: Expense[]): number => {
  const users = expenses.reduce((acc: any, expense) => {
    if (acc[expense.user._id]) {
      acc[expense.user._id] += 1;
    } else {
      acc[expense.user._id] = 1;
    }
    return acc;
  }, {});

  return Object.keys(users).length;
};

export const getTotalAmountPerUser = (expenses: Expense[]): { [key: string]: number } => {
  const userExpenses = expenses.reduce((acc: any, expense) => {
    if (acc[expense.user._id]) {
      acc[expense.user._id] += expense.amount;
    } else {
      acc[expense.user._id] = expense.amount;
    }
    return acc;
  }, {});

  return userExpenses;
};

export const getExpensesGroupedByDay = (expenses: Expense[]): { [key: string]: Expense[] } => {
  return expenses.reduce((acc: any, expense) => {
    const date = format(new Date(expense.date), 'yyyy-MM-dd');

    if (acc[date]) {
      acc[date].push(expense);
    } else {
      acc[date] = [expense];
    }
    return acc;
  }, {});
};

export const getAverageExpensesPerUser = (expenses: Expense[]): number => {
  const totalExpenses = getTotalExpenses(expenses);
  const numberOfUsers = getTotalUsers(expenses);

  return totalExpenses / numberOfUsers;
};

/**
 * @param expenses - Array of expenses
 * @description user with negative amount has to receive the specified number, user with positive amount has to give the specified number
 * @returns {[string, number]} Array of user id's and their amount
 */
export const getPayableAmountPerUser = (expenses: Expense[]): { [key: string]: number } => {
  const payedAmount = getTotalAmountPerUser(expenses);
  const averageAmount = getAverageExpensesPerUser(expenses);

  // get the amount each user has to pay in order the expenses to split equally
  const payableAmountPerUser = Object.keys(payedAmount).reduce((acc: any, userId) => {
    acc[userId] = averageAmount - payedAmount[userId];
    return acc;
  }, {});

  return payableAmountPerUser;
};

export const getGivingAndReceivingUsers = (expenses: Expense[]): [string[], string[]] => {
  const payable = getPayableAmountPerUser(expenses);
  const payableAmountPerUser = Object.keys(payable).map((key) => {
    return {
      user: key,
      amount: payable[key],
    };
  });

  const [giving, receiving] = payableAmountPerUser.reduce(
    (acc: any, curr) => {
      if (curr.amount > 0) {
        acc[0].push(curr);
      } else {
        acc[1].push(curr);
      }
      return acc;
    },
    [[], []],
  );

  return [giving, receiving];
};

export const getStatisticsGroupedByDay = (expenses: CategoryStatistic[]): { [key: string]: CategoryStatistic[] } => {
  return expenses.reduce((acc: any, expense) => {
    const date = expense._id.date;

    if (acc[date]) {
      acc[date].push(expense);
    } else {
      acc[date] = [expense];
    }
    return acc;
  }, {});
};
