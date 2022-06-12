import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { enqueueNotification, setError, setLoading } from './helpers';

type Category = {
  id: string;
  label: string;
};

export const getCategories = async (dispatch: React.Dispatch<any>) => {
  try {
    setLoading(dispatch, true);
    setError(dispatch, null);

    const data = await apiRequest('GET', '/category');
    dispatch({ type: Actions.SET_CATEGORIES, payload: { categories: data } });
  } catch (error) {
    setError(dispatch, error as string);
  }
};

export const createCategory = async (dispatch: React.Dispatch<any>, data: Category) => {
  try {
    setLoading(dispatch, true);
    setError(dispatch, null);

    await apiRequest('PUT', `/category/${data.id}`, { label: data.label });

    enqueueNotification(dispatch, 'Category created', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, 'Category failed to create', 'error');
  } finally {
    setLoading(dispatch, false);
  }
};

export const deleteCategory = async (dispatch: React.Dispatch<any>, data: Category) => {
  try {
    setLoading(dispatch, true);
    setError(dispatch, null);

    dispatch({ type: Actions.SET_ERROR, payload: { error: null } });

    await apiRequest('DELETE', `/category/${data.id}`, { label: data.label });

    enqueueNotification(dispatch, 'Category deleted', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, 'Category failed to delete', 'error');
  } finally {
    setLoading(dispatch, false);
  }
};
