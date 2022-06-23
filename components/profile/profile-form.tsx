import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import useAppContext from '../../hooks/use-app-context';
import useForm from '../../hooks/use-form';
import { userUpdateSchema } from '../../lib/config/yup-schema';
import { updateUser } from '../../lib/services/user';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileForm: React.FC = () => {
  const { auth, dispatch } = useAppContext();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(userUpdateSchema, {
    name: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setValues({ name: auth?.name });
  }, [auth, setValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      await updateUser(dispatch, values);
    }
  };

  return (
    <Box m={2} p={2}>
      <Box mb={3}>
        <Typography gutterBottom variant="h6">
          Profile
        </Typography>
        <Typography variant="body2">Update your name and password</Typography>
        <Typography variant="caption">* Leave password blank to keep current password</Typography>
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
          <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 200 }}>
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default ProfileForm;
