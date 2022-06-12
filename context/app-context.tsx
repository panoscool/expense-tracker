import { useRouter } from 'next/router';
import { createContext, useEffect } from 'react';
import useAppState, { Actions } from '../hooks/use-app-state';
import { storeGetAuth } from '../lib/config/store';
import { Account } from '../lib/interfaces/account';
import { Expense } from '../lib/interfaces/expense';
import { Auth, DecodedToken } from '../lib/interfaces/user';
import { getAccounts } from '../lib/services/account';
import { getExpenses } from '../lib/services/expense';

interface AppState {
  auth: Auth | null;
  loading: boolean;
  modal: { open: string; params?: string } | null;
  accounts: Account[] | null;
  expenses: Expense[] | null;
  appDispatch: React.Dispatch<any>;
}

const initState: AppState = {
  auth: null,
  loading: false,
  modal: null,
  accounts: null,
  expenses: null,
  appDispatch: () => {},
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { user, accounts, expenses, modal, loading, dispatch } = useAppState();

  const authData: DecodedToken | null = storeGetAuth();

  useEffect(() => {
    if (authData?.sub) {
      dispatch({
        type: Actions.SET_AUTH,
        payload: { user: { id: authData?.sub, name: authData?.name, email: authData?.email } },
      });
    } else {
      dispatch({ type: Actions.CLEAR_AUTH });
    }
  }, [authData?.email, authData?.name, authData?.sub, dispatch]);

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
    modal,
    accounts,
    expenses,
  };
  const contextFunctions = {
    appDispatch: dispatch,
  };

  return (
    <AppContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
