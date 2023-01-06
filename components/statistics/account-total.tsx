import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import apiRequest from '../../lib/config/axios';
import { Filters } from '../../lib/interfaces/statistics';

const TotalPerAccount = dynamic(() => import('./charts/total-per-account'), { ssr: false });

export const AccountTotal: React.FC<{ filters: Filters }> = ({ filters }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiRequest('POST', '/statistics', {
      accountId: filters.account_id,
      dateFrom: filters.date_from,
      dateTo: filters.date_to,
      groupBy: 'date',
    })
      .then((resData) => {
        setData(resData as any);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filters]);

  return <TotalPerAccount data={data} />;
};
