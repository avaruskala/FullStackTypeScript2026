import { ApiError, AuthError } from "./errors";
import { attemptTokenRefresh } from "./refresh";
import { getAccessToken } from "./token";

const BASE_RUL = import.meta.env.VITE_API_URL;

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers: customHeaders, ...restOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    (headers as Record<string, string>)["Authorization"] =
      `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_RUL}${endpoint}`, {
    ...restOptions,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    const refreshed = await attemptTokenRefresh();
    if (refreshed) {
      return apiClient<T>(endpoint, options);
    }
    throw new AuthError("Session expired");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(response.status, error.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}
