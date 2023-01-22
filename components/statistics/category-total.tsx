import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import apiRequest from '../../lib/config/axios';
import { CategoryStatistic } from '../../lib/interfaces/statistics';

const TotalPerCategory = dynamic(() => import('./charts/total-per-category'), { ssr: false });

export const CategoryTotal: React.FC<{ accountId?: string }> = ({ accountId }) => {
  const { themeMode } = useAppContext();
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState<CategoryStatistic[]>([]);

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

  return <TotalPerCategory data={data} themeMode={themeMode} />;
};
