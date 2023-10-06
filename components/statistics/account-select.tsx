import { MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import { Account } from '../../lib/interfaces/account';
import { getAccounts } from '../../lib/services/account';
import { setParams } from '../../lib/utils/url-params';

export function StatisticsFilters() {
  const router = useRouter();
  const { accounts, dispatch } = useAppContext();
  const [accountId, setAccountId] = useState('');

  const queryAccountId = router.query.account_id as string;

  useEffect(() => {
    getAccounts(dispatch).then((res) => {
      if (res?.data && res?.data.length && !queryAccountId) {
        setParams({ account_id: res.data[0]._id });
      } else if (queryAccountId) {
        setAccountId(queryAccountId);
      }
    });
  }, [dispatch, queryAccountId]);

  const handleChange = (value: string, name: string) => {
    setParams({ [name]: value });
  };

  if (!Boolean(accounts?.length)) return null;

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
