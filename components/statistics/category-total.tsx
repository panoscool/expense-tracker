import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import apiRequest from '../../lib/config/axios';
import { Filters } from '../../lib/interfaces/statistics';

const TotalPerCategory = dynamic(() => import('./charts/total-per-category'), { ssr: false });

export const CategoryTotal: React.FC<{ filters: Filters }> = ({ filters }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiRequest('POST', '/statistics', {
      accountId: filters.account_id,
      dateFrom: filters.date_from,
      dateTo: filters.date_to,
      groupBy: 'category',
    })
      .then((resData) => {
        setData(resData as any);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filters.account_id, filters.date_from, filters.date_to]);

  return <TotalPerCategory data={data} />;
};
