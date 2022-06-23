import store from 'store';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../interfaces/user';

const AUTH_KEY = 'access_token';

export const storeSetAccessToken = (token: string) => {
  store.set(AUTH_KEY, token);
};

export const storeClearAccessToken = () => {
  store.remove(AUTH_KEY);
};

export const storeGetAccessToken = (): string | null => {
  return store.get(AUTH_KEY, null);
};

export const storeGetDecodedToken = (): DecodedToken | null => {
  return store.get(AUTH_KEY, null) ? jwt_decode(store.get(AUTH_KEY, null)) : null;
};
