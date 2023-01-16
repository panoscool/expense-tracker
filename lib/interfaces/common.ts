import { Account } from './account';
import { Category } from './category';
import { Expense } from './expense';
import { Payment } from './payment';
import { User } from './user';

export enum Actions {
  LOGOUT = 'LOGOUT',
  SET_USER = 'SET_USER',
  SET_ACCOUNTS = 'SET_ACCOUNTS',
  SET_ACCOUNT = 'SET_ACCOUNT',
  SET_EXPENSES = 'SET_EXPENSES',
  SET_EXPENSE = 'SET_EXPENSE',
  SET_CATEGORIES = 'SET_CATEGORIES',
  SET_PAYMENTS = 'SET_PAYMENTS',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR',
  REMOVE_SNACKBAR = 'REMOVE_SNACKBAR',
}

export interface NotificationType {
  message: string;
  options: {
    key: number;
    variant: 'success' | 'error' | 'info' | 'warning' | 'default';
    autoHideDuration?: number;
  };
}

export interface AppState {
  user: User | null;
  accounts: Account[] | null;
  account: Account | null;
  expenses: Expense[] | null;
  expense: Expense | null;
  categories: Category | null;
  payments: Payment | null;
  loading: string[];
  error: string | null;
  notifications: NotificationType[];
}

export interface AppContextType extends AppState {
  themeMode: 'light' | 'dark';
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<any>;
  setThemeMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export interface QueryParams {
  account_id?: string;
  user_id?: string;
  category?: string;
  date?: string;
}

export enum UseCaseType {
  account_create = 'account_create',
  account_edit = 'account_edit',
  account_view = 'account_view',
  category_create = 'category_create',
}
