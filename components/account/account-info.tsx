import { DeleteRounded, EditRounded, MoreVertRounded, VisibilityOutlined } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useHasAccess from '../../hooks/use-has-access';
import { UseCaseType } from '../../lib/interfaces/common';
import { deleteAccount, getAccounts } from '../../lib/services/account';
import { AccountForm } from './account-form';
import { AccountUsers } from './account-users';

export function AccountInfo() {
  const router = useRouter();
  const { isCreator } = useHasAccess();
  const { account, dispatch } = useAppContext();
  const popupState = usePopupState({ variant: 'popover', popupId: 'userMenu' });
  const [useCase, setUseCase] = useState<UseCaseType | null>(null);
  const [openUser, setOpenUsers] = useState(false);

  const handleDeleteAccount = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!account?._id) return;

    if (window.confirm(`Are you sure you want to delete ${account?.name}?`)) {
      await deleteAccount(dispatch, account?._id);
      // remove account id from query
      router.push({ pathname: router.pathname, query: {} });
      // fetch updated account list
      await getAccounts(dispatch);
      popupState.close();
    }
  };

  function deleteColor() {
    return { sx: { color: (theme: Theme) => theme.palette.error.main } };
  }

  function handleOpen(use: UseCaseType) {
    setUseCase(use);
    popupState.close();
  }

  function handleClose() {
    setUseCase(null);
  }

  function handleOpenUsers() {
    setOpenUsers(true);
    popupState.close();
  }

  if (!account) return null;

  return (
    <Box>
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemText primary={account?.name} secondary={`Users: ${account.users.length}`} />

          <ListItemSecondaryAction>
            <IconButton color="inherit" aria-label="more" {...bindTrigger(popupState)}>
              <MoreVertRounded />
            </IconButton>

            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={handleOpenUsers}>
                <ListItemIcon>
                  <VisibilityOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="View" />
              </MenuItem>

              <MenuItem onClick={() => handleOpen(UseCaseType.account_edit)} disabled={!isCreator(account.user)}>
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
        </ListItem>
      </List>

      <AccountForm open={Boolean(useCase)} useCase={useCase} account={account} onClose={handleClose} />
      <AccountUsers open={openUser} accountId={account?._id} onClose={() => setOpenUsers(false)} />
    </Box>
  );
}
