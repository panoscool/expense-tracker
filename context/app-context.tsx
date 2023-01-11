import { createContext, useRef, useState } from 'react';
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
  setAuthenticated: () => {},
  setThemeMode: () => {},
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const storedTheme = storeGetThemeMode(prefersDarkMode ? 'dark' : 'light');

  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(storedTheme);
  const [authenticated, setAuthenticated] = useState(false);
  const { state, dispatch } = useAppState();
  const notistackRef: any = useRef(null);

  const muiTheme = createTheme({
    palette: palette(themeMode),
    components: components(),
  });

  const theme = responsiveFontSizes(muiTheme);

  const onClickDismiss = (key: SnackbarKey) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  const contextValues = {
    themeMode,
    authenticated,
    ...state,
  };
  const contextFunctions = {
    dispatch,
    setAuthenticated,
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
            <IconButton color="inherit" onClick={onClickDismiss(key)}>
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
