import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { storeGetDecodedToken } from '../lib/config/store';
import { DecodedToken } from '../lib/interfaces/user';
import { logout } from '../lib/services/helpers';
import { getUser } from '../lib/services/user';
import useAppContext from './use-app-context';

const useAuth = (reqAuth: boolean) => {
  const router = useRouter();
  const { authenticated, setAuthenticated, dispatch } = useAppContext();
  const authData: DecodedToken | null = storeGetDecodedToken();

  const userId = useMemo(() => authData?.sub, [authData]);

  useEffect(() => {
    if (userId) {
      setAuthenticated(true);
      getUser(dispatch);
    } else {
      setAuthenticated(false);
      logout(dispatch);
    }
  }, [userId, dispatch, setAuthenticated]);

  const checkAuthStateAndRedirect = useCallback(
    (redirectUrl: string) => {
      if (reqAuth && (userId == undefined || userId == null)) {
        router.push(redirectUrl);
      }
      if (!reqAuth && userId) {
        router.push(redirectUrl);
      }
    },

    [userId, reqAuth, router],
  );

  return { authenticated, checkAuthStateAndRedirect };
};

export default useAuth;
