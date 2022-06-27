import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
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
import MenuItem from '@mui/material/MenuItem';
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useHasAccess from '../../hooks/use-has-access';
import { Account } from '../../lib/interfaces/account';
import { deleteAccount, getAccounts } from '../../lib/services/account';
import DropDown from '../shared/drop-down';
import AccountForm from './account-form';
import AccountUsers from './account-users';

const AccountList = () => {
  const router = useRouter();
  const { isCreator } = useHasAccess();
  const { accounts, dispatch } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    getAccounts(dispatch);
  }, [dispatch]);

  const handleAccountSelect = (id: string) => () => {
    router.push(`/expenses/?account_id=${id}`);
  };

  const handleAccountEdit = (account: Account) => (e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedAccount(account);
    setShowForm(true);
  };

  const handleAccountDelete = (account: Account) => async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to delete ${account.name}?`)) {
      await deleteAccount(dispatch, account._id);
    }
  };

  const handleOpenModal = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setSelectedAccount(null);
    setShowForm(false);
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

  function deleteColor() {
    return { sx: { color: (theme: Theme) => theme.palette.error.main } };
  }

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
              <ListItemSecondaryAction sx={{ display: 'flex' }}>
                <div>
                  <IconButton onClick={handleOpenUsers(account)}>
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </div>
                <DropDown
                  btnType="icon"
                  icon={<MoreVertRoundedIcon />}
                  disabled={!isCreator(account.user)}
                >
                  <MenuItem onClick={handleAccountEdit(account)}>
                    <ListItemIcon>
                      <EditRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </MenuItem>
                  <MenuItem onClick={handleAccountDelete(account)}>
                    <ListItemIcon {...deleteColor()}>
                      <DeleteRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" {...deleteColor()} />
                  </MenuItem>
                </DropDown>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={showForm}>
        <AccountForm selectedAccount={selectedAccount} closeModal={handleCloseModal} />
      </Dialog>

      <AccountUsers accountId={selectedAccount?._id} open={showUsers} onClose={handleCloseUsers} />
    </Box>
  );
};

export default AccountList;
