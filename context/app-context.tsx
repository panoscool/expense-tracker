import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import store from 'store';
import useFetch from '../hooks/use-fetch';
import { IAccount } from '../lib/models/account';
import { ICategory } from '../lib/models/category';

type Auth = {
  id: string;
  name: string;
  email: string;
};

interface AppState {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  modal: string | null;
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
  accounts: IAccount[] | null;
  categories: ICategory | null;
}

const initState: AppState = {
  auth: null,
  setAuth: () => {},
  modal: null,
  setModal: () => {},
  accounts: null,
  categories: null,
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authData: Auth = store.get('auth', null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [modal, setModal] = useState<string | null>(null);

  const [accounts, fetchAccounts] = useFetch();
  const [categories, fetchCategories] = useFetch();

  useEffect(() => {
    if (authData?.id) {
      setAuth({
        id: authData?.id,
        name: authData?.name,
        email: authData?.email,
      });
    } else {
      setAuth(null);
    }
  }, [authData?.email, authData?.name, authData?.id]);

  useEffect(() => {
    if (auth) {
      fetchAccounts('GET', '/account');
      fetchCategories('GET', '/category');
    }
  }, [auth, fetchAccounts, fetchCategories]);

  const contextValues = {
    auth,
    modal,
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
