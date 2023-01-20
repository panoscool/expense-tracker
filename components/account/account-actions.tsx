import { DeleteRounded, EditRounded, MoreVertRounded, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import useAppContext from '../../hooks/use-app-context';
import useHasAccess from '../../hooks/use-has-access';
import { Account } from '../../lib/interfaces/account';
import { UseCaseType } from '../../lib/interfaces/common';
import { deleteAccount, getAccounts } from '../../lib/services/account';

type Props = {
  account: Account;
  onOpen: (useCase: UseCaseType, account?: Account) => React.MouseEventHandler;
};

export function AccountActions({ account, onOpen }: Props) {
  const { isCreator } = useHasAccess();
  const { dispatch } = useAppContext();
  const popupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });

  const handleDeleteAccount = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to delete ${account?.name}?`)) {
      await deleteAccount(dispatch, account?._id);
      await getAccounts(dispatch);
      popupState.close();
    }
  };

  function deleteColor() {
    return { sx: { color: (theme: Theme) => theme.palette.error.main } };
  }

  const handleOpen = (useCase: UseCaseType) => (e: React.MouseEvent) => {
    onOpen(useCase, account)(e);
    popupState.close();
  };

  if (!account) return null;

  return (
    <ListItemSecondaryAction>
      <IconButton color="inherit" {...bindTrigger(popupState)}>
        <MoreVertRounded />
      </IconButton>

      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={handleOpen(UseCaseType.account_view)}>
          <ListItemIcon>
            <VisibilityOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View" />
        </MenuItem>

        <MenuItem onClick={handleOpen(UseCaseType.account_edit)} disabled={!isCreator(account.user)}>
          <ListItemIcon>
            <EditRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>

        <MenuItem onClick={handleDeleteAccount} disabled={!isCreator(account.user)}>
          <ListItemIcon {...deleteColor()}>
            <DeleteRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" {...deleteColor()} />
        </MenuItem>
      </Menu>
    </ListItemSecondaryAction>
  );
}
