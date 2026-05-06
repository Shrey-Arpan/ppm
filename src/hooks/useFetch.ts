import { useState, useEffect } from 'react';
import { httpInterceptor } from '@/http-service/httpInterceptor';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => setRefetchIndex((prev) => prev + 1);

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
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
          if (err instanceof Error && err.name === 'AbortError') return;

          setError(errorMessage);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, refetchIndex]);

  return { data, isLoading, error, refetch };
};
