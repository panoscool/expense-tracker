import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { storeGetDecodedToken } from '../lib/config/store';
import { DecodedToken } from '../lib/interfaces/user';
import { useAppContext } from '../context/app-context';

// TODO: Move auth check into next middleware using cookies with iron-session
// https://www.npmjs.com/package/iron-session

const privateRoutes = ['/expenses', '/profile', '/settings', '/statistics'];
const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

function useAuth() {
  const router = useRouter();
  const { authenticated, setUser } = useAppContext();
  const authData: DecodedToken | null = useMemo(() => storeGetDecodedToken(), []);

  useEffect(() => {
    setUser(authData ? { ...authData, _id: authData.sub } : null);
  }, [authData, setUser]);

  const checkAuthStateAndRedirect = useCallback(() => {
    if (authData) {
      if (publicRoutes.includes(router.pathname)) {
        router.push('/expenses');
      }
    } else {
      if (privateRoutes.includes(router.pathname)) {
        router.push('/login');
      }
    }
  }, [authData, router]);

  return { authenticated, checkAuthStateAndRedirect };
}

export default useAuth;
