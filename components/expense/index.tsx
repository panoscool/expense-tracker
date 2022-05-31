import { Box, Divider, Dialog, Typography, Button } from '@mui/material';
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
import { IExpense } from '../../lib/models/expense';

const DailyGraph = dynamic(() => import('./charts/daily'), { ssr: false });

const Expenses: React.FC = () => {
  const router = useRouter();
  const { modal, setModal } = useAppState();
  const [expenses, fetchExpenses, loading] = useFetch();
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const getExpenses = useCallback(() => {
    if (router.query.account_id) {
      fetchExpenses('GET', `/expense/?id=${router.query.account_id}`);
    }
  }, [fetchExpenses, router.query.account_id]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const handleOpenModal = () => {
    setModal('expense-form');
  };

  const handleSelectExpense = (expense: IExpense) => {
    setSelectedExpense(expense);
  };

  const groupedByDay = groupBy(expenses, (expense) => format(new Date(expense.date), 'yyyy-MM-dd'));
  const dates = Object.keys(groupedByDay);
  const days = dates.map((day) => groupedByDay[day]);

  const currentMonth = format(new Date(), 'LLLL');
  const modalOpen = modal === 'expense-form';

  return (
    <div>
      <DailyGraph days={days} dates={dates} />
      <Box mt={8} mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{currentMonth}</Typography>
          <Button color="secondary" startIcon={<AddRoundedIcon />} onClick={handleOpenModal}>
            Add Expense
          </Button>
        </Box>
        <Divider />
      </Box>
      {days?.map((day, index) => (
        <ExpenseCard
          key={index}
          date={dates[index]}
          day={day}
          onOpenModal={setModal}
          onSelectExpense={handleSelectExpense}
        />
      ))}

      <Dialog open={modalOpen}>
        <Box padding={2}>
          <ExpenseForm getExpenses={getExpenses} selectedExpense={selectedExpense} />
        </Box>
      </Dialog>

      <Loading loading={loading} />
    </div>
  );
};

export default Expenses;
