import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import Navbar from './navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="lg">
        <Box my={4}>{children}</Box>
      </Container>
    </Fragment>
  );
};

export default Layout;
