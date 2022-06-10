/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import apiRequest from '../lib/config/axios';
import store from 'store';
import useAppState from './use-app-state';

const useFetch = (redirect?: string, persist?: string) => {
  const router = useRouter();
  const { loading, setLoading } = useAppState();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (method: string, url: string, data?: any) => {
      try {
        setLoading(true);
        const response = await apiRequest(url, { method, data });
        setData(response);

        if (persist && response) {
          store.set(persist, response);
        }

        if (redirect && response) {
          router.push(redirect);
        }

        return response;
      } catch (err) {
        console.error(err);
        setError(err as string);

        return err;
      } finally {
        setLoading(false);
      }
    },
    [persist, redirect, router],
  );

  return [data, fetchData, loading, error, setError];
};

export default useFetch;
