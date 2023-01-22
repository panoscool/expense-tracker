import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { Period } from '../../../lib/interfaces/common';

type Props = {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export function ChartHeader({ title, value, setValue }: Props) {
  const periods = [
    { value: Period.day, label: 'Day' },
    { value: Period.week, label: 'Week' },
    { value: Period.month, label: 'Month' },
    { value: Period.quarter, label: 'Quarter' },
  ];

  return (
    <Box px={2} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
      <Typography variant="h6">{title}</Typography>
      <TextField
        select
        name="period"
        label="Period"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        sx={{ my: 2, minWidth: { xs: '100%', sm: '100%', md: 240 } }}
      >
        {periods.map((period) => (
          <MenuItem key={period.value} value={period.value}>
            {period.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
