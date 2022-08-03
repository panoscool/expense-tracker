import { Box, Divider, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { groupBy } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useIsDesktop from '../../hooks/use-is-desktop';
import { QueryParams } from '../../lib/interfaces/common';
import { getAccount, getAccounts } from '../../lib/services/account';
import { getExpenses } from '../../lib/services/expense';
import { setModal } from '../../lib/services/helpers';
import { getPayments } from '../../lib/services/payment';
import { getTotalUsers } from '../../lib/utils/expense-calculations';
import EmptyList from '../shared/empty-list';
import ExpenseCard from './expense-card';
import ExpenseFilters from './expense-filters';
import UserPayable from './user-payable';

const TotalPerDay = dynamic(() => import('./charts/total-per-day'), { ssr: false });
const TotalPerUser = dynamic(() => import('./charts/total-per-user'), { ssr: false });
const TotalPerCategory = dynamic(() => import('./charts/total-per-category'), { ssr: false });

const Expenses: React.FC = () => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const { expenses, account, dispatch } = useAppContext();

  const { account_id, user_id, date, category }: QueryParams = router.query;

  useEffect(() => {
    getAccounts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (account_id) {
      getExpenses(dispatch);
      getPayments(dispatch);
      getAccount(dispatch, account_id);
    }
  }, [dispatch, account_id, user_id, date, category]);

  const handleExpenseEdit = (id: string) => {
    setModal(dispatch, { open: 'expense-form', id });
  };

  const groupedByDay = groupBy(expenses, (expense) => format(new Date(expense.date), 'yyyy-MM-dd'));
  const dates = Object.keys(groupedByDay);
  const days = dates.map((day) => groupedByDay[day]);
  const totalUsers = getTotalUsers(expenses || []);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{account?.name}</Typography>

        {account && account?.users.length > 1 && (
          <Typography variant="caption">Users: {account?.users.length}</Typography>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {isDesktop && (
          <Grid item xs={12} md={9}>
            <TotalPerDay days={days} dates={dates} />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <TotalPerUser expenses={expenses || []} />
        </Grid>
      </Grid>

      <TotalPerCategory expenses={expenses || []} />
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
          <ExpenseCard
            key={index}
            date={dates[index]}
            day={day}
            onSelectExpense={handleExpenseEdit}
          />
        ))
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default Expenses;
