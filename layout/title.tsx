import Typography from '@mui/material/Typography';

export function Title() {
  return (
    <Typography variant="h6" noWrap sx={{ '&:before': { content: '"💰"' } }}>
      Expenses
    </Typography>
  );
}
