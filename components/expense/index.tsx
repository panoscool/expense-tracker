import { Box, Divider, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { groupBy } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useIsDesktop from '../../hooks/use-is-desktop';
import { ExpensesFilters } from '../../lib/interfaces/expense';
import { getAccount } from '../../lib/services/account';
import { getExpenses } from '../../lib/services/expense';
import { setModal } from '../../lib/services/helpers';
import { getTotalUsers } from '../../lib/utils/expense-calculations';
import EmptyList from '../shared/empty-list';
import ExpenseCard from './expense-card';
import ExpenseFilters from './expense-filters';
import UserPayable from './user-payable';

const TotalPerDay = dynamic(() => import('./charts/total-per-day'), { ssr: false });
const TotalPerUser = dynamic(() => import('./charts/total-per-user'), { ssr: false });

const Expenses: React.FC = () => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const { account, expenses, categories, dispatch } = useAppContext();
  const [filterBy, setFilterBy] = useState<string>('date');
  const [state, setState] = useState<ExpensesFilters>({
    date: new Date(),
    user_id: 'all',
    category: 'all',
  });

  useEffect(() => {
    if (router.query.account_id) {
      getAccount(dispatch, router.query.account_id as string);
    }
  }, [dispatch, router.query.account_id]);

  useEffect(() => {
    if (router.query.account_id) {
      getExpenses(dispatch, {
        date: format(state.date, 'yyyy-MM-dd'),
        user_id: state.user_id === 'all' ? null : state.user_id,
        category: state.category === 'all' ? null : state.category,
      });
    }
  }, [dispatch, state, router.query.account_id]);

  const handleExpenseEdit = (id: string) => {
    setModal(dispatch, { open: 'expense-form', params: id });
  };

  const groupedByDay = groupBy(expenses, (expense) => format(new Date(expense.date), 'yyyy-MM-dd'));
  const dates = Object.keys(groupedByDay);
  const days = dates.map((day) => groupedByDay[day]);
  const totalUsers = getTotalUsers(expenses || []);

  return (
    <div>
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

      {totalUsers > 1 && <UserPayable expenses={expenses || []} />}

      <Box mt={8} mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <ExpenseFilters
            filterBy={filterBy}
            account={account}
            categories={categories}
            state={state}
            onFilterByChange={setFilterBy}
            onStateChange={setState}
          />

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
