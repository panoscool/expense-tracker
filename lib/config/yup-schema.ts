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
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email('Email is not valid').required('Email is required'),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .max(24, 'Password should not exceed 24 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const userUpdateSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  password: yup
    .string()
    .trim()
    .nullable()
    .test('password', 'Password must be between 6 and 24 characters', (value) => {
      if (!value) return true;

      const trimmedValue = value.trim();
      return trimmedValue.length >= 6 && trimmedValue.length <= 24;
    }),
  newPassword: yup
    .string()
    .trim()
    .min(6, 'New password must be at least 6 characters')
    .max(24, 'New password should not exceed 24 characters')
    .when('password', {
      is: (password: string | null) => !!password,
      then: (schema) => schema.required('New password is required'),
      otherwise: (schema) => schema.nullable(),
    }),
  confirmPassword: yup.string().when('newPassword', {
    is: (newPassword: string | null) => !!newPassword,
    then: (schema) =>
      schema
        .required('Confirm password is required')
        .oneOf([yup.ref('newPassword')], 'New and confirm password must match'),
    otherwise: (schema) => schema.nullable(),
  }),
});

export const accountSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  currency: yup.string().trim().required('Currency is required'),
  description: yup.string().trim().nullable(),
  email: yup.string().trim().nullable(),
});

export const categorySchema = yup.object({
  label: yup.string().trim().required('Label is required'),
});

export const expenseSchema = yup.object({
  date: yup.date().typeError('Value should be a date').required('Date is required'),
  account_id: yup.string().required('Account is required'),
  category: yup.string().required('Category is required'),
  amount: yup
    .number()
    .typeError('Value is not a number')
    .min(0.1, 'Minimum amount is 0.1')
    .required('Amount is required'),
  user_id: yup.string().trim().nullable(),
  description: yup.string().trim().nullable(),
  details: yup.string().trim().nullable(),
});
