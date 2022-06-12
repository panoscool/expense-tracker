import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useAppContext from './use-app-context';

const useProtectedRoute = (reqAuth: boolean) => {
  const router = useRouter();
  const { auth, loading } = useAppContext();

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

  return { auth, checkAuthState };
};

export default useProtectedRoute;
