import { Actions } from '../../hooks/use-app-state';
import apiRequest from '../config/axios';
import { Account, AccountCreate } from '../interfaces/account';

interface AccountUpdate extends Partial<Account> {
  id: string;
  email: string;
}

export const getAccounts = async (dispatch: React.Dispatch<any>) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const data = await apiRequest('GET', '/account');
    dispatch({ type: Actions.SET_ACCOUNTS, payload: { accounts: data } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const getAccount = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const data = await apiRequest('GET', `/account/${id}`);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: data } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const createAccount = async (dispatch: React.Dispatch<any>, data: AccountCreate) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const response = await apiRequest('POST', '/account', data);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: response } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const updateAccount = async (dispatch: React.Dispatch<any>, data: AccountUpdate) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const response = await apiRequest('PUT', `/account/${data.id}`, data);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: response } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const deleteAccount = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    await apiRequest('DELETE', `/account/${id}`);
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  } finally {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: false } });
  }
};
