import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import useForm from '../../hooks/use-form';
import { userUpdateSchema } from '../../lib/config/yup-schema';
import { setError } from '../../lib/services/helpers';
import { updateUser } from '../../lib/services/user';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileForm: React.FC = () => {
  const { user, error, dispatch } = useAppContext();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(userUpdateSchema, {
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setValues({ name: user?.name, email: user?.email });
  }, [user, setValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setIsSaveDisabled(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleClearError = () => {
    setError(dispatch, null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      await updateUser(dispatch, values);
    }
  };

  return (
    <div>
      <Box mb={4}>
        <Typography variant="body2">Update your name and password</Typography>
        <Typography variant="caption">* Leave password blank to keep current password</Typography>
      </Box>

      {error && (
        <Alert severity="error" onClose={handleClearError} sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          name="name"
          label="Name"
          value={values.name || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('name')}
          helperText={hasError('name')?.message}
        />
        <TextField disabled name="email" label="Email" value={values.email || ''} />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={values.password || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('password')}
          helperText={hasError('password')?.message}
        />
        <TextField
          type="password"
          name="newPassword"
          label="New password"
          value={values.newPassword || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('newPassword')}
          helperText={hasError('newPassword')?.message}
        />
        <TextField
          type="password"
          name="confirmPassword"
          label="Confirm new password"
          value={values.confirmPassword || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!hasError('confirmPassword')}
          helperText={hasError('confirmPassword')?.message}
        />

        <Box textAlign="center" mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSaveDisabled} sx={{ minWidth: 200 }}>
            Save
          </Button>
        </Box>
      </Form>
    </div>
  );
};
