import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NextLink from '../components/shared/next-link';
import useAppContext from '../hooks/use-app-context';
import useForm from '../hooks/use-form';
import useProtectedRoute from '../hooks/use-protected-route';
import apiRequest from '../lib/config/axios';
import { storeSetAuth } from '../lib/config/store';
import { setError, setLoading } from '../lib/services/helpers';
import { registerSchema } from '../lib/utils/yup-schema';

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

const Register: NextPage = () => {
  const router = useRouter();
  const { authenticated, checkAuthState } = useProtectedRoute(false);
  const { error, dispatch } = useAppContext();
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(registerSchema, {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      try {
        setLoading(dispatch, true);
        const data: any = await apiRequest('POST', '/user/register', values);
        storeSetAuth(data as string);
        router.push('/');
      } catch (error) {
        setError(dispatch, error as string);
      } finally {
        setLoading(dispatch, false);
      }
    }
  };

  if (authenticated) return null;

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
            You have account? <NextLink href="/login">Login</NextLink>
          </Typography>
        </Wrapper>
      </main>
    </div>
  );
};

export default Register;
