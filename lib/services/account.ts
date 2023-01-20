import apiRequest from '../config/axios';
import { Account, AccountCreate } from '../interfaces/account';
import { Actions } from '../interfaces/common';
import { enqueueNotification, setError, setLoading } from './helpers';
import Router from 'next/router';

interface AccountUpdate extends Partial<Account> {
  email: string;
}

const shouldForwardID = (res: any) => {
  const { pathname, query } = Router;

  return res.data.length > 0 && pathname === '/' && !query?.account_id;
};

export const getAccounts = async (dispatch: React.Dispatch<any>) => {
  try {
    setLoading(dispatch, 'get_accounts');

    const response = await apiRequest('GET', '/account');
    dispatch({ type: Actions.SET_ACCOUNTS, payload: { accounts: response.data } });

    if (shouldForwardID(response)) {
      Router.push({ pathname: Router.pathname, query: { account_id: response.data[0]._id } });
    }
    return response;
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'get_accounts');
  }
};

export const getAccount = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    setLoading(dispatch, 'get_account');

    const response = await apiRequest('GET', `/account/${id}`);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: response.data } });

    return response;
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'get_account');
  }
};

export const createAccount = async (dispatch: React.Dispatch<any>, data: AccountCreate) => {
  try {
    setLoading(dispatch, 'create_account');
    setError(dispatch, null);

    const response = await apiRequest('POST', '/account', data);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: response.data } });

    enqueueNotification(dispatch, 'Account created', 'success');

    return response;
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Account failed to create: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'create_account');
  }
};

export const updateAccount = async (dispatch: React.Dispatch<any>, data: AccountUpdate) => {
  try {
    setLoading(dispatch, 'update_account');
    setError(dispatch, null);

    const response = await apiRequest('PUT', `/account/${data._id}`, data);
    dispatch({ type: Actions.SET_ACCOUNT, payload: { account: response.data } });

    enqueueNotification(dispatch, 'Account updated', 'success');

    return response;
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Account failed to update: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'update_account');
  }
};

export const deleteAccount = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    setLoading(dispatch, 'delete_account');
    setError(dispatch, null);

    await apiRequest('DELETE', `/account/${id}`);

    enqueueNotification(dispatch, 'Account deleted', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Account failed to delete: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'delete_account');
  }
};
