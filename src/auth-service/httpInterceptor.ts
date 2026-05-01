export const httpInterceptor = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const headers = new Headers(init?.headers);

  // Add default headers here
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Example: Retrieve token from storage and add Authorization header
  // const token = localStorage.getItem('token'); // Or get from your auth state/MSAL
  // if (token) {
  //   headers.set("Authorization", `Bearer ${token}`);
  // }

  // You can also add other custom headers needed for your requests
  // headers.set("X-Custom-Header", "value");

  const modifiedInit: RequestInit = {
    ...init,
    headers,
  };

  try {
    const response = await fetch(input, modifiedInit);

    // Global response interception
    if (!response.ok) {
      // Example: Handle 401 Unauthorized globally
      // if (response.status === 401) {
      //   // Redirect to login or refresh token
      // }
      
      console.error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error: any) {
    // Only log if it's not an AbortError (which is expected during unmounts/Strict Mode)
    if (error.name !== "AbortError") {
      console.error("Network or fetch error:", error);
    }
    throw error;
  }
};
