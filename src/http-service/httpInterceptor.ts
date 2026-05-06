export const httpInterceptor = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const headers = new Headers(init?.headers || {});

  // Set JSON header only if not FormData
  if (!headers.has('Content-Type') && !(init?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Example auth
  // const token = localStorage.getItem('token');
  // if (token) {
  //   headers.set('Authorization', `Bearer ${token}`);
  // }

  const modifiedInit: RequestInit = {
    ...init,
    headers,
  };

  try {
    const response = await fetch(input, modifiedInit);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response;
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      console.error('Network or fetch error:', error);
    }
    throw error;
  }
};