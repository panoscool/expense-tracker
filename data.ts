export type Data = {
  id: string;
  userId: string;
  name: string;
  comment: string;
  amount: string;
  date: string;
  category: string;
};

const data: Data[] = [
  {
    id: '1',
    userId: '1',
    name: 'Panos',
    comment: 'Expense 1',
    amount: '100',
    date: '2022-05-10',
    category: 'transportation',
  },
  {
    id: '1',
    userId: '1',
    name: 'Panos',
    comment: 'Expense 1',
    amount: '100',
    date: '2022-05-10',
    category: 'supermarket',
  },
  {
    id: '2',
    userId: '2',
    name: 'Maria',
    comment: 'Expense 2',
    amount: '102',
    date: '2022-05-13',
    category: 'health',
  },
  {
    id: '1',
    userId: '1',
    name: 'Panos',
    comment: 'Expense 2',
    amount: '100',
    date: '2022-05-10',
    category: 'gift',
  },
  {
    id: '2',
    userId: '2',
    name: 'Maria',
    comment: 'Expense 2',
    amount: '102',
    date: '2022-05-11',
    category: 'leisure',
  },
  {
    id: '1',
    userId: '1',
    name: 'Maria',
    comment: 'Expense 3',
    amount: '100',
    date: '2022-05-10',
    category: 'bills',
  },
  {
    id: '2',
    userId: '2',
    name: 'Maria',
    comment: 'Expense 2',
    amount: '102',
    date: '2022-05-12',
    category: 'shopping',
  },
  {
    id: '2',
    userId: '2',
    name: 'Maria',
    comment: 'Expense 2',
    amount: '102',
    date: '2022-05-12',
    category: 'other',
  },
];

export default data;
