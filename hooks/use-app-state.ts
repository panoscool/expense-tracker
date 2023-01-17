import { Reducer, useReducer } from 'react';
import { Actions, AppState } from '../lib/interfaces/common';

const initState: AppState = {
  accounts: null,
  account: null,
  expenses: null,
  expense: null,
  categories: null,
  payments: null,
  loading: [],
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

    case Actions.SET_PAYMENTS:
      return {
        ...state,
        payments: payload.payments,
      };

    case Actions.SET_LOADING:
      if (state.loading.includes(payload.loading)) {
        return { ...state, loading: state.loading.filter((act) => act !== payload.loading) };
      }
      return {
        ...state,
        loading: [...state.loading, payload.loading],
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
        notifications: state.notifications.filter((notification) => notification.options.key === payload.key),
      };

    default:
      return state;
  }
};

const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return { state, dispatch };
};

export default useAppState;
