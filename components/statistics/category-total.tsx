import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import useAppContext from '../../hooks/use-app-context';
import apiRequest from '../../lib/config/axios';
import { CategoryStatistic } from '../../lib/interfaces/statistics';

const TotalPerCategory = dynamic(() => import('./charts/total-per-category'), { ssr: false });

export const CategoryTotal: React.FC = () => {
  const { account, themeMode } = useAppContext();
  const [month, setMonth] = useState(new Date());
  const [data, setData] = useState<CategoryStatistic[]>([]);

  const accountId = useMemo(() => account?._id, [account?._id]);

  useEffect(() => {
    if (accountId) {
      apiRequest('GET', `/statistics/category?account_id=${accountId}`)
        .then((resData) => {
          setData(resData as any);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [accountId]);

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
