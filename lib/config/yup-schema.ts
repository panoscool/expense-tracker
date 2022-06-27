import * as yup from 'yup';

/** @description this function makes the password optional based on conditions */
yup.addMethod(yup.string, 'validatePassword', function (errorMessage) {
  return this.test(`validate-password`, errorMessage, function (value) {
    const { path, createError } = this;

    if (value?.trim() && value.trim().length < 6) {
      return createError({ path, message: 'Password must be at least 6 characters' });
    }
    if (value?.trim() && value.trim().length > 24) {
      return createError({ path, message: 'Password should not exceed 24 characters' });
    }

    const validLength =
      value?.trim() &&
      value.trim().length === 0 &&
      value.trim().length >= 6 &&
      value.trim().length <= 24;

    const isValid = value == null || value == undefined || validLength || true;

    return isValid || createError({ path, message: errorMessage });
  });
});

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

export const accountSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
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
  amount: yup.number().typeError('Value is not a number').required('Amount is required'),
  user_id: yup.string().trim().nullable(),
  description: yup.string().trim().nullable(),
  details: yup.string().trim().nullable(),
});

export const userUpdateSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  password: yup
    .string()
    .trim()
    .nullable()
    // @ts-ignore
    .validatePassword('Password is required'),
  newPassword: yup
    .string()
    .trim()
    .when('password', {
      is: (password: string | null) => password && password.length > 0,
      then: yup
        .string()
        .trim()
        .min(6, 'New password must be at least 6 characters')
        .max(24, 'New password should not exceed 24 characters')
        .required('New password is required'),
    }),
  confirmPassword: yup.string().when('newPassword', {
    is: (newPassword: string | null) => newPassword && newPassword.length > 0,
    then: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('newPassword')], 'New and confirm password must match'),
  }),
});
