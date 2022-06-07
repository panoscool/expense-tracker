import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useAppState from './use-app-state';

const useProtectedRoute = (reqAuth: boolean) => {
  const router = useRouter();
  const { auth, loading } = useAppState();

  const checkAuthState = useCallback(
    (redirectUrl: string) => {
      if (!loading && reqAuth && (auth == undefined || auth == null)) {
        router.push(redirectUrl);
      }
      if (!loading && !reqAuth && auth) {
        router.push(redirectUrl);
      }
    },

    [auth, loading, reqAuth, router],
  );

  return { auth, loading, checkAuthState };
};

export default useProtectedRoute;
