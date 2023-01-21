import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import apiRequest from '../../lib/config/axios';

const TotalPerUser = dynamic(() => import('./charts/total-per-user'), { ssr: false });

export function UserTotal() {
  const { themeMode } = useAppContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    apiRequest('POST', '/statistics', {
      accountId: '71f79cae-7db5-4971-8957-ec7f8018c7d1',
      dateFrom: '2022-01-01',
      dateTo: '2022-12-31',
      groupBy: 'user',
    })
      .then((resData) => {
        setData(resData as any);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <TotalPerUser data={data} themeMode={themeMode} />;
}
