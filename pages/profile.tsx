import { Box } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import ProfileForm from '../components/profile/profile-form';
import useAuth from '../hooks/use-auth';

const Home: NextPage = () => {
  const { authenticated, checkAuthStateAndRedirect } = useAuth(true);

  useEffect(() => {
    checkAuthStateAndRedirect('/login');
  }, [checkAuthStateAndRedirect]);

  if (!authenticated) return null;

  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Keep track of expenses share with others and split" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box maxWidth={600} margin="0 auto" component="main">
        <ProfileForm />
      </Box>
    </div>
  );
};

export default Home;
