import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { loading, error, dispatch } = useAppContext();
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
        router.push('/');
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
        <title>Login - Expense Tracker</title>
        <meta name="description" content="Login to expense tracker" />
      </Head>

      <ContainerWrapper maxWidth="sm">
        <Box textAlign="center">
          <Typography gutterBottom variant="h4">
            Login
          </Typography>
          <Typography color="error">{typeof error === 'string' && error}</Typography>
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

          <Typography
            color="inherit"
            variant="body2"
            component={Link}
            href="/forgot-password"
            sx={{ textDecoration: 'none' }}
          >
            Forgot password?
          </Typography>

          <LoadingButton type="submit" variant="contained" loading={loading.length > 0}>
            <span>Login</span>
          </LoadingButton>
        </Form>

        <Typography>
          Don&apos;t have an account?{' '}
          <Typography color="inherit" component={Link} href="/register">
            Register
          </Typography>
        </Typography>
      </ContainerWrapper>
    </div>
  );
};

export default Login;
