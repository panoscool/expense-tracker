import * as yup from 'yup';

export const expenseSchema = yup.object({
  date: yup.date().typeError('Value should be a date').required('Date is required'),
  account: yup.string().required('Account is required'),
  category: yup.string().required('Category is required'),
  amount: yup.number().typeError('Value is not a number').required('Amount is required'),
  note: yup.string().nullable(),
  description: yup.string().nullable(),
});
