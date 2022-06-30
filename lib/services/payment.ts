import { format } from 'date-fns';
import apiRequest from '../config/axios';
import { Actions } from '../interfaces/common';
import { Payment } from '../interfaces/payment';
import { setError, setLoading } from './helpers';

type GetPayments = {
  account_id: string;
  period?: Date;
};

export const getPayments = async (dispatch: React.Dispatch<any>, data: GetPayments) => {
  try {
    setLoading(dispatch, 'get_payments');

    const params =
      (data?.period && format(data.period, 'yyyy-MM-dd')) || format(new Date(), 'yyyy-MM-dd');

    const response = await apiRequest('GET', `/payment/${data.account_id}?period=${params}`);
    dispatch({ type: Actions.SET_PAYMENTS, payload: { payments: response } });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'get_payments');
  }
};

export const updatePayment = async (dispatch: React.Dispatch<any>, data: Payment) => {
  try {
    setLoading(dispatch, 'update_payment');

    await apiRequest('PATCH', `/payment/${data._id}`, { settled: data.settled });
    await getPayments(dispatch, { account_id: data.account });
  } catch (error) {
    setError(dispatch, error as string);
  } finally {
    setLoading(dispatch, 'update_payment');
  }
};
