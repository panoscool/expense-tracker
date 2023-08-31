import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import apiRequest from '../../lib/config/axios';

const TotalPerUser = dynamic(() => import('./charts/total-per-user'), { ssr: false });

export const UserTotal: React.FC<{ accountId?: string }> = ({ accountId }) => {
  const { themeMode } = useAppContext();
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState([]);

  useEffect(() => {
    apiRequest('GET', `/statistics/user?account_id=${accountId}&period=${period}`)
      .then((resData) => {
        setData(resData as any);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accountId, period]);

  return <TotalPerUser data={data} themeMode={themeMode} value={period} setValue={setPeriod} />;
};
