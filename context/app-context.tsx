import { createContext, useEffect, useState } from 'react';
import store from 'store';
import useFetch from '../hooks/use-fetch';

type Auth = {
  id: string;
  name: string;
  email: string;
};

interface AppState {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  logout: () => void;
}

const initState: AppState = {
  auth: null,
  setAuth: () => {},
  logout: () => {},
};

export const AppContext = createContext(initState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authData: Auth = store.get('auth', null);

  const { fetchData } = useFetch('/login');
  const [auth, setAuth] = useState<Auth | null>(null);

  const logout = () => {
    fetchData('POST', '/auth/logout')
      .then(() => {
        store.remove('auth');
        setAuth(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setAuth({
      id: authData?.id,
      name: authData?.name,
      email: authData?.email,
    });
  }, [authData?.email, authData?.name, authData?.id]);

  const contextValues = {
    auth,
  };
  const contextFunctions = {
    setAuth,
    logout,
  };

  return (
    <AppContext.Provider value={{ ...contextValues, ...contextFunctions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
