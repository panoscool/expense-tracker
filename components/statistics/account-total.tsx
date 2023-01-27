import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import apiRequest from '../../lib/config/axios';

const TotalPerAccount = dynamic(() => import('./charts/total-per-account'), { ssr: false });

export const AccountTotal: React.FC = () => {
  const { account, themeMode } = useAppContext();
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState([]);

  const accountId = useMemo(() => account?._id, [account?._id]);

  useEffect(() => {
    if (accountId) {
      apiRequest('GET', `/statistics?account_id=${accountId}&period=${period}`)
        .then((resData) => {
          setData(resData as any);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [accountId, period]);

  return (
    <TotalPerAccount
      data={data}
      currency={account?.currency}
      themeMode={themeMode}
      period={period}
      setPeriod={setPeriod}
    />
  );
};
