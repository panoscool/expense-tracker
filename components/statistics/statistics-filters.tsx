import { useEffect, useState } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import useAppContext from '../../hooks/use-app-context';
import { endOf6Months, formatDate, startOf6Months } from '../../lib/utils/date';
import { useRouter } from 'next/router';
import { setParams } from '../../lib/utils/url-params';
import { getAccounts } from '../../lib/services/account';
import DateField from '../shared/date-field';
import { Account } from '../../lib/interfaces/account';

type Filters = {
  account_id?: string;
  date_from?: string;
  date_to?: string;
};

export function StatisticsFilters() {
  const router = useRouter();
  const { dispatch, accounts } = useAppContext();
  const [filters, setFilters] = useState({
    account_id: accounts?.[0]._id,
    date_from: startOf6Months,
    date_to: endOf6Months,
  });

  const { date_from, date_to, account_id }: Filters = router.query;

  useEffect(() => {
    getAccounts(dispatch).then((res) => {
      if (res?.data && res?.data.length) {
        setParams({
          account_id: res.data[0]._id,
          date_from: formatDate(startOf6Months),
          date_to: formatDate(endOf6Months),
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (date_from) {
      setFilters((prevFilters) => ({ ...prevFilters, date_from: new Date(date_from) }));
    }
    if (date_to) {
      setFilters((prevFilters) => ({ ...prevFilters, date_to: new Date(date_to) }));
    }
    if (account_id) {
      setFilters((prevFilters) => ({ ...prevFilters, account_id }));
    }

    return () => {
      setFilters({ date_from: startOf6Months, date_to: endOf6Months, account_id });
    };
  }, [account_id, date_from, date_to]);

  const handleChange = (value: Date | string, name: string) => {
    if (name.includes('date')) {
      console.log(value, name);
      setParams({ [name]: formatDate(value as Date) });
    } else {
      setParams({ [name]: value });
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mb={2}>
      <TextField
        select
        name="account_id"
        label="Account"
        value={filters.account_id || ''}
        onChange={(event) => handleChange(event.target.value, 'account_id')}
      >
        {accounts?.map((account: Account) => (
          <MenuItem key={account._id} value={account._id}>
            {account.name}
          </MenuItem>
        ))}
      </TextField>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <DateField
          disableFuture
          views={['year', 'month']}
          format="MMMM yyyy"
          label="Date"
          value={filters.date_from}
          onChange={(value) => handleChange(value, 'date_from')}
        />
        <DateField
          disableFuture
          views={['year', 'month']}
          format="MMMM yyyy"
          label="Date"
          value={filters.date_to}
          onChange={(value) => handleChange(value, 'date_to')}
        />
      </Box>
    </Box>
  );
}
