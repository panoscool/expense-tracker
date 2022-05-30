import type { NextPage } from 'next';
import Head from 'next/head';
import Expenses from '../components/expense';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Expense Tracker App</title>
        <meta name="description" content="Keep track of expenses and share with others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Expenses />
      </main>
    </div>
  );
};

export default Home;
