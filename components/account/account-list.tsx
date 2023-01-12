import { GroupsRounded, LockOutlined } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useAppContext from '../../hooks/use-app-context';
import { Account } from '../../lib/interfaces/account';
import { UseCaseType } from '../../lib/interfaces/common';
import { AccountActions } from './account-actions';

type Props = {
  onAccountSelect: (useCase: UseCaseType, account?: Account) => React.MouseEventHandler;
};

export const AccountList: React.FC<Props> = ({ onAccountSelect }) => {
  const { accounts } = useAppContext();

  return (
    <List>
      {accounts?.map((account) => (
        <ListItem key={account._id}>
          <ListItemIcon>{account.users.length > 1 ? <GroupsRounded /> : <LockOutlined />}</ListItemIcon>
          <ListItemText primary={account.name} sx={{ textTransform: 'capitalize' }} />
          <AccountActions account={account} onOpen={onAccountSelect} />
        </ListItem>
      ))}
    </List>
  );
};
