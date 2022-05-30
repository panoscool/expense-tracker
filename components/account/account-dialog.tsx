import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import AccountForm from './account-form';

const AccountDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <MenuItem onClick={toggleOpen}>
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add Account" />
      </MenuItem>

      <Dialog open={open}>
        <Box padding={3}>
          <AccountForm cancel={toggleOpen} />
        </Box>
      </Dialog>
    </div>
  );
};

export default AccountDialog;
