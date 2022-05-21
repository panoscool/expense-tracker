import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .max(24, 'Password should not exceed 24 characters')
    .required('Password is required'),
});

export const expenseSchema = yup.object({
  date: yup.date().typeError('Value should be a date').required('Date is required'),
  account: yup.string().required('Account is required'),
  category: yup.string().required('Category is required'),
  amount: yup.number().typeError('Value is not a number').required('Amount is required'),
  note: yup.string().nullable(),
  description: yup.string().nullable(),
});
