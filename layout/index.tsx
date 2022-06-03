import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import useAppState from '../hooks/use-app-state';
import Navbar from './top-bar';
import AccountForm from '../components/account/account-form';
import CategoryForm from '../components/category/category-form';
import Loading from '../components/shared/loading';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, modal, loading } = useAppState();

  const modalOpen = modal === 'account-form' || modal === 'category-form';

  return (
    <Fragment>
      {auth && <Navbar />}

      <Container maxWidth="lg">
        <Box my={4}>{children}</Box>
      </Container>

      {auth && (
        <Dialog open={modalOpen}>
          {modal === 'account-form' && <AccountForm />}
          {modal === 'category-form' && <CategoryForm />}
        </Dialog>
      )}

      <Loading loading={loading} />
    </Fragment>
  );
};

export default Layout;
