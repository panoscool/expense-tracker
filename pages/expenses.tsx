import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { ExpensesList } from '../components/expense';
import useAuth from '../hooks/use-auth';

const Expenses: NextPage = () => {
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
        <ExpensesList />
      </main>
    </div>
  );
};

export default Expenses;
