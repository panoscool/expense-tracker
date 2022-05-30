import { Box, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';
import groupBy from 'lodash/groupBy';
import { useCallback, useEffect } from 'react';
import useFetch from '../../hooks/use-fetch';
import Loading from '../shared/loading';
import ExpenseCard from './expense-card';
import ExpenseDialog from './expense-dialog';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DailyGraph = dynamic(() => import('./charts/daily'), { ssr: false });

const Expenses: React.FC = () => {
  const router = useRouter();
  const [expenses, fetchExpenses, loading] = useFetch();

  const getExpenses = useCallback(() => {
    fetchExpenses('GET', `/expense/?id=${router.query.id}`);
  }, [fetchExpenses, router.query.id]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const groupedByDay = groupBy(expenses, (expense) => format(new Date(expense.date), 'yyyy-MM-dd'));
  const dates = Object.keys(groupedByDay);
  const days = dates.map((day) => groupedByDay[day]);

  const currentMonth = format(new Date(), 'LLLL');

  return (
    <div>
      <DailyGraph days={days} dates={dates} />
      <Box mt={8} mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{currentMonth}</Typography>
          <ExpenseDialog getExpenses={getExpenses} />
        </Box>
        <Divider />
      </Box>
      {days?.map((day, index) => (
        <ExpenseCard key={index} date={dates[index]} day={day} />
      ))}

      <Loading loading={loading} />
    </div>
  );
};

export default Expenses;
