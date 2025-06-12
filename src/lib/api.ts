const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${apiBaseUrl}/users/token/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return null;
    const data = await response.json();

    if (data.status === "success" && data.data?.token?.accessToken) {
      const newAccessToken = data.data.token.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }
  } catch {
    // ignore error
  }
  return null;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// The main fetch wrapper
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let token = localStorage.getItem("accessToken");

  let response = await fetch(`${apiBaseUrl}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    token = await refreshAccessToken();
    if (token) {
      // Retry the request with the new token
      response = await fetch(`${apiBaseUrl}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // If refresh fails, log the user out
      window.location.href = "/login";
    }
  }

  return response;
};

// A simple public fetcher for routes that don't need authentication (login, register)
const fetchPublic = (url: string, options: RequestInit = {}) => {
  return fetch(`${apiBaseUrl}${url}`, {
    ...options,
    headers: { ...options.headers, "Content-Type": "application/json" },
  });
};

// Our final client with both public and private methods
export const apiClient = {
  // Authenticated methods
  get: (url: string, options?: RequestInit) => fetchWithAuth(url, { ...options, method: "GET" }),
  post: <T>(url: string, body: T, options?: RequestInit) =>
    fetchWithAuth(url, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: <T>(url: string, body: T, options?: RequestInit) =>
    fetchWithAuth(url, { ...options, method: "PUT", body: JSON.stringify(body) }),

  // Public methods
  publicPost: <T>(url: string, body: T, options?: RequestInit) =>
    fetchPublic(url, { ...options, method: "POST", body: JSON.stringify(body) }),
};
