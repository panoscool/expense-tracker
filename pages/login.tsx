import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import NextLink from '../components/shared/next-link';
import useFetch from '../hooks/use-fetch';
import useForm from '../hooks/use-form';
import useProtectedRoute from '../hooks/use-protected-route';
import { loginSchema } from '../lib/utils/yup-schema';

const Wrapper = styled(Box)`
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

const Login: NextPage = () => {
  const { auth, loading, checkAuthState } = useProtectedRoute(false);
  const [, fetchData, , error] = useFetch('/', 'auth');
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(loginSchema, {
    email: '',
    password: '',
  });

  useEffect(() => {
    checkAuthState('/');
  }, [checkAuthState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event.target.name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (canSubmit()) {
      await fetchData('POST', '/user/login', values);
    }
  };

  if (loading || auth) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Expense Tracker App</title>
        <meta name="description" content="Keep track of expenses and share with others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Wrapper>
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
            Don&apos;t have account? <NextLink href="/register">Register</NextLink>
          </Typography>
        </Wrapper>
      </main>
    </div>
  );
};

export default Login;
