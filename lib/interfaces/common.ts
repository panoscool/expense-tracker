import { Account } from './account';
import { Category } from './category';
import { Expense } from './expense';
import { Auth } from './user';

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
  ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR',
  REMOVE_SNACKBAR = 'REMOVE_SNACKBAR',
}

export interface ModalType {
  open: string;
  params?: string;
}

export interface NotificationsType {
  message: string;
  options: {
    key: number;
    variant: 'success' | 'error' | 'info' | 'warning' | 'default';
    autoHideDuration?: number;
  };
}

export interface AppState {
  user: Auth | null;
  accounts: Account[] | null;
  account: Account | null;
  expenses: Expense[] | null;
  expense: Expense | null;
  categories: Category | null;
  modal: ModalType | null;
  loading: string[];
  error: string | null;
  notifications: NotificationsType[];
}

export interface AppContextType extends Omit<AppState, 'user'> {
  auth: Auth | null;
  dispatch: React.Dispatch<any>;
}
