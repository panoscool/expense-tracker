import { Expense } from '../interfaces/expense';

export const getTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
};

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

export const getAverageExpensesPerUser = (expenses: Expense[]): number => {
  const totalExpenses = getTotalExpenses(expenses);
  const numberOfUsers = getTotalUsers(expenses);

  return totalExpenses / numberOfUsers;
};

export const getPayableAmountPerUser = (expenses: Expense[]): { [key: string]: number } => {
  const payedAmount = getTotalAmountPerUser(expenses);
  const averageAmount = getAverageExpensesPerUser(expenses);

  // get the amount each user has to pay in order the expenses to split equally

  const payableAmountPerUser = Object.keys(payedAmount).reduce((acc: any, userId) => {
    acc[userId] = payedAmount[userId] - averageAmount;
    return acc;
  }, {});

  return payableAmountPerUser;
};
