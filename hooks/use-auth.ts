import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { storeGetDecodedToken } from '../lib/config/store';
import { DecodedToken } from '../lib/interfaces/user';
import useAppContext from './use-app-context';

// TODO: Move auth check into next middleware using cookies

function useAuth(reqAuth: boolean) {
  const router = useRouter();
  const { authenticated, setUser } = useAppContext();
  const authData: DecodedToken | null = useMemo(() => storeGetDecodedToken(), []);

  useEffect(() => {
    if (authData) {
      setUser({
        ...authData,
        _id: authData.sub,
      });
    } else {
      setUser(null);
    }
  }, [authData, setUser]);

  const checkAuthStateAndRedirect = useCallback(
    (redirectUrl: string) => {
      // if not authenticated redirect to login page
      if (reqAuth && (authData == undefined || authData == null)) {
        router.push(redirectUrl);
      }

      // if authenticated redirect to home page
      if (!reqAuth && authData) {
        router.push(redirectUrl);
      }
    },

    [authData, reqAuth, router],
  );

  return { authenticated, checkAuthStateAndRedirect };
}

export default useAuth;
