import { Reducer, useReducer } from 'react';
import { storeClearAuth } from '../lib/config/store';
import { Actions, AppState } from '../lib/interfaces/common';

const initState: AppState = {
  user: null,
  accounts: null,
  account: null,
  expenses: null,
  expense: null,
  categories: null,
  modal: null,
  loading: false,
  error: null,
  notifications: [],
};

const reducer: Reducer<AppState, { type: Actions; payload?: any }> = (state, { type, payload }) => {
  switch (type) {
    case Actions.SET_ACCOUNTS:
      return {
        ...state,
        accounts: payload.accounts,
      };

    case Actions.SET_ACCOUNT:
      return {
        ...state,
        account: payload.account,
      };

    case Actions.SET_EXPENSES:
      return {
        ...state,
        expenses: payload.expenses,
      };

    case Actions.SET_EXPENSE:
      return {
        ...state,
        expense: payload.expense,
      };

    case Actions.SET_CATEGORIES:
      return {
        ...state,
        categories: payload.categories,
      };

    case Actions.SET_MODAL:
      return {
        ...state,
        modal: payload,
      };

    case Actions.SET_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };

    case Actions.SET_ERROR:
      return {
        ...state,
        error: payload.error,
      };

    case Actions.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [...state.notifications, { ...payload }],
      };

    case Actions.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.options.key !== payload.key,
        ),
      };

    case Actions.SET_AUTH:
      return {
        ...state,
        user: payload.user,
        loading: false,
        error: null,
      };

    case Actions.CLEAR_AUTH:
      storeClearAuth();

      return initState;

    default:
      return state;
  }
};

const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return { state, dispatch };
};

export default useAppState;
