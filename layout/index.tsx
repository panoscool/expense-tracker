import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { ExpenseForm } from '../components/expense/expense-form';
import Loading from '../components/shared/loading';
import { useAppContext } from '../context/app-context';
import useIsDesktop from '../hooks/use-is-desktop';
import { useNotification } from '../hooks/use-notification';
import {
  storeClearAccessToken,
  storeGetDrawerState,
  storeSetDrawerState,
  storeSetThemeMode,
} from '../lib/config/store';
import { getAccounts } from '../lib/services/account';
import { getCategories } from '../lib/services/category';
import { drawerWidth } from './drawer/drawer-styles';
import { PersistentDrawer } from './drawer/persistent-drawer';
import { TemporaryDrawer } from './drawer/temporary-drawer';
import { UserMenu } from './user-menu';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface MainProps {
  open: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>(({ theme, open }) => ({
  height: '100%',
  position: 'relative',
  marginLeft: 0,
  marginTop: 64,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useNotification();
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(storeGetDrawerState());
  const { user, themeMode, loading, setThemeMode, dispatch } = useAppContext();

  useEffect(() => {
    getAccounts(dispatch);
    getCategories(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (!isDesktop) {
      setOpen(false);
      storeSetDrawerState(false);
    }
  }, [router, isDesktop]);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(!open);
    storeSetDrawerState(!open);
  };

  const toggleThemeMode = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    storeSetThemeMode(newThemeMode);
  };

  const handleLogout = () => {
    storeClearAccessToken();

    router.push('/login');
  };

  const [_, hash] = useMemo(() => router.asPath.split('#'), [router.asPath]);

  return (
    <Box height="100%">
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1}>{!open && <Typography>💰</Typography>}</Box>

          <Button
            startIcon={<AddRoundedIcon />}
            sx={{ mr: 2, color: 'inherit' }}
            component={Link}
            href={`${router.asPath}#create`}
          >
            Create
          </Button>

          <IconButton color="inherit" edge="start" aria-label="toggle theme" onClick={toggleThemeMode} sx={{ mr: 1 }}>
            {themeMode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
          </IconButton>

          {user && <UserMenu user={user} logout={handleLogout} />}
        </Toolbar>
        <Divider />
      </AppBar>

      {isDesktop ? (
        <PersistentDrawer open={open} toggleDrawer={toggleDrawer} />
      ) : (
        <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
      )}

      <Main open={isDesktop && open}>{children}</Main>

      {['create', 'edit'].includes(hash) && (
        <Dialog fullWidth maxWidth="xs" open>
          <ExpenseForm />
        </Dialog>
      )}

      <Loading loading={loading} />
    </Box>
  );
};

export default Layout;
