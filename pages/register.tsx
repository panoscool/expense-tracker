import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import useAppContext from '../hooks/use-app-context';
import useAuth from '../hooks/use-auth';
import useForm from '../hooks/use-form';
import apiRequest from '../lib/config/axios';
import { storeSetAccessToken } from '../lib/config/store';
import { registerSchema } from '../lib/config/yup-schema';
import { setError, setLoading } from '../lib/services/helpers';

const Wrapper = styled('main')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 64px;
`;

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '40%',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const Register: NextPage = () => {
  const { error, dispatch } = useAppContext();
  const { authenticated, checkAuthStateAndRedirect } = useAuth(false);
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(registerSchema, {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    checkAuthStateAndRedirect('/');
  }, [checkAuthStateAndRedirect]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      try {
        setLoading(dispatch, 'register');
        const res = await apiRequest('POST', '/user/register', values);
        storeSetAccessToken(res.data);
      } catch (error) {
        setError(dispatch, error as string);
      } finally {
        setLoading(dispatch, 'register');
      }
    }
  };

  if (authenticated) return null;

  return (
    <div>
      <Head>
        <title>Expense Tracker - Register</title>
        <meta name="description" content="Register to expense tracker" />
      </Head>

      <Wrapper>
        <Box textAlign="center">
          <Typography gutterBottom variant="h4">
            Register
          </Typography>
          <Typography color="error">{error}</Typography>
        </Box>

        <Form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="name"
            label="Name"
            value={values.name || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!hasError('name')}
            helperText={hasError('name')?.message}
          />
          <TextField
            type="email"
            name="email"
            label="Email"
            value={values.email || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!hasError('email')}
            helperText={hasError('email')?.message}
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
            name="confirmPassword"
            label="Confirm Password"
            value={values.confirmPassword || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!hasError('confirmPassword')}
            helperText={hasError('confirmPassword')?.message}
          />

          <Button type="submit" variant="contained">
            Register
          </Button>
        </Form>

        <Typography>
          Have an account? <Link href="/login">Login</Link>
        </Typography>
      </Wrapper>
    </div>
  );
};

export default Register;
