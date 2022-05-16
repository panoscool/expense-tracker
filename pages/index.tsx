import type { NextPage } from 'next';
import Head from 'next/head';
import data from '../data';
import groupBy from 'lodash/groupBy';
import ExpenseCard from '../components/expense/expense-card';
import ExpenseDialog from '../components/expense/expense-dialog';

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
        <ExpenseDialog />
        {days.map((day, index) => (
          <ExpenseCard key={index} day={day} />
        ))}
      </main>
    </div>
  );
};

export default Home;
