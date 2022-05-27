import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import useForm from '../../hooks/use-form';
import apiRequest from '../../lib/utils/axios';
import { categorySchema } from '../../lib/utils/yup-schema';
import CalculatorDialog from '../calculator/calculator-dialog';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExpenseForm: React.FC<{ cancel: () => void }> = ({ cancel }) => {
  const [openCalculator, setOpenCalculator] = useState(false);
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(categorySchema, {
    name: '',
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
      apiRequest('POST', '/category', values);
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h6">Add Category</Typography>
      </Box>

      <Form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={values.name || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('name')}
          helperText={hasError('name')?.message}
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
