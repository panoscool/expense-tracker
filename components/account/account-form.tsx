import { Box, Button, TextField, Typography, Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useForm from '../../hooks/use-form';
import { accountSchema } from '../../lib/config/yup-schema';
import { Account, AccountCreate } from '../../lib/interfaces/account';
import { UseCaseType } from '../../lib/interfaces/common';
import { createAccount, getAccounts, updateAccount } from '../../lib/services/account';
import CurrencySelect from '../shared/currency-select';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  open: boolean;
  useCase: UseCaseType | null;
  account: Account | null;
  onClose: () => void;
};

const initialValues: AccountCreate = {
  name: '',
  description: '',
  email: '',
  currency: '',
};

export const AccountForm: React.FC<Props> = ({ open, account, useCase, onClose }) => {
  const { dispatch } = useAppContext();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(accountSchema, initialValues);

  const isEditCase = useMemo(() => useCase === UseCaseType.account_edit, [useCase]);

  useEffect(() => {
    if (isEditCase) {
      setValues(account);
    }

    return () => {
      setValues(initialValues);
    };
  }, [account, isEditCase, setValues]);

  const handleChange = (value: string, inputName: string) => {
    setValues({ ...values, [inputName]: value });
  };

  const handleBlur = (inputName: string) => {
    onBlur(inputName);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      isEditCase ? await updateAccount(dispatch, values) : await createAccount(dispatch, values);

      await getAccounts(dispatch);

      setValues({ ...values, email: '' });
      !isEditCase && onClose();
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
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
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
