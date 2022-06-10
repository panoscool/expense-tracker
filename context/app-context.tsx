import { format } from 'date-fns';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useState } from 'react';
import store from 'store';
import useFetch from '../hooks/use-fetch';
import { Account } from '../lib/interfaces/account';
import { Expense } from '../lib/interfaces/expense';
import { Auth, DecodedToken } from '../lib/interfaces/user';

interface AppState {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modal: { open: string; params?: string } | null;
  setModal: React.Dispatch<React.SetStateAction<{ open: string; params?: string } | null>>;
  accounts: Account[] | null;
  getAccounts: () => Promise<void>;
  expenses: Expense[] | null;
  getExpenses: (params?: string) => Promise<void>;
}

const initState: AppState = {
  auth: null,
  setAuth: () => {},
  loading: false,
  setLoading: () => {},
  modal: null,
  setModal: () => {},
  accounts: null,
  getAccounts: () => Promise.resolve(),
  expenses: null,
  getExpenses: () => Promise.resolve(),
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authToken: string = store.get('auth', null);
  const authData: DecodedToken | null = authToken ? jwt_decode(authToken) : null;

  const router = useRouter();
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<{ open: string; params?: string } | null>(null);

  const [accounts, fetchAccounts] = useFetch();
  const [expenses, fetchExpenses] = useFetch();

  const getAccounts = useCallback(async () => {
    if (authData?.sub) {
      await fetchAccounts('GET', '/account');
    }
  }, [authData?.sub, fetchAccounts]);

  const getExpenses = useCallback(
    async (params?: string) => {
      if (router.query.account_id) {
        const defaultParams = `date=${format(new Date(), 'yyyy-MM-dd')}`;

        await fetchExpenses(
          'GET',
          `/expense/?id=${router.query.account_id}&${params || defaultParams}`,
        );
      }
    },
    [fetchExpenses, router.query.account_id],
  );

  useEffect(() => {
    if (authData?.sub) {
      setAuth({
        id: authData?.sub,
        name: authData?.name,
        email: authData?.email,
      });
      setLoading(false);
    } else {
      setAuth(null);
      setLoading(false);
    }
  }, [authData?.email, authData?.name, authData?.sub]);

  useEffect(() => {
    getAccounts();
    getExpenses();
  }, [getAccounts, getExpenses]);

  const contextValues = {
    auth,
    loading,
    modal,
    accounts,
    expenses,
  };
  const contextFunctions = {
    setAuth,
    setLoading,
    setModal,
    getAccounts,
    getExpenses,
  };

  return (
    <AppContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
