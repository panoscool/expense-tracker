import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import apiRequest from '../../lib/config/axios';

const TransactionsPerPeriod = dynamic(() => import('./charts/transactions-per-period'), { ssr: false });

export const TransactionsTotal: React.FC = () => {
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

  return <TransactionsPerPeriod data={data} themeMode={themeMode} period={period} setPeriod={setPeriod} />;
};
