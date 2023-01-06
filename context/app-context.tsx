import { createContext, useState } from 'react';
import useAppState from '../hooks/use-app-state';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { AppContextType } from '../lib/interfaces/common';

const initState: AppContextType = {
  user: null,
  loading: [],
  error: null,
  modal: null,
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
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const { state, dispatch } = useAppState();

  const { user, accounts, account, expenses, expense, categories, payments, modal, loading, error, notifications } =
    state;

  const contextValues = {
    user,
    loading,
    error,
    modal,
    accounts,
    account,
    expenses,
    expense,
    categories,
    payments,
    notifications,
    authenticated,
  };
  const contextFunctions = {
    dispatch,
    setAuthenticated,
  };

  return (
    <AppContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
