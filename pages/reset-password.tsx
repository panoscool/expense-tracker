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
import { resetPasswordSchema } from '../lib/config/yup-schema';
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

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { loading, error, dispatch } = useAppContext();
  const { authenticated, checkAuthStateAndRedirect } = useAuth(false);
  const { values, setValues, onBlur, hasError, canSubmit } = useForm(resetPasswordSchema, {
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
        setLoading(dispatch, 'login');
        const res = await apiRequest('POST', '/user/reset-password', values);
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
        <title>Reset Password - Expense Tracker</title>
        <meta name="description" content="Login to expense tracker" />
      </Head>

      <ContainerWrapper maxWidth="sm">
        <Box textAlign="center">
          <Typography gutterBottom variant="h4">
            Reset Password
          </Typography>
          <Typography color="error">{typeof error === 'string' && error}</Typography>
        </Box>

        <Form onSubmit={handleSubmit}>
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

          <LoadingButton type="submit" variant="contained" loading={loading.length > 0}>
            <span>Submit</span>
          </LoadingButton>
        </Form>
      </ContainerWrapper>
    </div>
  );
};

export default ResetPassword;
