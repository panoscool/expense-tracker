import { Actions } from '../../hooks/use-app-state';
import apiRequest from '../config/axios';

type Category = {
  id: string;
  label: string;
};

export const getCategories = async (dispatch: React.Dispatch<any>) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const data = await apiRequest('GET', '/category');
    dispatch({ type: Actions.SET_CATEGORIES, payload: { categories: data } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const createCategory = async (dispatch: React.Dispatch<any>, data: Category) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    await apiRequest('PUT', `/category/${data.id}`, { label: data.label });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  } finally {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: false } });
  }
};

export const deleteCategory = async (dispatch: React.Dispatch<any>, data: Category) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    await apiRequest('DELETE', `/category/${data.id}`, { label: data.label });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  } finally {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: false } });
  }
};
