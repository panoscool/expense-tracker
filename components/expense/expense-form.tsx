/* eslint-disable react-hooks/exhaustive-deps */
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
import useIsDesktop from '../../hooks/use-is-desktop';
import { Account } from '../../lib/interfaces/account';
import { ExpenseCreate } from '../../lib/interfaces/expense';
import { getAccount } from '../../lib/services/account';
import {
  createExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from '../../lib/services/expense';
import { setModal } from '../../lib/services/helpers';
import { getDialogWidth } from '../../lib/utils/common-breakpoints';
import { expenseSchema } from '../../lib/config/yup-schema';
import CalculatorDialog from '../calculator/calculator-dialog';
import CategoryIcon from '../shared/category-icon';
import DateField from '../shared/date-field';
import IconSelectField from '../shared/icon-select-field';
import useHasAccess from '../../hooks/use-has-access';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const initialValues: ExpenseCreate = {
  date: new Date(),
  account_id: '',
  category: '',
  amount: 0,
  user_id: '',
  description: '',
  details: '',
};

const ExpenseForm: React.FC = () => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const { hasAccess } = useHasAccess();
  const [openCalculator, setOpenCalculator] = useState(false);
  const { user, accounts, account, expense, categories, modal, dispatch } = useAppContext();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(expenseSchema, initialValues);

  useEffect(() => {
    if (values.account_id || router.query.account_id) {
      getAccount(dispatch, values.account_id || (router.query.account_id as string));
    }
  }, [values.account_id, router.query.account_id, dispatch]);

  useEffect(() => {
    if (modal?.params) {
      getExpense(dispatch, modal.params);
    }

    if (expense?._id) {
      setValues({ ...expense, user_id: expense.user._id, account_id: account?._id });
    }

    if (!modal?.params) {
      setValues({ ...initialValues, user_id: user?._id, account_id: account?._id });
    }
  }, [dispatch, expense?._id, modal?.params, setValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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
    setModal(dispatch, null);
  };

  const handleDeleteExpense = async () => {
    if (window.confirm(`Are you sure you want to delete the ${expense?.category} expense?`)) {
      if (modal?.params) {
        await deleteExpense(dispatch, modal.params);
        handleCloseModal();
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      modal?.params ? await updateExpense(dispatch, values) : await createExpense(dispatch, values);

      handleCloseModal();
    }
  };

  const disableSave = useMemo(
    () => (modal?.params && !hasAccess(values?.user_id, values?.created_by)) || false,
    [modal?.params, hasAccess, values?.user, values?.created_by],
  );

  return (
    <Box m={2} p={2} minWidth={getDialogWidth(isDesktop)}>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography gutterBottom variant="h6">
          Add Expense
        </Typography>

        {modal?.params && (
          <Tooltip title="Delete expense">
            <span>
              <IconButton
                color="error"
                onClick={handleDeleteExpense}
                disabled={!hasAccess(values?.user, values?.created_by)}
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
          value={values.date}
          onChange={setValues}
          onBlur={onBlur}
          error={!!hasError('date')}
          helperText={hasError('date')?.message}
        />
        <TextField
          select
          name="account_id"
          label="Account"
          value={values.account_id || ''}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
        <TextField
          select
          name="user_id"
          label="User"
          disabled={!account}
          value={values.user_id || ''}
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          {account?.users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="description"
          label="Description"
          value={values.description || ''}
          onChange={handleChange}
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
          onChange={handleChange}
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

      <CalculatorDialog
        open={openCalculator}
        onClose={toggleOpenCalculator}
        onConfirm={handleConfirmCalculation}
      />
    </Box>
  );
};

export default ExpenseForm;
