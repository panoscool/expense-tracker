import Typography from '@mui/material/Typography';
import Link from 'next/link';

export function Title() {
  return (
    <Typography variant="h6" color="inherit" noWrap component={Link} href="/">
      Expenses
    </Typography>
  );
}
