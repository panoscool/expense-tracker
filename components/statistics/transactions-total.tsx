import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import apiRequest from '../../lib/config/axios';

const TransactionsPerPeriod = dynamic(() => import('./charts/transactions-per-period'), { ssr: false });

export const TransactionsTotal: React.FC = () => {
  const { account, themeMode } = useAppContext();
  const [period, setPeriod] = useState('month');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (account?._id) {
      apiRequest('GET', `/statistics?account_id=${account._id}&period=${period}`)
        .then((resData) => {
          setData(resData as any);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [account?._id, period]);

  return <TransactionsPerPeriod data={data} themeMode={themeMode} period={period} setPeriod={setPeriod} />;
};
