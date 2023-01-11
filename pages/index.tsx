import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { ExpensesList } from '../components/expense';
import useAuth from '../hooks/use-auth';
import Layout from '../layout';

const Home: NextPage = () => {
  const { authenticated, checkAuthStateAndRedirect } = useAuth(true);

  useEffect(() => {
    checkAuthStateAndRedirect('/login');
  }, [checkAuthStateAndRedirect]);

  if (!authenticated) return null;

  return (
    <div>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Keep track of expenses share with others and split" />
      </Head>

      <Layout>
        <ExpensesList />
      </Layout>
    </div>
  );
};

export default Home;
