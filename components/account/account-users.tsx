import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useIsDesktop from '../../hooks/use-is-desktop';
import { User } from '../../lib/interfaces/user';
import { getAccount, updateAccount } from '../../lib/services/account';
import { getDialogWidth } from '../../lib/utils/common-breakpoints';
import { getInitials } from '../../lib/utils/get-initials';
import { stringToColor } from '../../lib/utils/string-to-color';
import useHasAccess from '../../hooks/use-has-access';
import { Tooltip } from '@mui/material';

type Props = {
  accountId: string | undefined;
  open: boolean;
  onClose: () => void;
};

const AccountUsers: React.FC<Props> = ({ accountId, open, onClose }) => {
  const isDesktop = useIsDesktop();
  const { hasAccess } = useHasAccess();
  const { account, dispatch } = useAppContext();

  useEffect(() => {
    if (accountId) {
      getAccount(dispatch, accountId);
    }
  }, [accountId, dispatch]);

  const handleDeleteUser = (email: string) => async () => {
    if (window.confirm(`Are you sure you want to delete the user ${email}?`)) {
      if (account) {
        await updateAccount(dispatch, {
          ...account,
          email: email,
        });

        await getAccount(dispatch, account._id);
      }
    }
  };

  function stringAvatar(id: string, name: string) {
    return {
      sx: {
        bgcolor: stringToColor(id),
      },
      children: getInitials(name),
    };
  }

  if (!account) return null;

  const accountOwner = account.users.find((u) => u._id === account.user);
  const sharedWith = account.users.filter((u) => u._id !== account.user);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ minWidth: getDialogWidth(isDesktop) }}>
        <Box mb={2}>
          <Typography variant="h6">{account.name}</Typography>
          <Typography gutterBottom variant="body2">
            {account.description}
          </Typography>

          <Divider />
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Owner: {accountOwner?.name}
        </Alert>

        {account.users.length > 1 ? (
          <List subheader={<ListSubheader>Shared with:</ListSubheader>}>
            {sharedWith.map((user: User) => (
              <ListItem key={user._id} disablePadding>
                <ListItemAvatar>
                  <Avatar {...stringAvatar(user._id, user.name)} />
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.email} />
                <ListItemSecondaryAction>
                  <Tooltip title="Remove user from account" placement="left">
                    <span>
                      <IconButton
                        edge="end"
                        color="error"
                        disabled={!hasAccess(account?.user)}
                        onClick={handleDeleteUser(user.email)}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
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
