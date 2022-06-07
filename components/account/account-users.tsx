import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Typography from '@mui/material/Typography';
import { Account } from '../../lib/interfaces/account';

type Props = {
  account: Account | null;
  open: boolean;
  onClose: () => void;
};

const AccountUsers: React.FC<Props> = ({ account, open, onClose }) => {
  if (!account) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ minWidth: 360 }}>
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
              .filter((u) => u._id !== account.user)
              .map((user) => (
                <ListItem key={user._id} disablePadding>
                  <ListItemText primary={user.name} secondary={user.email} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
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
