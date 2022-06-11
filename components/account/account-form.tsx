import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import useFetch from '../../hooks/use-fetch';
import useForm from '../../hooks/use-form';
import useIsDesktop from '../../hooks/use-is-desktop';
import { Account, AccountCreate } from '../../lib/interfaces/account';
import { getDialogWidth } from '../../lib/utils/common-breakpoints';
import { accountSchema } from '../../lib/utils/yup-schema';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  selectedAccount: Account | null;
  closeModal: () => void;
  getAccounts: () => void;
};

const initialValues: AccountCreate = {
  name: '',
  description: '',
  email: '',
};

const AccountForm: React.FC<Props> = ({ selectedAccount, closeModal, getAccounts }) => {
  const isDesktop = useIsDesktop();
  const [, createAccount, , error] = useFetch();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(accountSchema, initialValues);

  useEffect(() => {
    if (selectedAccount) {
      setValues(selectedAccount);
    } else {
      setValues(initialValues);
    }
  }, [selectedAccount, setValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleCloseModal = () => {
    setValues(initialValues);
    closeModal();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      selectedAccount
        ? await createAccount('PUT', `/account/${values?._id}`, values)
        : await createAccount('POST', '/account', values);

      getAccounts();

      selectedAccount == null && handleCloseModal();
    }
  };

  return (
    <Box m={2} p={2} minWidth={getDialogWidth(isDesktop)}>
      <Box mb={2}>
        <Typography gutterBottom variant="h6">
          Add Account
        </Typography>
        <Typography color="error">{error}</Typography>
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
          <Button variant="contained" color="secondary" onClick={handleCloseModal}>
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
