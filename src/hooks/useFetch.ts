import { useState, useEffect } from 'react';
import { httpInterceptor } from '@/http-service/httpInterceptor';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await httpInterceptor(url, { signal: controller.signal });

        const result: T = await response.json();
        if (!controller.signal.aborted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err) {
        if (!controller.signal.aborted && err.name !== 'AbortError') {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
};
