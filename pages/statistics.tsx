import { Box, Container } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { AccountTotal } from '../components/statistics/account-total';
import { CategoryTotal } from '../components/statistics/category-total';
import { StatisticsFilters } from '../components/statistics/account-select';
import useAuth from '../hooks/use-auth';
import Layout from '../layout';
// import { UserTotal } from '../components/statistics/user-total';
import { TransactionsTotal } from '../components/statistics/transactions-total';
import useAppContext from '../hooks/use-app-context';
import { getAccount } from '../lib/services/account';

const Statistics: NextPage = () => {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const { authenticated, checkAuthStateAndRedirect } = useAuth(true);

  const accountId = useMemo(() => router.query.account_id, [router.query.account_id]);

  useEffect(() => {
    checkAuthStateAndRedirect('/login');
  }, [checkAuthStateAndRedirect]);

  useEffect(() => {
    if (typeof accountId === 'string') {
      getAccount(dispatch, accountId);
    }
  }, [accountId, dispatch]);

  if (!authenticated) return null;

  return (
    <div>
      <Head>
        <title>Statistics - Expense Tracker</title>
        <meta name="description" content="Keep track of expenses share with others and split" />
      </Head>

      <Layout>
        <Container maxWidth="xl" sx={{ pt: 2 }}>
          <StatisticsFilters />
          <Box display="flex" flexDirection="column" gap={2}>
            <AccountTotal />
            <TransactionsTotal />
            <CategoryTotal />
            {/* <UserTotal /> */}
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default Statistics;
