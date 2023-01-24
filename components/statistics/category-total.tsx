import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import apiRequest from '../../lib/config/axios';
import { CategoryStatistic } from '../../lib/interfaces/statistics';

const TotalPerCategory = dynamic(() => import('./charts/total-per-category'), { ssr: false });

export const CategoryTotal: React.FC = () => {
  const { account, themeMode } = useAppContext();
  const [month, setMonth] = useState(new Date());
  const [data, setData] = useState<CategoryStatistic[]>([]);

  useEffect(() => {
    if (account?._id) {
      apiRequest('GET', `/statistics/category?account_id=${account._id}`)
        .then((resData) => {
          setData(resData as any);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [account?._id]);

  return (
    <TotalPerCategory
      data={data}
      currency={account?.currency}
      themeMode={themeMode}
      month={month}
      setMonth={setMonth}
    />
  );
};
