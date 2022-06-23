import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Expenses from '../components/expense';
import useProtectedRoute from '../hooks/use-protected-route';

const Home: NextPage = () => {
  const { authenticated, checkAuthState } = useProtectedRoute(true);

  useEffect(() => {
    checkAuthState('/login');
  }, [checkAuthState]);

  if (!authenticated) return null;

  return (
    <div>
      <Head>
        <title>Expenses</title>
        <meta name="description" content="Keep track of expenses share with others and split" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Expenses />
      </main>
    </div>
  );
};

export default Home;
