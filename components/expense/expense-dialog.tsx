import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import ExpenseForm from './expense-form';

const ExpenseDialog: React.FC<{ getExpenses: () => void }> = ({ getExpenses }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    getExpenses();
    setOpen(!open);
  };

  return (
    <div>
      <Button color="secondary" startIcon={<AddRoundedIcon />} onClick={toggleOpen}>
        Add Expense
      </Button>

      <Dialog open={open}>
        <Box padding={2}>
          <ExpenseForm onClose={toggleOpen} />
        </Box>
      </Dialog>
    </div>
  );
};

export default ExpenseDialog;
