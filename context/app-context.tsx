/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react';
import useAppState from '../hooks/use-app-state';
import { storeGetAuth } from '../lib/config/store';
import { AppContextType } from '../lib/interfaces/common';
import { DecodedToken } from '../lib/interfaces/user';
import { getAccounts } from '../lib/services/account';
import { getExpenses } from '../lib/services/expense';
import { login, logout } from '../lib/services/helpers';

const initState: AppContextType = {
  auth: null,
  loading: false,
  error: null,
  modal: null,
  accounts: null,
  account: null,
  expenses: null,
  expense: null,
  categories: null,
  notifications: [],
  dispatch: () => {},
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const authData: DecodedToken | null = storeGetAuth();

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

  useEffect(() => {
    if (authData?.sub) {
      login(dispatch, authData);
    } else {
      logout(dispatch);
    }
  }, [authData?.sub, dispatch]);

  useEffect(() => {
    if (authData?.sub) {
      getAccounts(dispatch);

      if (router.query.account_id) {
        getExpenses(dispatch);
      }
    }
  }, [authData?.sub, dispatch, router.query.account_id]);

  const contextValues = {
    auth: user,
    loading,
    error,
    modal,
    accounts,
    account,
    expenses,
    expense,
    categories,
    notifications,
  };
  const contextFunctions = {
    dispatch,
  };

  return (
    <AppContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
