import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import useAppState from '../../hooks/use-app-state';
import useFetch from '../../hooks/use-fetch';
import useForm from '../../hooks/use-form';
import useIsDesktop from '../../hooks/use-is-desktop';
import { IAccount } from '../../lib/models/account';
import { IExpense } from '../../lib/models/expense';
import { expenseSchema } from '../../lib/utils/yup-schema';
import CalculatorDialog from '../calculator/calculator-dialog';
import DateField from '../shared/date-field';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  getExpenses: () => void;
  selectedExpense: IExpense | null;
};

const ExpenseForm: React.FC<Props> = ({ getExpenses, selectedExpense }) => {
  const { isDesktop } = useIsDesktop();
  const { accounts, categories, setModal } = useAppState();
  const [openCalculator, setOpenCalculator] = useState(false);
  const [, createExpense, , error] = useFetch();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(expenseSchema, {
    date: new Date(),
    account: '',
    category: '',
    amount: '',
    note: '',
    description: '',
  });

  useEffect(() => {
    if (selectedExpense) {
      setValues(selectedExpense);
    }
  }, [selectedExpense, setValues]);

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
    setModal(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      selectedExpense
        ? await createExpense('PUT', `/expense/${values?._id}`, values)
        : await createExpense('POST', '/expense', values);

      getExpenses();
      setModal(null);
    }
  };

  return (
    <Box m={2} p={2} minWidth={isDesktop ? 320 : 'auto'}>
      <Box mb={2}>
        <Typography gutterBottom variant="h6">
          Add Expense
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>

      <Form onSubmit={handleSubmit}>
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
          {accounts?.map((account: IAccount) => (
            <MenuItem key={account._id} value={account._id}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
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
          {categories?.labels?.map((label: string) => (
            <MenuItem key={label} value={label} sx={{ textTransform: 'capitalize' }}>
              {label}
            </MenuItem>
          ))}
        </TextField>
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
