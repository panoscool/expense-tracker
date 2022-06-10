import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useId } from 'react';
import store from 'store';
import DropDown from '../components/shared/drop-down';
import NextLink from '../components/shared/next-link';
import useAppState from '../hooks/use-app-state';
import { Account } from '../lib/interfaces/account';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(20px)',
  backgroundColor: alpha(theme.palette.common.black, 0.7),
}));

const Topbar: React.FC = () => {
  const router = useRouter();
  const id = useId();
  const { auth, accounts, setModal } = useAppState();

  const handleAccountSelect = (id: string) => () => {
    router.push(`/expenses/?account_id=${id}`);
  };

  const handleAddExpense = () => {
    setModal({ open: 'expense-form' });
  };

  const handleLogout = () => {
    store.remove('auth');
    router.push('/login');
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          <NextLink href="/" style={{ color: 'inherit' }}>
            Expenses
          </NextLink>
        </Typography>

        <Button color="inherit" startIcon={<AddRoundedIcon />} onClick={handleAddExpense}>
          Add Expense
        </Button>

        <DropDown
          id={id}
          btnSize="large"
          btnType="text"
          label="Accounts"
          icon={<AccountBalanceWalletRoundedIcon />}
        >
          {accounts?.map((account: Account) => (
            <MenuItem key={account._id} onClick={handleAccountSelect(account._id)}>
              {account.name}
            </MenuItem>
          ))}
        </DropDown>

        <DropDown icon={<AccountCircleRoundedIcon />} id={id} btnSize="large">
          <MenuItem disabled>
            <ListItemIcon>
              <PersonRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={auth?.name} sx={{ textTransform: 'capitalize' }} />
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </DropDown>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Topbar;
