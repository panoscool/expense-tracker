import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import ExpenseForm from '../components/expense/expense-form';
import Loading from '../components/shared/loading';
import useAppContext from '../hooks/use-app-context';
import Navbar from './top-bar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, loading, modal } = useAppContext();

  return (
    <Fragment>
      {auth && <Navbar />}

      <Container maxWidth="lg">
        <Box my={4}>{children}</Box>
      </Container>

      {auth && (
        <Dialog open={modal?.open === 'expense-form'}>
          <ExpenseForm />
        </Dialog>
      )}

      <Loading loading={loading} />
    </Fragment>
  );
};

export default Layout;
