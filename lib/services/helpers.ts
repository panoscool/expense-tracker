import Router from 'next/router';
import { Actions, ModalType } from '../interfaces/common';

export const enqueueNotification = (
  dispatch: React.Dispatch<any>,
  message: string,
  variant: string,
) => {
  dispatch({
    type: Actions.ENQUEUE_SNACKBAR,
    payload: {
      message: message,
      options: {
        variant: variant,
        key: new Date().getTime() + Math.random(),
      },
    },
  });
};

export const removeNotification = (dispatch: React.Dispatch<any>, key: number) => {
  dispatch({ type: Actions.REMOVE_SNACKBAR, payload: key });
};

export const setModal = (dispatch: React.Dispatch<any>, payload: ModalType | null) => {
  dispatch({ type: Actions.SET_MODAL, payload });
};

export const setLoading = (dispatch: React.Dispatch<any>, loading: string) => {
  dispatch({ type: Actions.SET_LOADING, payload: { loading } });
};

export const setError = (dispatch: React.Dispatch<any>, error: string | null) => {
  dispatch({ type: Actions.SET_ERROR, payload: { error } });
};

export const logout = (dispatch: React.Dispatch<any>) => {
  dispatch({ type: Actions.CLEAR_AUTH });
  Router.push('/login');
};
