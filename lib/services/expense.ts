import { format } from 'date-fns';
import router from 'next/router';
import { Actions } from '../../hooks/use-app-state';
import apiRequest from '../config/axios';
import { Expense, ExpenseCreate } from '../interfaces/expense';

export const getExpenses = async (dispatch: React.Dispatch<any>, params?: string) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const defaultParams = `date=${format(new Date(), 'yyyy-MM-dd')}`;

    const response = await apiRequest(
      'GET',
      `/expense/?id=${router.query.account_id}&${params || defaultParams}`,
    );

    dispatch({ type: Actions.SET_EXPENSES, payload: { expenses: response } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const getExpense = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const response = await apiRequest('GET', `/expense/${id}`);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const createExpense = async (dispatch: React.Dispatch<any>, data: ExpenseCreate) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const response = await apiRequest('POST', '/expense', data);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const updateExpense = async (dispatch: React.Dispatch<any>, data: Expense) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    const response = await apiRequest('PUT', `/expense/${data._id}`, data);
    dispatch({ type: Actions.SET_EXPENSE, payload: { expense: response } });
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  }
};

export const deleteExpense = async (dispatch: React.Dispatch<any>, id: string) => {
  try {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: true } });
    await apiRequest('DELETE', `/expense/${id}`);
  } catch (error) {
    dispatch({ type: Actions.SET_ERROR, payload: { error } });
  } finally {
    dispatch({ type: Actions.SET_LOADING, payload: { loading: false } });
  }
};
