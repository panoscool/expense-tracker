import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useAppState from '../../hooks/use-app-state';
import AccountForm from './account-form';
import { Account } from '../../lib/interfaces/account';
import AccountUsers from './account-users';

const AccountList = () => {
  const router = useRouter();
  const { accounts, getAccounts } = useAppState();
  const [showForm, setShowForm] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleAccountSelect = (id: string) => () => {
    router.push(`/expenses/?account_id=${id}`);
  };

  const handleAccountEdit = (account: Account) => (e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedAccount(account);
    setShowForm(true);
  };

  const handleOpenModal = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
    setSelectedAccount(null);
  };

  const handleOpenUsers = (account: Account) => (e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedAccount(account);
    setShowUsers(true);
  };

  const handleCloseUsers = () => {
    setSelectedAccount(null);
    setShowUsers(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Accounts</Typography>
        <Tooltip title="Add account">
          <IconButton onClick={handleOpenModal}>
            <AddRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <List>
        {accounts?.map((account) => (
          <ListItem disablePadding key={account._id} onClick={handleAccountSelect(account._id)}>
            <ListItemButton>
              <ListItemIcon>
                {account.users.length > 1 ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={account.name} secondary={account.description} />
              <ListItemSecondaryAction>
                <IconButton onClick={handleOpenUsers(account)}>
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleAccountEdit(account)}>
                  <EditRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={showForm}>
        <AccountForm
          selectedAccount={selectedAccount}
          closeModal={handleCloseModal}
          getAccounts={getAccounts}
        />
      </Dialog>

      <AccountUsers account={selectedAccount} open={showUsers} onClose={handleCloseUsers} />
    </Box>
  );
};

export default AccountList;
