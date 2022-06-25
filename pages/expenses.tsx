import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Expenses from '../components/expense';
import useAuth from '../hooks/use-auth';

const Home: NextPage = () => {
  const { authenticated, checkAuthStateAndRedirect } = useAuth(true);

  useEffect(() => {
    checkAuthStateAndRedirect('/login');
  }, [checkAuthStateAndRedirect]);

  if (!authenticated) return null;

  return (
    <div>
      <Head>
        <title>Expenses</title>
        <meta name="description" content="Expenses list view and analytics" />
      </Head>

      <main>
        <Expenses />
      </main>
    </div>
  );
};

export default Home;
