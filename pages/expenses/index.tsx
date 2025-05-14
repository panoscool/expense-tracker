import { Container } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ExpensesList } from '../../components/expense';
import { NoAccountId } from '../../components/no-account-id';
import PageTitle from '../../components/page-title';
import useAuth from '../../hooks/use-auth';
import Layout from '../../layout';

const Home: NextPage = () => {
  const router = useRouter();
  const { authenticated, checkAuthStateAndRedirect } = useAuth();

  useEffect(() => {
    checkAuthStateAndRedirect();
  }, [checkAuthStateAndRedirect]);

  if (!authenticated) return null;

  return (
    <div>
      <PageTitle page="home" />

      <Layout>
        <Container maxWidth="xl">{router.query?.account_id ? <ExpensesList /> : <NoAccountId />}</Container>
      </Layout>
    </div>
  );
};

export default Home;
