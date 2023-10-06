import { Box, Container } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { StatisticsFilters } from '../components/statistics/account-select';
import { AccountTotal } from '../components/statistics/account-total';
import { CategoryTotal } from '../components/statistics/category-total';
import useAuth from '../hooks/use-auth';
import Layout from '../layout';
// import { UserTotal } from '../components/statistics/user-total';
import PageTitle from '../components/page-title';
import { TransactionsTotal } from '../components/statistics/transactions-total';
import { useAppContext } from '../context/app-context';
import { getAccount } from '../lib/services/account';

const Statistics: NextPage = () => {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const { authenticated, checkAuthStateAndRedirect } = useAuth();

  const accountId = router.query.account_id;

  useEffect(() => {
    checkAuthStateAndRedirect();
  }, [checkAuthStateAndRedirect]);

  useEffect(() => {
    if (typeof accountId === 'string') {
      getAccount(dispatch, accountId);
    }
  }, [accountId, dispatch]);

  if (!authenticated) return null;

  return (
    <div>
      <PageTitle page="statistics" />

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
