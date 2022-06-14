import router from 'next/router';
import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { Expense, ExpenseCreate } from '../interfaces/expense';
import { buildParams } from '../utils/url-params';
import { enqueueNotification, setError, setLoading } from './helpers';

type ExpensesFilters = {
  date: string;
  user_id: string | null;
  category: string | null;
};

export const getExpenses = async (dispatch: React.Dispatch<any>, params?: ExpensesFilters) => {
  try {
    setLoading(dispatch, true);
    const formattedParams = params ? buildParams(params) : '';

    const response = await apiRequest(
      'GET',
      `/expense/?account_id=${router.query.account_id}&${formattedParams}`,
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
    setLoading(dispatch, true);

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
    setLoading(dispatch, true);
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
    setLoading(dispatch, true);
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
    setLoading(dispatch, true);
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
