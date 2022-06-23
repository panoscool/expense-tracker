import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { UserUpdate } from '../interfaces/user';
import { enqueueNotification, setError, setLoading } from './helpers';

export const getUser = async (dispatch: React.Dispatch<any>) => {
  try {
    setError(dispatch, null);

    const response: any = await apiRequest('GET', '/user');

    const { _id, name, email } = response;
    dispatch({ type: Actions.SET_AUTH, payload: { user: { _id: _id, name, email } } });
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Something went wrong: ${error}`, 'error');
  }
};

export const updateUser = async (dispatch: React.Dispatch<any>, data: UserUpdate) => {
  try {
    setLoading(dispatch, 'update_user');
    setError(dispatch, null);

    await apiRequest('POST', '/user', data);

    await getUser(dispatch);
    enqueueNotification(dispatch, 'Profile updated', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Profile failed to update: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'update_user');
  }
};
