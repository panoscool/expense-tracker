import { Container } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ExpensesList } from '../components/expense';
import { NoAccountId } from '../components/no-account-id';
import useAuth from '../hooks/use-auth';
import Layout from '../layout';

const Home: NextPage = () => {
  const router = useRouter();
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
        <Container maxWidth="xl">{router.query?.account_id ? <ExpensesList /> : <NoAccountId />}</Container>
      </Layout>
    </div>
  );
};

export default Home;
