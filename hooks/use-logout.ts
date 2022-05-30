import useAppState from './use-app-state';
import useFetch from './use-fetch';

const useLogout = () => {
  const { setAuth } = useAppState();
  const [, fetchData] = useFetch('/login');

  const logout = () => {
    fetchData('POST', '/user/logout')
      .then(() => {
        store.remove('auth');
        setAuth(null);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return { logout };
};

export default useLogout;
