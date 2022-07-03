import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import DropDown from '../components/shared/drop-down';
import NextLink from '../components/shared/next-link';
import useAppContext from '../hooks/use-app-context';
import useIsDesktop from '../hooks/use-is-desktop';
import { Account } from '../lib/interfaces/account';
import { logout, setModal } from '../lib/services/helpers';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(20px)',
  backgroundColor: alpha(theme.palette.common.black, 0.7),
}));

const Topbar: React.FC = () => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const { user, accounts, dispatch } = useAppContext();

  const handleAccountSelect = (id: string) => () => {
    router.push(`/expenses/?account_id=${id}`);
  };

  const handleAddExpense = () => {
    setModal(dispatch, { open: 'expense-form' });
  };

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          <NextLink href="/" style={{ color: 'inherit' }}>
            Expenses
          </NextLink>
        </Typography>

        <Button
          color="inherit"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={handleAddExpense}
        >
          Expense
        </Button>

        <DropDown
          label="Accounts"
          btnSize="large"
          btnType={isDesktop ? 'text' : 'icon'}
          icon={<AccountBalanceWalletRoundedIcon />}
        >
          {accounts?.map((account: Account) => (
            <MenuItem key={account._id} onClick={handleAccountSelect(account._id)}>
              {account.name}
            </MenuItem>
          ))}
        </DropDown>

        <DropDown
          icon={user?.image ? <Avatar src={user.image} alt="user" /> : <AccountCircleRoundedIcon />}
          btnSize="large"
          btnType="icon"
        >
          <NextLink href="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>
            <MenuItem>
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={user?.name} sx={{ textTransform: 'capitalize' }} />
            </MenuItem>
          </NextLink>
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
