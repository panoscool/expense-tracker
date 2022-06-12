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
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useAppState, { Actions } from '../../hooks/use-app-state';
import useForm from '../../hooks/use-form';
import useIsDesktop from '../../hooks/use-is-desktop';
import { Account } from '../../lib/interfaces/account';
import { ExpenseCreate } from '../../lib/interfaces/expense';
import { getCategories } from '../../lib/services/category';
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from '../../lib/services/expense';
import { getDialogWidth } from '../../lib/utils/common-breakpoints';
import { expenseSchema } from '../../lib/utils/yup-schema';
import CalculatorDialog from '../calculator/calculator-dialog';
import CategoryIcon from '../shared/category-icon';
import DateField from '../shared/date-field';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SelectField = styled(TextField)(({ theme }) => ({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '& .MuiListItemText-root': {
    marginTop: 0,
    marginBottom: 0,
  },

  '& .MuiIconButton-root': {
    paddingTop: 0,
    paddingBottom: 0,

    '& .MuiSvgIcon-root': {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: '1rem',
    },
  },
}));

const initialValues: ExpenseCreate = {
  date: new Date(),
  account: '',
  category: '',
  amount: 0,
  note: '',
  description: '',
};

const ExpenseForm: React.FC = () => {
  const isDesktop = useIsDesktop();
  const { accounts, modal, appDispatch } = useAppContext();
  const { expense, categories, error, dispatch } = useAppState();
  const [openCalculator, setOpenCalculator] = useState(false);
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(expenseSchema, initialValues);

  useEffect(() => {
    getCategories(dispatch);

    if (modal?.params) {
      getExpense(dispatch, modal.params);
    } else {
      setValues(initialValues);
    }
  }, [dispatch, modal?.params, setValues]);

  useEffect(() => {
    if (expense) {
      setValues(expense);
    }
  }, [expense, setValues]);

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
    setValues(initialValues);
    appDispatch({ type: Actions.SET_MODAL, payload: null });
  };

  const handleDeleteExpense = async () => {
    if (modal?.params) {
      await deleteExpense(dispatch, modal.params);
      getExpenses(appDispatch);
      handleCloseModal();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      modal?.params ? await updateExpense(dispatch, values) : await createExpense(dispatch, values);

      getExpenses(appDispatch);
      handleCloseModal();
    }
  };

  return (
    <Box m={2} p={2} minWidth={getDialogWidth(isDesktop)}>
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6">
            Add Expense
          </Typography>

          {modal?.params && (
            <Tooltip title="Delete expense">
              <IconButton color="error" onClick={handleDeleteExpense}>
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Typography color="error">{error}</Typography>
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
          name="account"
          label="Account"
          value={values.account || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('account')}
          helperText={hasError('account')?.message}
        >
          <MenuItem value="">None</MenuItem>
          {accounts?.map((account: Account) => (
            <MenuItem key={account._id} value={account._id}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
        <SelectField
          select
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
        </SelectField>
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
          name="note"
          label="Note"
          value={values.note || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('note')}
          helperText={hasError('note')?.message}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          value={values.description || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('description')}
          helperText={hasError('description')?.message}
        />

        <Box display="flex" alignSelf="center" gap={2} mt={3}>
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
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
