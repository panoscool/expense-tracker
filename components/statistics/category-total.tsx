import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import apiRequest from '../../lib/config/axios';

const TotalPerCategory = dynamic(() => import('./charts/total-per-category'), { ssr: false });

export const CategoryTotal: React.FC<{ accountId?: string }> = ({ accountId }) => {
  const { themeMode } = useAppContext();
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (accountId) {
      apiRequest('GET', `/statistics/category?account_id=${accountId}&period=${period}`)
        .then((resData) => {
          setData(resData as any);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [accountId, period]);

  return <TotalPerCategory data={data} themeMode={themeMode} value={period} setValue={setPeriod} />;
};
