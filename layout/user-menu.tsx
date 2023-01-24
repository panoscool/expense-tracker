import SettingsRounded from '@mui/icons-material/SettingsRounded';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRounded from '@mui/icons-material/ExitToAppRounded';
import PersonRounded from '@mui/icons-material/PersonRounded';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import Link from 'next/link';
import { User } from '../lib/interfaces/user';

interface Props {
  user: User;
  logout: () => void;
}
export function UserMenu({ user, logout }: Props) {
  const popupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });

  const handleLogout = () => {
    logout();
    popupState.close();
  };

  return (
    <div>
      <IconButton {...bindTrigger(popupState)} sx={{ p: 0, color: 'inherit' }} aria-label="user menu">
        {user?.image ? <Avatar src={user.image} alt={user?.name} /> : <AccountCircleRounded fontSize="large" />}
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close} component={Link} href="/profile">
          <ListItemIcon>
            <PersonRounded />
          </ListItemIcon>
          <ListItemText primary={user?.name} sx={{ textTransform: 'capitalize' }} />
        </MenuItem>
        <MenuItem onClick={popupState.close} component={Link} href="/settings">
          <ListItemIcon>
            <SettingsRounded />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{ textTransform: 'capitalize' }} />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppRounded />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}
