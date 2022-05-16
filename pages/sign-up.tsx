import { Button, TextField, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

const SignUp: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Expense Tracker App</title>
        <meta name="description" content="Keep track of expenses and share with others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h4">Register</Typography>

        <TextField type="text" name="name" label="Name" />
        <TextField type="email" name="email" label="Email" />
        <TextField type="password" name="password" label="Password" />
        <Button variant="contained">Register</Button>
      </main>
    </div>
  );
};

export default SignUp;
