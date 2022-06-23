import { createContext, useState } from 'react';
import useAppState from '../hooks/use-app-state';
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
  notifications: [],
  authenticated: false,
  dispatch: () => {},
  setAuthenticated: () => {},
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const { state, dispatch } = useAppState();

  const {
    user,
    accounts,
    account,
    expenses,
    expense,
    categories,
    modal,
    loading,
    error,
    notifications,
  } = state;

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
    notifications,
    authenticated,
  };
  const contextFunctions = {
    dispatch,
    setAuthenticated,
  };

  return (
    <AppContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
