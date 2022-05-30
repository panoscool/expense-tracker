import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import useAppState from '../../hooks/use-app-state';
import useForm from '../../hooks/use-form';
import { IAccount } from '../../lib/models/account';
import apiRequest from '../../lib/utils/axios';
import { expenseSchema } from '../../lib/utils/yup-schema';
import CalculatorDialog from '../calculator/calculator-dialog';
import DateField from '../shared/date-field';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExpenseForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { accounts, categories } = useAppState();
  const [openCalculator, setOpenCalculator] = useState(false);
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(expenseSchema, {
    date: new Date(),
    account: '',
    category: '',
    amount: '',
    note: '',
    description: '',
  });

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      apiRequest('POST', '/expense', values);
      onClose();
    }
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6">Add Expense</Typography>
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

        <Box display="flex" alignSelf="flex-end" gap={2}>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary">
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
