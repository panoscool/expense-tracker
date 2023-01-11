import { format } from 'date-fns';
import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { Expense, ExpenseCreate } from '../interfaces/expense';
import { buildParams, getParams } from '../utils/url-params';
import { enqueueNotification, setError, setLoading } from './helpers';

export const getExpenses = async (dispatch: React.Dispatch<any>) => {
  try {
    setLoading(dispatch, 'get_expenses');

    const params = getParams();

    const filteredParams = Object.keys(params).reduce((acc: any, key) => {
      if (params[key] !== 'all') {
        acc[key] = params[key];
      }
      // if there is no date, set it to today
      if (!acc.date) {
        acc.date = format(new Date(), 'yyyy-MM-dd');
      }
      return acc;
    }, {});

    const formattedParams = filteredParams ? buildParams(filteredParams) : '';

    const response = await apiRequest('GET', `/expense/?${formattedParams}`);

    dispatch({ type: Actions.SET_EXPENSES, payload: { expenses: response.data } });

    return response;
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

    return response;
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

    enqueueNotification(dispatch, 'Expense created', 'success');

    return response;
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

    enqueueNotification(dispatch, 'Expense updated', 'success');

    return response;
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

    enqueueNotification(dispatch, 'Expense deleted', 'success');
  } catch (error) {
    setError(dispatch, error as string);
    enqueueNotification(dispatch, `Expense failed to delete: ${error}`, 'error');
  } finally {
    setLoading(dispatch, 'delete_expense');
  }
};
