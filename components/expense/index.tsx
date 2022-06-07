import { Box, Divider, Dialog, Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import groupBy from 'lodash/groupBy';
import { useCallback, useEffect, useState } from 'react';
import useFetch from '../../hooks/use-fetch';
import Loading from '../shared/loading';
import ExpenseCard from './expense-card';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ExpenseForm from './expense-form';
import useAppState from '../../hooks/use-app-state';
import { Expense } from '../../lib/interfaces/expense';
import DateField from '../shared/date-field';
import EmptyList from '../shared/empty-list';

const DailyGraph = dynamic(() => import('./charts/daily'), { ssr: false });

const Expenses: React.FC = () => {
  const router = useRouter();
  const { modal, setModal } = useAppState();
  const [selectedDate, setSelectedDate] = useState({ date: new Date() });
  const [expenses, fetchExpenses, loading, error] = useFetch();
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const getExpenses = useCallback(async () => {
    if (router.query.account_id) {
      await fetchExpenses(
        'GET',
        `/expense/?id=${router.query.account_id}&date=${format(selectedDate.date, 'yyyy-MM-dd')}`,
      );
    }
  }, [fetchExpenses, router.query.account_id, selectedDate.date]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const handleOpenModal = () => {
    setModal('expense-form');
  };

  const handleSelectExpense = (expense: Expense) => {
    setSelectedExpense(expense);
  };

  const groupedByDay = groupBy(expenses, (expense) => format(new Date(expense.date), 'yyyy-MM-dd'));
  const dates = Object.keys(groupedByDay);
  const days = dates.map((day) => groupedByDay[day]);

  const modalOpen = modal === 'expense-form';

  if (loading) return <Loading loading={loading} />;

  return (
    <div>
      <Typography color="error">{error}</Typography>

      <DailyGraph days={days} dates={dates} />
      <Box mt={8} mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <DateField
            views={['year', 'month']}
            format="MMMM yyyy"
            label="Month"
            value={selectedDate.date}
            onChange={setSelectedDate}
          />
          <Button color="primary" startIcon={<AddRoundedIcon />} onClick={handleOpenModal}>
            Add Expense
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
            onOpenModal={setModal}
            onSelectExpense={handleSelectExpense}
          />
        ))
      ) : (
        <EmptyList />
      )}

      <Dialog open={modalOpen}>
        <ExpenseForm
          getExpenses={getExpenses}
          selectedExpense={selectedExpense}
          setSelectedExpense={setSelectedExpense}
        />
      </Dialog>
    </div>
  );
};

export default Expenses;
