import { useState, useEffect } from 'react';
import { httpInterceptor } from '@/auth-service/httpInterceptor';

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

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result: T = await response.json(); 
        if (!controller.signal.aborted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err: any) {
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