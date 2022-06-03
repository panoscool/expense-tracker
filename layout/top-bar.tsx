import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AppBar from '@mui/material/AppBar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
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
  const { accounts, setModal } = useAppState();

  const handleAccountSelect = (id: string) => () => {
    router.push(`/expenses/?account_id=${id}`);
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

        <DropDown icon={<AccountBalanceWalletIcon />} id="account">
          {accounts?.map((account: Account) => (
            <MenuItem key={account._id} onClick={handleAccountSelect(account._id)}>
              {account.name}
            </MenuItem>
          ))}
          <MenuItem onClick={() => setModal('account-form')}>
            <ListItemIcon>
              <AddRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Account" />
          </MenuItem>
        </DropDown>

        <DropDown icon={<AccountCircleIcon />} id="user">
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </DropDown>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Topbar;
