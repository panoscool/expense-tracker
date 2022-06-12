import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import { SnackbarProvider } from 'notistack';
import ExpenseForm from '../components/expense/expense-form';
import Loading from '../components/shared/loading';
import useAppContext from '../hooks/use-app-context';
import Navbar from './top-bar';
import Notifier from './notifier';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, loading, modal } = useAppContext();

  return (
    <SnackbarProvider
      maxSnack={2}
      preventDuplicate
      autoHideDuration={2500}
      disableWindowBlurListener
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      {auth && <Navbar />}

      <Container maxWidth="lg">
        <Box my={4}>{children}</Box>
      </Container>

      {auth && (
        <Dialog open={modal?.open === 'expense-form'}>
          <ExpenseForm />
        </Dialog>
      )}

      <Notifier />
      <Loading loading={loading} />
    </SnackbarProvider>
  );
};

export default Layout;
