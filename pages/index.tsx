import Grid from '@mui/material/Grid';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import AccountList from '../components/account/account-list';
import CategoryList from '../components/category/category-list';
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
        <title>Expense Tracker</title>
        <meta name="description" content="Keep track of expenses share with others and split" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container spacing={4}>
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
