import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Expenses from '../components/expense';
import useAppState from '../hooks/use-app-state';

const Home: NextPage = () => {
  const router = useRouter();
  const { auth, loading } = useAppState();

  useEffect(() => {
    if (!loading && !auth?.id) {
      router.push('/login');
    }
  }, [auth?.id, loading, router]);

  if (loading || !auth?.id) {
    return <p>Loading...</p>;
  }

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
