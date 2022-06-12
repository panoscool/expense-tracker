import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { Box, Button, Divider, Grid } from '@mui/material';
import { format } from 'date-fns';
import groupBy from 'lodash/groupBy';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useIsDesktop from '../../hooks/use-is-desktop';
import DateField from '../shared/date-field';
import EmptyList from '../shared/empty-list';
import ExpenseCard from './expense-card';
import UserPayable from './user-payable';

const TotalPerDay = dynamic(() => import('./charts/total-per-day'), { ssr: false });
const TotalPerUser = dynamic(() => import('./charts/total-per-user'), { ssr: false });

const Expenses: React.FC = () => {
  const isDesktop = useIsDesktop();
  const { expenses, getExpenses, modal, setModal } = useAppContext();
  const [selectedDate, setSelectedDate] = useState({ date: new Date() });

  useEffect(() => {
    getExpenses(`date=${format(selectedDate.date, 'yyyy-MM-dd')}`);
  }, [getExpenses, selectedDate.date]);

  const handleExpenseEdit = (id: string) => {
    setModal({ open: 'expense-form', params: id });
  };

  const groupedByDay = groupBy(expenses, (expense) => format(new Date(expense.date), 'yyyy-MM-dd'));
  const dates = Object.keys(groupedByDay);
  const days = dates.map((day) => groupedByDay[day]);

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

      <UserPayable expenses={expenses || []} />

      <Box mt={8} mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <DateField
            views={['year', 'month']}
            format="MMMM yyyy"
            label="Month"
            value={selectedDate.date}
            onChange={setSelectedDate}
          />
          <Button color="inherit" startIcon={<FilterAltRoundedIcon />} disabled>
            Filter
          </Button>
        </Box>
        <Divider />
      </Box>
      {days?.length > 0 ? (
        days?.map((day, index) => (
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
