import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import useAppState from '../hooks/use-app-state';
import { AppContextType } from '../lib/interfaces/common';
import { palette } from '../styles/palette';
import { components } from '../styles/components';
import { storeGetThemeMode } from '../lib/config/store';
import { useMediaQuery } from '@mui/material';
import { User } from '../lib/interfaces/user';

const initState: AppContextType = {
  themeMode: 'light',
  user: null,
  loading: [],
  error: null,
  accounts: null,
  account: null,
  expenses: null,
  expense: null,
  categories: null,
  payments: null,
  notifications: [],
  authenticated: false,
  dispatch: () => {},
  setUser: () => {},
  setThemeMode: () => {},
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const storedThemeMode = storeGetThemeMode(prefersDarkMode ? 'dark' : 'light');

  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(storedThemeMode);
  const [user, setUser] = useState<User | null>(null);
  const { state, dispatch } = useAppState();
  const notistackRef: any = useRef(null);

  const authenticated = useMemo(() => Boolean(user?._id), [user]);

  useEffect(() => setThemeMode(storedThemeMode), [storedThemeMode]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: palette(themeMode),
        components: components(),
      }),
    [themeMode],
  );

  const theme = responsiveFontSizes(muiTheme);

  const onClickDismissNotification = (key: SnackbarKey) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  const contextValues = {
    themeMode,
    user,
    authenticated,
    ...state,
  };

  const contextFunctions = {
    dispatch,
    setUser,
    setThemeMode,
  };

  return (
    <AppContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          ref={notistackRef}
          maxSnack={2}
          preventDuplicate
          autoHideDuration={2500}
          disableWindowBlurListener
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          action={(key) => (
            <IconButton color="inherit" onClick={onClickDismissNotification(key)}>
              <CloseRoundedIcon />
            </IconButton>
          )}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
