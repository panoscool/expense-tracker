import { MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import { Account } from '../../lib/interfaces/account';
import { getAccounts } from '../../lib/services/account';
import { setParams } from '../../lib/utils/url-params';

export function StatisticsFilters() {
  const router = useRouter();
  const { dispatch, accounts } = useAppContext();
  const [accountId, setAccountId] = useState('');

  const { account_id }: { account_id?: string } = router.query;

  useEffect(() => {
    getAccounts(dispatch).then((res) => {
      if (res?.data && res?.data.length) {
        setParams({ account_id: res.data[0]._id });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (account_id) {
      setAccountId(account_id);
    }
  }, [account_id]);

  const handleChange = (value: string, name: string) => {
    setParams({ [name]: value });
  };

  return (
    <TextField
      select
      fullWidth
      name="accountId"
      label="Account"
      value={accountId}
      onChange={(event) => handleChange(event.target.value, 'account_id')}
      sx={{ my: 2 }}
    >
      {accounts?.map((account: Account) => (
        <MenuItem key={account._id} value={account._id}>
          {account.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
