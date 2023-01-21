import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import apiRequest from '../../lib/config/axios';

const TotalPerAccount = dynamic(() => import('./charts/total-per-account'), { ssr: false });

export const AccountTotal: React.FC<{ accountId?: string }> = ({ accountId }) => {
  const { themeMode } = useAppContext();
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState([]);

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

  return <TotalPerAccount data={data} themeMode={themeMode} value={period} setValue={setPeriod} />;
};
