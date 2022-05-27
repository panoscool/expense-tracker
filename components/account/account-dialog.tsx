import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import AccountForm from './account-form';

const ExpenseDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button color="secondary" startIcon={<AddRoundedIcon />} onClick={toggleOpen}>
        Add Account
      </Button>

      <Dialog open={open}>
        <Box padding={3}>
          <AccountForm cancel={toggleOpen} />
        </Box>
      </Dialog>
    </div>
  );
};

export default ExpenseDialog;
