import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useForm from '../../hooks/use-form';
import { Account } from '../../lib/interfaces/account';
import { ExpenseCreate } from '../../lib/interfaces/expense';
import { createExpense, deleteExpense, getExpense, getExpenses, updateExpense } from '../../lib/services/expense';
import { expenseSchema } from '../../lib/config/yup-schema';
import { CalculatorDialog } from '../calculator/calculator-dialog';
import CategoryIcon from '../shared/category-icon';
import DateField from '../shared/date-field';
import IconSelectField from '../shared/icon-select-field';
import useHasAccess from '../../hooks/use-has-access';
import { getPayments } from '../../lib/services/payment';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const initialValues: ExpenseCreate = {
  date: new Date(),
  account_id: '',
  category: 'other',
  amount: 0,
  user_id: '',
  description: '',
  details: '',
};

export const ExpenseForm: React.FC = () => {
  const router = useRouter();
  const { hasAccess } = useHasAccess();
  const [openCalculator, setOpenCalculator] = useState(false);
  const { account, accounts, categories, dispatch } = useAppContext();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(expenseSchema, initialValues);

  const accountId: string | undefined = useMemo(() => router.query?.account_id as string, [router.query?.account_id]);
  const expenseId: string | undefined = useMemo(() => router.query?.expense_id as string, [router.query?.expense_id]);
  const selectedAccount: Account | undefined = useMemo(
    () => accounts?.find((acc) => acc._id === values.account_id),
    [accounts, values.account_id],
  );

  useEffect(() => {
    if (expenseId) {
      getExpense(dispatch, expenseId).then(({ data }: any) => {
        if (data) {
          setValues({ ...data, user_id: data.user._id, account_id: data.account });
        }
      });
    } else {
      setValues({ ...initialValues, user_id: account?.user });
    }

    return () => {
      setValues(initialValues);
    };
  }, [account?.user, dispatch, expenseId, setValues]);

  const handleChange = (value: string | Date | null, inputName: string) => {
    setValues({ ...values, [inputName]: value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleConfirmCalculation = (currentOperand: string | null) => {
    setValues({ ...values, amount: currentOperand });
  };

  const toggleOpenCalculator = () => {
    setOpenCalculator(!openCalculator);
  };

  const handleCloseModal = () => {
    delete router.query.expense_id;

    router.push({
      pathname: router.pathname,
      query: { ...router.query },
    });
  };

  const fetchUpdatedData = async () => {
    if (accountId === selectedAccount?._id) {
      await getExpenses(dispatch);
      await getPayments(dispatch);
    }
    handleCloseModal();
  };

  const handleDeleteExpense = async () => {
    if (window.confirm(`Are you sure you want to delete the ${values.category} expense?`)) {
      if (expenseId) {
        await deleteExpense(dispatch, expenseId);
        await fetchUpdatedData();
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      expenseId ? await updateExpense(dispatch, values) : await createExpense(dispatch, values);
      await fetchUpdatedData();
    }
  };

  const disableSave = useMemo(
    () => (expenseId && !hasAccess(values?.user_id, values?.created_by)) || false,
    [expenseId, hasAccess, values?.user_id, values?.created_by],
  );

  return (
    <Box m={2} p={2}>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom variant="h6">
          Add Expense
        </Typography>

        {expenseId && (
          <Tooltip title="Delete expense">
            <span>
              <IconButton
                color="error"
                onClick={handleDeleteExpense}
                disabled={!hasAccess(values?.user?._id, values?.created_by)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>

      <Form onSubmit={handleSubmit} noValidate>
        <DateField
          label="Date"
          disableFuture
          value={values.date}
          onChange={(value) => handleChange(value, 'date')}
          onBlur={onBlur}
          error={!!hasError('date')}
          helperText={hasError('date')?.message}
        />
        <TextField
          select
          name="account_id"
          label="Account"
          value={values.account_id || ''}
          onChange={(event) => handleChange(event.target.value, 'account_id')}
          onBlur={handleBlur}
          error={!!hasError('account_id')}
          helperText={hasError('account_id')?.message}
        >
          <MenuItem value="">None</MenuItem>
          {accounts?.map((account: Account) => (
            <MenuItem key={account._id} value={account._id}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
        <IconSelectField
          name="category"
          label="Category"
          value={values.category || ''}
          onChange={(event) => handleChange(event.target.value, 'category')}
          onBlur={handleBlur}
          error={!!hasError('category')}
          helperText={hasError('category')?.message}
        >
          <MenuItem value="">None</MenuItem>
          {categories?.labels.map((label: string) => (
            <MenuItem key={label} value={label}>
              <ListItemIcon>
                <CategoryIcon icon={label} />
              </ListItemIcon>
              <ListItemText primary={label} sx={{ textTransform: 'capitalize' }} />
            </MenuItem>
          ))}
        </IconSelectField>
        <TextField
          type="number"
          name="amount"
          label="Amount"
          value={values.amount || ''}
          onChange={(event) => handleChange(event.target.value, 'amount')}
          onBlur={handleBlur}
          error={!!hasError('amount')}
          helperText={hasError('amount')?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={toggleOpenCalculator}>
                  <CalculateOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {selectedAccount && selectedAccount.users.length > 1 && (
          <TextField
            select
            name="user_id"
            label="User"
            disabled={!selectedAccount}
            value={values.user_id || ''}
            onChange={(event) => handleChange(event.target.value, 'user_id')}
          >
            <MenuItem value="">None</MenuItem>
            {selectedAccount?.users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          name="description"
          label="Description"
          value={values.description || ''}
          onChange={(event) => handleChange(event.target.value, 'description')}
          onBlur={handleBlur}
          error={!!hasError('description')}
          helperText={hasError('description')?.message}
        />
        <TextField
          name="details"
          label="Details"
          multiline
          rows={3}
          value={values.details || ''}
          onChange={(event) => handleChange(event.target.value, 'details')}
          onBlur={handleBlur}
          error={!!hasError('details')}
          helperText={hasError('details')?.message}
        />

        <Box display="flex" alignSelf="center" gap={2} mt={3}>
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={disableSave}>
            Submit
          </Button>
        </Box>
      </Form>

      <CalculatorDialog open={openCalculator} onClose={toggleOpenCalculator} onConfirm={handleConfirmCalculation} />
    </Box>
  );
};
