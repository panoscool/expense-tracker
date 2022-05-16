import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import DateField from '../date-field';
import CalculatorDialog from '../calculator/calculator-dialog';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import useForm from '../../hooks/use-form';
import { expenseSchema } from '../../utils/expense-schema';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ExpenseForm: React.FC<{ cancel: () => void }> = ({ cancel }) => {
  const [openCalculator, setOpenCalculator] = useState(false);
  const { values, setValues, onChange, onBlur, hasError, canSubmit } = useForm(expenseSchema, {
    date: new Date(),
    account: '',
    category: '',
    amount: '',
    note: '',
    description: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event, event.target.name);
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
      console.log('submit', values);
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
          <MenuItem value="account">Account</MenuItem>
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
          <MenuItem value="category">Category</MenuItem>
        </TextField>
        <TextField
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
          <Button color="primary" onClick={cancel}>
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
