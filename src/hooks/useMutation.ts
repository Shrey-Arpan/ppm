import { useState } from 'react';
import { httpInterceptor } from '@/http-service/httpInterceptor';

export const useMutation = <T, B = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (url: string, method: 'POST' | 'PUT' | 'DELETE', body?: B) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await httpInterceptor(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
      });

      let result: T | null = null;

      try {
        result = await response.json();
      } catch {}

      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
};
