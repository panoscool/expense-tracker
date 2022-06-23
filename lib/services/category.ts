import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { enqueueNotification, setError, setLoading } from './helpers';

type Category = {
  id: string;
  label: string;
};

export const getCategories = async (dispatch: React.Dispatch<any>) => {
  try {
    setLoading(dispatch, 'get_categories');

    const data = await apiRequest('GET', '/category');
    dispatch({ type: Actions.SET_CATEGORIES, payload: { categories: data } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'get_categories');
  }
};

export const createCategory = async (dispatch: React.Dispatch<any>, data: Category) => {
  try {
    setLoading(dispatch, 'create_category');
    setError(dispatch, null);

    await apiRequest('PUT', `/category/${data.id}`, { label: data.label });

    await getCategories(dispatch);
    enqueueNotification(dispatch, 'Category created', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Category failed to create: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'create_category');
  }
};

export const deleteCategory = async (dispatch: React.Dispatch<any>, data: Category) => {
  try {
    setLoading(dispatch, 'delete_category');
    setError(dispatch, null);

    await apiRequest('DELETE', `/category/${data.id}`, { label: data.label });

    await getCategories(dispatch);
    enqueueNotification(dispatch, 'Category deleted', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Category failed to delete: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'delete_category');
  }
};
