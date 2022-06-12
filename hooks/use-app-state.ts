import { Reducer, useReducer } from 'react';
import { storeClearAuth, storeSetAuth } from '../lib/config/store';
import { Account } from '../lib/interfaces/account';
import { Category } from '../lib/interfaces/category';
import { Expense } from '../lib/interfaces/expense';
import { Auth } from '../lib/interfaces/user';

export enum Actions {
  SET_AUTH = 'SET_AUTH',
  CLEAR_AUTH = 'CLEAR_AUTH',
  SET_ACCOUNTS = 'SET_ACCOUNTS',
  SET_ACCOUNT = 'SET_ACCOUNT',
  SET_EXPENSES = 'SET_EXPENSES',
  SET_EXPENSE = 'SET_EXPENSE',
  SET_CATEGORIES = 'SET_CATEGORIES',
  SET_MODAL = 'SET_MODAL',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

type State = {
  user: Auth | null;
  accounts: Account[] | null;
  account: Account | null;
  expenses: Expense[] | null;
  expense: Expense | null;
  categories: Category | null;
  modal: { open: string; params: any | null } | null;
  loading: boolean;
  error: string | null;
};

const initState: State = {
  user: null,
  accounts: null,
  account: null,
  expenses: null,
  expense: null,
  categories: null,
  modal: null,
  loading: false,
  error: null,
};

const reducer: Reducer<State, { type: Actions; payload?: any }> = (state, { type, payload }) => {
  switch (type) {
    case Actions.SET_AUTH:
      return {
        ...state,
        loading: false,
        error: null,
        user: payload.user,
      };

    case Actions.CLEAR_AUTH:
      storeClearAuth();

      return {
        ...state,
        loading: false,
        user: null,
      };

    case Actions.SET_ACCOUNTS:
      return {
        ...state,
        loading: false,
        error: null,
        accounts: payload.accounts,
      };

    case Actions.SET_ACCOUNT:
      return {
        ...state,
        loading: false,
        error: null,
        account: payload.account,
      };

    case Actions.SET_EXPENSES:
      return {
        ...state,
        loading: false,
        error: null,
        expenses: payload.expenses,
      };

    case Actions.SET_EXPENSE:
      return {
        ...state,
        loading: false,
        error: null,
        expense: payload.expense,
      };

    case Actions.SET_CATEGORIES:
      return {
        ...state,
        loading: false,
        error: null,
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
        loading: false,
        error: payload.error,
      };
  }
};

const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { user, accounts, account, expenses, expense, categories, modal, loading, error } = state;

  return {
    user,
    accounts,
    account,
    expenses,
    expense,
    categories,
    modal,
    loading,
    error,
    dispatch,
  };
};

export default useAppState;
