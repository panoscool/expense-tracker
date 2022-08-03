import { format } from 'date-fns';
import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { Payment } from '../interfaces/payment';
import { getParams } from '../utils/url-params';
import { setError, setLoading } from './helpers';

export const getPayments = async (dispatch: React.Dispatch<any>) => {
  try {
    setLoading(dispatch, 'get_payments');

    const { account_id, date } = getParams();

    const response = await apiRequest(
      'GET',
      `/payment/${account_id}?period=${date || format(new Date(), 'yyyy-MM-dd')}`,
    );
    dispatch({ type: Actions.SET_PAYMENTS, payload: { payments: response.data } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'get_payments');
  }
};

export const updatePayment = async (dispatch: React.Dispatch<any>, data: Payment) => {
  try {
    setLoading(dispatch, 'update_payment');

    const response = await apiRequest('PATCH', `/payment/${data._id}`, { settled: data.settled });
    dispatch({ type: Actions.SET_PAYMENTS, payload: { payments: response.data } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'update_payment');
  }
};
