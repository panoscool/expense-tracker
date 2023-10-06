import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useAppContext } from '../context/app-context';

export function NoAccountId() {
  const { loading, accounts } = useAppContext();

  const hasAccounts = accounts && accounts.length > 0;

  if (loading.length > 0) return null;

  return (
    <Box textAlign="center" pt={4}>
      <Typography gutterBottom variant="h6">
        You have not {hasAccounts ? 'selected' : 'created'} any account.
      </Typography>

      {hasAccounts ? (
        <Typography>Please select an account from the menu to view expenses.</Typography>
      ) : (
        <div>
          <Typography pb={4}>Please create an account to start recording expenses.</Typography>
          <Button color="inherit" variant="outlined" component={Link} href="/settings">
            Create account
          </Button>
        </div>
      )}
    </Box>
  );
}
