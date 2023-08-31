import GroupsRounded from '@mui/icons-material/GroupsRounded';
import LockOutlined from '@mui/icons-material/LockOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useAppContext } from '../context/app-context';

export function AccountsList() {
  const { accounts } = useAppContext();

  return (
    <List disablePadding>
      {accounts?.map((account) => (
        <ListItem key={account._id} disablePadding disableGutters>
          <ListItemButton component={Link} href={`/?account_id=${account._id}`}>
            <ListItemIcon>{account.users.length > 1 ? <GroupsRounded /> : <LockOutlined />}</ListItemIcon>
            <ListItemText primary={account.name} />
            <Typography variant="caption" color="textSecondary" pt={0.5}>
              {account.currency}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
