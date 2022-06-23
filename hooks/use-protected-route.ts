import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { storeGetDecodedToken } from '../lib/config/store';
import { DecodedToken } from '../lib/interfaces/user';

const useProtectedRoute = (reqAuth: boolean) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const authData: DecodedToken | null = storeGetDecodedToken();

  useEffect(() => {
    if (authData) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [authData]);

  const checkAuthState = useCallback(
    (redirectUrl: string) => {
      if (reqAuth && (authData == undefined || authData == null)) {
        router.push(redirectUrl);
      }
      if (!reqAuth && authData) {
        router.push(redirectUrl);
      }
    },

    [authData, reqAuth, router],
  );

  return { authenticated, checkAuthState };
};

export default useProtectedRoute;
