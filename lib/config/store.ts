import store from 'store';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../interfaces/user';
import { ThemeMode } from '../interfaces/common';

const AUTH_KEY = 'access_token';
const DRAWER_STATE = 'drawer_state';
const THEME_MODE = 'theme_mode';

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
  return store.get(AUTH_KEY, null) ? jwtDecode(store.get(AUTH_KEY, null)) : null;
};

export const storeSetDrawerState = (state: boolean) => store.set(DRAWER_STATE, state);
export const storeGetDrawerState = () => store.get(DRAWER_STATE, false);

export const storeSetThemeMode = (mode: ThemeMode) => store.set(THEME_MODE, mode);
export const storeGetThemeMode = (mode: ThemeMode) => store.get(THEME_MODE, mode);
