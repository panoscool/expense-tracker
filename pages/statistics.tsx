import { Box } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AccountTotal } from '../components/statistics/account-total';
import { CategoryTotal } from '../components/statistics/category-total';
import { StatisticsFilters } from '../components/statistics/statistics-filters';
import { UserTotal } from '../components/statistics/user-total';
import useAuth from '../hooks/use-auth';
import { Filters } from '../lib/interfaces/statistics';

const Statistics: NextPage = () => {
  const router = useRouter();
  const { authenticated, checkAuthStateAndRedirect } = useAuth(true);

  useEffect(() => {
    checkAuthStateAndRedirect('/login');
  }, [checkAuthStateAndRedirect]);

  if (!authenticated) return null;

  const { date_from, date_to, account_id }: Filters = router.query;

  const filters = { account_id, date_from, date_to };

  return (
    <div>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Keep track of expenses share with others and split" />
      </Head>

      <main>
        <StatisticsFilters />
        <Box display="flex" flexDirection="column" gap={2}>
          <AccountTotal filters={filters} />
          <CategoryTotal filters={filters} />
        </Box>
      </main>
    </div>
  );
};

export default Statistics;
