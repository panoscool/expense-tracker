import { format } from 'date-fns';
import router from 'next/router';
import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { Expense, ExpenseCreate } from '../interfaces/expense';
import { enqueueNotification, setError, setLoading } from './helpers';

export const getExpenses = async (dispatch: React.Dispatch<any>, params?: string) => {
  try {
    setLoading(dispatch, false);

    const defaultParams = `date=${format(new Date(), 'yyyy-MM-dd')}`;

    const response = await apiRequest(
      'GET',
      `/expense/?id=${router.query.account_id}&${params || defaultParams}`,
    );

    dispatch({ type: Actions.SET_EXPENSES, payload: { expenses: response } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, false);
  }
};

export const getExpense = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    setLoading(dispatch, false);

    const response = await apiRequest('GET', `/expense/${id}`);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, false);
  }
};

export const createExpense = async (dispatch: React.Dispatch<any>, data: ExpenseCreate) => {
  try {
    setLoading(dispatch, false);
    setError(dispatch, null);

    const response = await apiRequest('POST', '/expense', data);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response } });

    getExpenses(dispatch);
    enqueueNotification(dispatch, 'Expense created', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Expense failed to create: ${error}`, 'error');
  } finally {
    setLoading(dispatch, false);
  }
};

export const updateExpense = async (dispatch: React.Dispatch<any>, data: Expense) => {
  try {
    setLoading(dispatch, false);
    setError(dispatch, null);

    const response = await apiRequest('PUT', `/expense/${data._id}`, data);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response } });

    getExpenses(dispatch);
    enqueueNotification(dispatch, 'Expense updated', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Expense failed to update: ${error}`, 'error');
  } finally {
    setLoading(dispatch, false);
  }
};

export const deleteExpense = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    setLoading(dispatch, false);
    setError(dispatch, null);

    await apiRequest('DELETE', `/expense/${id}`);

    getExpenses(dispatch);
    enqueueNotification(dispatch, 'Expense deleted', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Expense failed to delete: ${error}`, 'error');
  } finally {
    setLoading(dispatch, false);
  }
};
