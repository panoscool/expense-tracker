import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useForm from '../../hooks/use-form';
import useIsDesktop from '../../hooks/use-is-desktop';
import { Account, AccountCreate } from '../../lib/interfaces/account';
import { createAccount, updateAccount } from '../../lib/services/account';
import { getDialogWidth } from '../../lib/utils/common-breakpoints';
import { accountSchema } from '../../lib/config/yup-schema';

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
};

const AccountForm: React.FC<Props> = ({ selectedAccount, closeModal }) => {
  const isDesktop = useIsDesktop();
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      selectedAccount
        ? await updateAccount(dispatch, values)
        : await createAccount(dispatch, values);

      selectedAccount == null && closeModal();
    }
  };

  return (
    <Box m={2} p={2} minWidth={getDialogWidth(isDesktop)}>
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

        <Typography variant="h6">Share account</Typography>
        <Typography variant="body2">Add the user email to share the account with</Typography>
        <Typography variant="caption">
          * The user should be registered with the same email
        </Typography>

        <TextField
          name="email"
          label="User email"
          value={values.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
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

export default AccountForm;
