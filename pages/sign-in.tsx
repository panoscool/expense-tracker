import { Button, TextField, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

const SignIn: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Expense Tracker App</title>
        <meta name="description" content="Keep track of expenses and share with others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h4">Login</Typography>

        <TextField type="text" name="email" label="Email" />
        <TextField type="password" name="password" label="Password" />
        <Button variant="contained">Login</Button>
      </main>
    </div>
  );
};

export default SignIn;
