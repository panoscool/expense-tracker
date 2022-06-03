import { Expense } from '../interfaces/expense';

export const getTotalExpenses = (expenses: Expense[]) => {
  return expenses.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
};

export const getTotalUsers = (expenses: Expense[]) => {
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

export const getTotalAmountPerUser = (expenses: Expense[]) => {
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

export const getUsersWithHighestExpenses = (expenses: Expense[]) => {
  const userExpenses = getTotalAmountPerUser(expenses);
  let highestAmount = 0;
  let highestUsers: string[] = [];

  for (const userId in userExpenses) {
    if (userExpenses[userId] > highestAmount) {
      highestAmount = userExpenses[userId];
      highestUsers = [userId];
    } else if (userExpenses[userId] === highestAmount) {
      highestUsers.push(userId);
    }
  }

  return highestUsers;
};

export const getAverageExpensesPerUser = (expenses: Expense[]) => {
  const totalExpenses = getTotalExpenses(expenses);
  const numberOfUsers = getTotalUsers(expenses);

  return totalExpenses / numberOfUsers;
};

// remove the user or users with the highest (equal) amount,
// find for each user the amount to pay to the highest user or users

export const getPayableAmountPerUser = (expenses: Expense[]) => {
  const userExpenses = getTotalAmountPerUser(expenses);
  const highestUsers = getUsersWithHighestExpenses(expenses);
  const averageExpenses = getAverageExpensesPerUser(expenses);

  const expensesPerUser = [];

  for (const userId in userExpenses) {
    const foundUser = expenses.find((expense) => expense.user._id === userId);

    if (highestUsers.length <= 1 && !highestUsers.includes(userId)) {
      expensesPerUser.push({
        id: userId,
        name: foundUser?.user.name,
        amount: averageExpenses - userExpenses[userId],
      });
    } else if (highestUsers.length > 1 && !highestUsers.includes(userId)) {
      expensesPerUser.push({
        id: userId,
        name: foundUser?.user.name,
        amount: (averageExpenses - userExpenses[userId]) / highestUsers.length,
      });
    }
  }

  return expensesPerUser;
};
