import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import useAppState from '../hooks/use-app-state';
import Navbar from './navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = useAppState();

  return (
    <Fragment>
      {auth && <Navbar />}
      <Container maxWidth="lg">
        <Box my={4}>{children}</Box>
      </Container>
    </Fragment>
  );
};

export default Layout;
