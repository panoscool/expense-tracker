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

        if (redirect) {
          router.push(redirect);
        }
      } catch (err) {
        console.error(err);
        setError((err as Error)?.message);
      } finally {
        setLoading(false);
      }
    },
    [persist, redirect, router],
  );

  return { data, error, loading, setError, fetchData };
};

export default useFetch;
