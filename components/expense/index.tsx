import { Box, Divider, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppContext } from '../../context/app-context';
import useIsDesktop from '../../hooks/use-is-desktop';
import { getExpenses } from '../../lib/services/expense';
import { getPayments } from '../../lib/services/payment';
import { getExpensesGroupedByDay, getTotalUsers } from '../../lib/utils/expense-calculations';
import { AccountInfo } from '../account/account-info';
import EmptyList from '../shared/empty-list';
import { ExpenseCard } from './expense-card';
import { ExpenseFilters } from './expense-filters';
import { UserPayable } from './user-payable';

const TotalPerDay = dynamic(() => import('./charts/total-per-day'), { ssr: false });
const TotalPerUser = dynamic(() => import('./charts/total-per-user'), { ssr: false });
const TotalPerCategory = dynamic(() => import('./charts/total-per-category'), { ssr: false });

export const ExpensesList: React.FC = () => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const { expenses, account, themeMode, dispatch } = useAppContext();

  useEffect(() => {
    if (router.query.account_id) {
      getExpenses(dispatch);
      getPayments(dispatch);
    }
  }, [dispatch, router.query]);

  const groupedByDay = getExpensesGroupedByDay(expenses || []);
  const dates = Object.keys(groupedByDay);
  const days = dates.map((day) => groupedByDay[day]);
  const totalUsers = getTotalUsers(expenses || []);

  return (
    <Box pb={8}>
      <AccountInfo />

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {isDesktop && (
          <Grid item xs={12} md={9}>
            <TotalPerDay days={days} dates={dates} currency={account?.currency} themeMode={themeMode} />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <TotalPerUser expenses={expenses || []} currency={account?.currency} themeMode={themeMode} />
        </Grid>
      </Grid>

      <TotalPerCategory expenses={expenses || []} currency={account?.currency} themeMode={themeMode} />
      {totalUsers > 1 && <UserPayable />}

      <Box mt={8} mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <ExpenseFilters />

          <Typography variant="caption">Results: {expenses?.length}</Typography>
        </Box>
        <Divider />
      </Box>
      {days?.length > 0 ? (
        days.map((day, index) => (
          <ExpenseCard key={index} date={dates[index]} day={day} currency={account?.currency} users={totalUsers} />
        ))
      ) : (
        <EmptyList />
      )}
    </Box>
  );
};
