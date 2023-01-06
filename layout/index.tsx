import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { useRef } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ExpenseForm } from '../components/expense/expense-form';
import Loading from '../components/shared/loading';
import useAppContext from '../hooks/use-app-context';
import Notifier from './notifier';
import Navbar from './top-bar';
import { setModal } from '../lib/services/helpers';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notistackRef: any = useRef(null);
  const { authenticated, loading, modal, dispatch } = useAppContext();

  const handleAddExpense = () => {
    setModal(dispatch, { open: 'expense-form' });
  };

  const onClickDismiss = (key: SnackbarKey) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={2}
      preventDuplicate
      autoHideDuration={2500}
      disableWindowBlurListener
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={(key) => (
        <IconButton color="inherit" onClick={onClickDismiss(key)}>
          <CloseRoundedIcon />
        </IconButton>
      )}
    >
      {authenticated && <Navbar />}

      <Container maxWidth="lg">
        <Box my={4}>{children}</Box>

        {authenticated && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: 'absolute', bottom: 32, right: 32 }}
            onClick={handleAddExpense}
          >
            <AddRoundedIcon />
          </Fab>
        )}
      </Container>

      {authenticated && (
        <Dialog fullWidth maxWidth="xs" open={modal?.open === 'expense-form'}>
          <ExpenseForm />
        </Dialog>
      )}

      <Notifier />
      <Loading loading={loading} />
    </SnackbarProvider>
  );
};

export default Layout;
