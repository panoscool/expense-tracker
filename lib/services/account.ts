import apiRequest from '../config/axios';
import { Account, AccountCreate } from '../interfaces/account';
import { Actions } from '../interfaces/common';
import { enqueueNotification, setError, setLoading } from './helpers';

interface AccountUpdate extends Partial<Account> {
  email: string;
}

export const getAccounts = async (dispatch: React.Dispatch<any>) => {
  try {
    setLoading(dispatch, true);
    setError(dispatch, null);

    const data = await apiRequest('GET', '/account');
    dispatch({ type: Actions.SET_ACCOUNTS, payload: { accounts: data } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, false);
  }
};

export const getAccount = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    setLoading(dispatch, true);
    setError(dispatch, null);

    const data = await apiRequest('GET', `/account/${id}`);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: data } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, false);
  }
};

export const createAccount = async (dispatch: React.Dispatch<any>, data: AccountCreate) => {
  try {
    setLoading(dispatch, true);
    setError(dispatch, null);

    const response = await apiRequest('POST', '/account', data);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: response } });

    enqueueNotification(dispatch, 'Account created', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Account failed to create: ${error}`, 'error');
  } finally {
    setLoading(dispatch, false);
  }
};

export const updateAccount = async (dispatch: React.Dispatch<any>, data: AccountUpdate) => {
  try {
    setLoading(dispatch, true);
    setError(dispatch, null);

    const response = await apiRequest('PUT', `/account/${data._id}`, data);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: response } });

    enqueueNotification(dispatch, 'Account updated', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Account failed to update: ${error}`, 'error');
  } finally {
    setLoading(dispatch, false);
  }
};

export const deleteAccount = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    setLoading(dispatch, true);
    setError(dispatch, null);

    await apiRequest('DELETE', `/account/${id}`);

    enqueueNotification(dispatch, 'Account deleted', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Account failed to delete: ${error}`, 'error');
  } finally {
    setLoading(dispatch, false);
  }
};
