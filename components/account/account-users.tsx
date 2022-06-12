import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useIsDesktop from '../../hooks/use-is-desktop';
import { User } from '../../lib/interfaces/user';
import { getAccount, getAccounts, updateAccount } from '../../lib/services/account';
import { getDialogWidth } from '../../lib/utils/common-breakpoints';

type Props = {
  accountId: string | undefined;
  open: boolean;
  onClose: () => void;
};

const AccountUsers: React.FC<Props> = ({ accountId, open, onClose }) => {
  const isDesktop = useIsDesktop();
  const { error, account, dispatch } = useAppContext();

  useEffect(() => {
    if (accountId) {
      getAccount(dispatch, accountId);
    }
  }, [accountId, dispatch]);

  const handleDeleteUser = (email: string) => async () => {
    if (window.confirm(`Are you sure you want to delete the user ${email}?`)) {
      if (account) {
        await updateAccount(dispatch, {
          id: account._id,
          name: account.name,
          description: account.description,
          email: email,
        });

        getAccount(dispatch, account._id);
        getAccounts(dispatch);
      }
    }
  };

  if (!account) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ minWidth: getDialogWidth(isDesktop) }}>
        <Typography color="error">{error}</Typography>

        <Box mb={2}>
          <Typography variant="h6">{account.name}</Typography>
          <Typography gutterBottom variant="body2">
            {account.description}
          </Typography>

          <Divider />
        </Box>

        {account.users.length > 1 ? (
          <List subheader={<ListSubheader disableGutters>Shared with:</ListSubheader>}>
            {account.users
              .filter((u: User) => u._id !== account.user)
              .map((user: User) => (
                <ListItem key={user._id} disablePadding>
                  <ListItemText primary={user.name} secondary={user.email} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={handleDeleteUser(user.email)}>
                      <DeleteRoundedIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        ) : (
          <Typography variant="caption">This account is not shared with any user.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountUsers;
