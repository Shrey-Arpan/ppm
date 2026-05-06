export const httpInterceptor = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const headers = new Headers(init?.headers || {});

  // Set JSON header only if not FormData
  if (!headers.has('Content-Type') && !(init?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Note: Backend is expected to use HttpOnly cookies for session management.
  // Browser will automatically attach cookies to requests via Vite proxy.

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