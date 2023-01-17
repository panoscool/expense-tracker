import apiRequest from '../config/axios';
import { UserUpdate } from '../interfaces/user';
import { enqueueNotification, setError, setLoading } from './helpers';

export const getUser = async (dispatch: React.Dispatch<any>) => {
  try {
    setError(dispatch, null);

    const response = await apiRequest('GET', '/user');

    return response.data;
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

    enqueueNotification(dispatch, 'Profile updated', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Profile failed to update: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'update_user');
  }
};

export const uploadUserImage = async (dispatch: React.Dispatch<any>, fileString: string) => {
  try {
    setLoading(dispatch, 'upload_user_image');
    setError(dispatch, null);

    await apiRequest('POST', '/user/media', { file_string: fileString });
    enqueueNotification(dispatch, 'Profile image updated', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Profile image failed to update: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'upload_user_image');
  }
};

export const deleteUserImage = async (dispatch: React.Dispatch<any>) => {
  try {
    setLoading(dispatch, 'delete_user_image');
    setError(dispatch, null);

    await apiRequest('DELETE', '/user/media');

    enqueueNotification(dispatch, 'Profile image deleted', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Profile image failed to delete: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'delete_user_image');
  }
};
