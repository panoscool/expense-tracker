import store from 'store';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../interfaces/user';

const AUTH_KEY = 'auth';

export const storeSetAuth = (token: string) => {
  store.set(AUTH_KEY, token);
};

export const storeClearAuth = () => {
  store.remove(AUTH_KEY);
};

export const storeGetAuth = (): DecodedToken | null => {
  return store.get(AUTH_KEY, null) ? jwt_decode(store.get(AUTH_KEY, null)) : null;
};
