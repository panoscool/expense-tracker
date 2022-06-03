import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import store from 'store';
import useFetch from '../hooks/use-fetch';
import { Account } from '../lib/interfaces/account';
import { Category } from '../lib/interfaces/category';
import { Auth, DecodedToken } from '../lib/interfaces/user';

interface AppState {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  modal: string | null;
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
  accounts: Account[] | null;
  categories: Category | null;
  loading: boolean;
}

const initState: AppState = {
  auth: null,
  setAuth: () => {},
  modal: null,
  setModal: () => {},
  accounts: null,
  categories: null,
  loading: false,
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authToken: string = store.get('auth', null);
  const authData: DecodedToken | null = authToken ? jwt_decode(authToken) : null;

  const [auth, setAuth] = useState<Auth | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [accounts, fetchAccounts] = useFetch();
  const [categories, fetchCategories] = useFetch();

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
    if (auth?.id) {
      fetchAccounts('GET', '/account');
      fetchCategories('GET', '/category');
    }
  }, [auth?.id, fetchAccounts, fetchCategories, modal]);

  const contextValues = {
    auth,
    modal,
    loading,
    accounts,
    categories,
  };
  const contextFunctions = {
    setAuth,
    setModal,
  };

  return (
    <AppContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
