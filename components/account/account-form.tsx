import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useAppState from '../../hooks/use-app-state';
import useFetch from '../../hooks/use-fetch';
import useForm from '../../hooks/use-form';
import useIsDesktop from '../../hooks/use-is-desktop';
import { accountSchema } from '../../lib/utils/yup-schema';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccountForm: React.FC = () => {
  const { setModal } = useAppState();
  const { isDesktop } = useIsDesktop();
  const [, createAccount, , error] = useFetch();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(accountSchema, {
    name: '',
    description: '',
    email: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      await createAccount('POST', '/account', values);
      handleCloseModal();
    }
  };

  return (
    <Box m={2} p={2} minWidth={isDesktop ? 320 : 'auto'}>
      <Box mb={2}>
        <Typography gutterBottom variant="h6">
          Add Account
        </Typography>
        <Typography color="error">{error}</Typography>
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

        <Typography variant="h6">Share account</Typography>
        <Typography variant="body2">Add the user email to share the account with</Typography>

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
