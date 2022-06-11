import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Expenses from '../components/expense';
import useProtectedRoute from '../hooks/use-protected-route';

const Home: NextPage = () => {
  const { auth, checkAuthState } = useProtectedRoute(true);

  useEffect(() => {
    checkAuthState('/login');
  }, [checkAuthState]);

  if (!auth?.id) return null;

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
