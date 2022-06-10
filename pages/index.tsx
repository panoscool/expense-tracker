import Grid from '@mui/material/Grid';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import AccountList from '../components/account/account-list';
import CategoryList from '../components/category/category-list';
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AccountList />
          </Grid>

          <Grid item xs={12} md={6}>
            <CategoryList />
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Home;
