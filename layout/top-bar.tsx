import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import DropDown from '../components/shared/drop-down';
import useAppContext from '../hooks/use-app-context';
import useIsDesktop from '../hooks/use-is-desktop';
import { Account } from '../lib/interfaces/account';
import { logout } from '../lib/services/helpers';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(20px)',
  backgroundColor: alpha(theme.palette.common.black, 0.7),
}));

const Topbar: React.FC = () => {
  const isDesktop = useIsDesktop();
  const { user, accounts, dispatch } = useAppContext();

  const handleLogout = () => {
    logout(dispatch);
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6" component={Link} href="/" sx={{ color: '#fff' }}>
            Expenses
          </Typography>
        </Box>

        <DropDown
          label="Accounts"
          btnSize="large"
          btnType={isDesktop ? 'text' : 'icon'}
          icon={<AccountBalanceWalletRoundedIcon />}
        >
          {accounts?.map((account: Account) => (
            <MenuItem key={account._id} component={Link} href={`/expenses/?account_id=${account._id}`}>
              {account.name}
            </MenuItem>
          ))}
        </DropDown>

        {/* <IconButton color="inherit" component={Link} href="/statistics">
          <AnalyticsRoundedIcon />
        </IconButton> */}

        <DropDown
          icon={user?.image ? <Avatar src={user.image} alt="user" /> : <AccountCircleRoundedIcon />}
          btnSize="large"
          btnType="icon"
        >
          <MenuItem component={Link} href="/profile">
            <ListItemIcon>
              <PersonRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={user?.name} sx={{ textTransform: 'capitalize' }} />
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
