import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import Loading from '../components/shared/loading';
import useAppState from '../hooks/use-app-state';
import Navbar from './top-bar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, loading } = useAppState();

  return (
    <Fragment>
      {auth && <Navbar />}

      <Container maxWidth="lg">
        <Box my={4}>{children}</Box>
      </Container>

      <Loading loading={loading} />
    </Fragment>
  );
};

export default Layout;
