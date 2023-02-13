import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { storeGetDecodedToken } from '../lib/config/store';
import { DecodedToken } from '../lib/interfaces/user';
import useAppContext from './use-app-context';

// TODO: Move auth check into next middleware using cookies with iron-session
// https://www.npmjs.com/package/iron-session

const privateRoutes = ['/', '/profile', '/settings', '/statistics'];
const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

function useAuth() {
  const router = useRouter();
  const { authenticated, setUser } = useAppContext();
  const authData: DecodedToken | null = useMemo(() => storeGetDecodedToken(), []);

  useEffect(() => {
    if (authData) {
      setUser({ ...authData, _id: authData.sub });
    } else {
      setUser(null);
    }
  }, [authData, setUser]);

  const checkAuthStateAndRedirect = useCallback(() => {
    // redirect for public pages
    if (publicRoutes.includes(router.pathname) && authData) {
      router.push('/');
    }

    // redirect for private pages
    if (privateRoutes.includes(router.pathname) && (authData == undefined || authData == null)) {
      router.push('/login');
    }
  }, [authData, router]);

  return { authenticated, checkAuthStateAndRedirect };
}

export default useAuth;
