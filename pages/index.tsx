import groupBy from 'lodash/groupBy';
import type { NextPage } from 'next';
import Head from 'next/head';
import ExpenseCard from '../components/expense/expense-card';
import AccountDialog from '../components/account/account-dialog';
import CategoryDialog from '../components/category/category-dialog';
import ExpenseDialog from '../components/expense/expense-dialog';
import data from '../data';

const Home: NextPage = () => {
  const groupedByDay: any = groupBy(data, 'date');
  const days = Object.keys(groupedByDay).map((day) => groupedByDay[day]);

  return (
    <div>
      <Head>
        <title>Expense Tracker App</title>
        <meta name="description" content="Keep track of expenses and share with others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AccountDialog />
        <CategoryDialog />
        <ExpenseDialog />
        {days.map((day, index) => (
          <ExpenseCard key={index} day={day} />
        ))}
      </main>
    </div>
  );
};

export default Home;
