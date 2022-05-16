import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import ExpenseForm from './expense-form';

const ExpenseDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button color="secondary" startIcon={<AddRoundedIcon />} onClick={toggleOpen}>
        Add Expense
      </Button>

      <Dialog open={open}>
        <Box padding={2}>
          <ExpenseForm cancel={toggleOpen} />
        </Box>
      </Dialog>
    </div>
  );
};

export default ExpenseDialog;
