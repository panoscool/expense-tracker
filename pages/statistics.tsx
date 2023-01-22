import { Box, Container } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AccountTotal } from '../components/statistics/account-total';
import { CategoryTotal } from '../components/statistics/category-total';
import { StatisticsFilters } from '../components/statistics/account-select';
import useAuth from '../hooks/use-auth';
import Layout from '../layout';
// import { UserTotal } from '../components/statistics/user-total';
import { TransactionsTotal } from '../components/statistics/transactions-total';

const Statistics: NextPage = () => {
  const router = useRouter();
  const { authenticated, checkAuthStateAndRedirect } = useAuth(true);

  useEffect(() => {
    checkAuthStateAndRedirect('/login');
  }, [checkAuthStateAndRedirect]);

  if (!authenticated) return null;

  const accountId = router.query.account_id as string;

  return (
    <div>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Keep track of expenses share with others and split" />
      </Head>

      <Layout>
        <Container maxWidth="xl" sx={{ pt: 2 }}>
          <StatisticsFilters />
          <Box display="flex" flexDirection="column" gap={2}>
            <AccountTotal accountId={accountId} />
            <TransactionsTotal accountId={accountId} />
            <CategoryTotal accountId={accountId} />
            {/* <UserTotal accountId={accountId} /> */}
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default Statistics;
