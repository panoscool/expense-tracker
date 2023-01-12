import { Box, Button, Container, TextField, Typography } from '@mui/material';
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
import { loginSchema } from '../lib/config/yup-schema';
import { setError, setLoading } from '../lib/services/helpers';

const ContainerWrapper = styled(Container)`
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
  width: '100%',
}));

const Login: NextPage = () => {
  const { error, dispatch } = useAppContext();
  const { authenticated, checkAuthStateAndRedirect } = useAuth(false);
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(loginSchema, {
    email: '',
    password: '',
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
        setLoading(dispatch, 'login');
        const res = await apiRequest('POST', '/user/login', values);
        storeSetAccessToken(res.data);
      } catch (error) {
        setError(dispatch, error as string);
      } finally {
        setLoading(dispatch, 'login');
      }
    }
  };

  if (authenticated) return null;

  return (
    <div>
      <Head>
        <title>Expense Tracker - Login</title>
        <meta name="description" content="Login to expense tracker" />
      </Head>

      <ContainerWrapper maxWidth="sm">
        <Box textAlign="center">
          <Typography gutterBottom variant="h4">
            Login
          </Typography>
          <Typography color="error">{error}</Typography>
        </Box>

        <Form onSubmit={handleSubmit}>
          <TextField
            type="text"
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

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Form>

        <Typography>
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </Typography>
      </ContainerWrapper>
    </div>
  );
};

export default Login;
