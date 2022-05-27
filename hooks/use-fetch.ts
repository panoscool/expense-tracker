import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import apiRequest from '../lib/utils/axios';
import store from 'store';

const useFetch = (redirect?: string, persist?: string) => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (method: string, url: string, params?: any) => {
      try {
        setLoading(true);
        const response = await apiRequest(method, url, params);
        setData(response);

        if (persist && response) {
          store.set(persist, response);
        }

        if (redirect && response) {
          router.push(redirect);
        }
      } catch (err) {
        console.error(err);
        setError(err as string);
      } finally {
        setLoading(false);
      }
    },
    [persist, redirect, router],
  );

  return [data, fetchData, loading, error, setError];
};

export default useFetch;
