import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useForm from '../../hooks/use-form';
import { accountSchema } from '../../lib/config/yup-schema';
import { Account, AccountCreate } from '../../lib/interfaces/account';
import { createAccount, getAccounts, updateAccount } from '../../lib/services/account';
import CurrencySelect from '../shared/currency-select';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  selectedAccount: Account | null;
  closeModal: () => void;
};

const initialValues: AccountCreate = {
  name: '',
  description: '',
  email: '',
  currency: '',
};

export const AccountForm: React.FC<Props> = ({ selectedAccount, closeModal }) => {
  const { dispatch } = useAppContext();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(accountSchema, initialValues);

  useEffect(() => {
    if (selectedAccount) {
      setValues(selectedAccount);
    }

    return () => {
      setValues(initialValues);
    };
  }, [selectedAccount, setValues]);

  const handleChange = (value: string, inputName: string) => {
    setValues({ ...values, [inputName]: value });
  };

  const handleBlur = (inputName: string) => {
    onBlur(inputName);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      selectedAccount ? await updateAccount(dispatch, values) : await createAccount(dispatch, values);

      await getAccounts(dispatch);

      setValues({ ...values, email: '' });
      selectedAccount == null && closeModal();
    }
  };

  return (
    <Box m={2} p={2}>
      <Box mb={2}>
        <Typography gutterBottom variant="h6">
          Add Account
        </Typography>
      </Box>

      <Form onSubmit={handleSubmit} noValidate>
        <TextField
          name="name"
          label="Name"
          value={values.name || ''}
          onChange={(event) => handleChange(event.target.value, 'name')}
          onBlur={() => handleBlur('name')}
          error={!!hasError('name')}
          helperText={hasError('name')?.message}
        />
        <CurrencySelect
          selectedValue={values.currency}
          onChange={(newValue) => handleChange(newValue?.value || '', 'currency')}
          onBlur={() => handleBlur('currency')}
          error={!!hasError('currency')}
          helperText={hasError('currency')?.message}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          value={values.description || ''}
          onChange={(event) => handleChange(event.target.value, 'description')}
          onBlur={() => handleBlur('description')}
          error={!!hasError('description')}
          helperText={hasError('description')?.message}
        />

        <Typography variant="h6">Share account</Typography>
        <Typography variant="body2">Add the user email to share the account with</Typography>
        <Typography variant="caption">* The user should be registered with the same email</Typography>

        <TextField
          name="email"
          label="User email"
          value={values.email || ''}
          onChange={(event) => handleChange(event.target.value, 'email')}
          onBlur={() => handleBlur('email')}
          error={!!hasError('email')}
          helperText={hasError('email')?.message}
        />

        <Box display="flex" alignSelf="center" gap={2} mt={3}>
          <Button variant="contained" color="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
};
