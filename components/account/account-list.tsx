import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { useRouter } from 'next/router';
import useAppState from '../../hooks/use-app-state';

const AccountList = () => {
  const router = useRouter();
  const { accounts } = useAppState();

  const handleAccountSelect = (id: string) => () => {
    router.push(`/expenses/?account_id=${id}`);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Accounts</Typography>
        <Tooltip title="Add account">
          <IconButton>
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
                <IconButton>
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton>
                  <EditRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AccountList;
