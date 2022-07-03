import { format } from 'date-fns';
import router from 'next/router';
import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { Expense, ExpenseCreate } from '../interfaces/expense';
import { buildParams } from '../utils/url-params';
import { enqueueNotification, setError, setLoading, setModal } from './helpers';

type ExpensesFilters = {
  date: string;
  user_id: string | null;
  category: string | null;
};

export const getExpenses = async (dispatch: React.Dispatch<any>, params?: ExpensesFilters) => {
  try {
    setLoading(dispatch, 'get_expenses');
    const formattedParams = params ? buildParams(params) : '';
    const defaultParams = `date=${format(new Date(), 'yyyy-MM-dd')}`;

    const response = await apiRequest(
      'GET',
      `/expense/?account_id=${router.query.account_id}&${formattedParams || defaultParams}`,
    );

    dispatch({ type: Actions.SET_EXPENSES, payload: { expenses: response.data } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'get_expenses');
  }
};

export const getExpense = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    setLoading(dispatch, 'get_expense');

    const response = await apiRequest('GET', `/expense/${id}`);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response.data } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'get_expense');
  }
};

export const createExpense = async (dispatch: React.Dispatch<any>, data: ExpenseCreate) => {
  try {
    setLoading(dispatch, 'create_expense');
    setError(dispatch, null);

    const response = await apiRequest('POST', '/expense', data);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response.data } });

    setModal(dispatch, null);
    enqueueNotification(dispatch, 'Expense created', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Expense failed to create: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'create_expense');
  }
};

export const updateExpense = async (dispatch: React.Dispatch<any>, data: Expense) => {
  try {
    setLoading(dispatch, 'update_expense');
    setError(dispatch, null);

    const response = await apiRequest('PUT', `/expense/${data._id}`, data);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response.data } });

    setModal(dispatch, null);
    enqueueNotification(dispatch, 'Expense updated', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Expense failed to update: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'update_expense');
  }
};

export const deleteExpense = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    setLoading(dispatch, 'delete_expense');
    setError(dispatch, null);

    await apiRequest('DELETE', `/expense/${id}`);

    setModal(dispatch, null);
    enqueueNotification(dispatch, 'Expense deleted', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Expense failed to delete: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'delete_expense');
  }
};
