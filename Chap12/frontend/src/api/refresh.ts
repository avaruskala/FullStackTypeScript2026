import { authApi } from "./endpoints";
import { setAccessToken } from "./token";

let refreshPromise: Promise<boolean> | null = null;

export async function attemptTokenRefresh() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = performRefresh();
  const result = await refreshPromise;
  refreshPromise = null;
  return result;
}

async function performRefresh() {
  try {
    const { accessToken } = await authApi.refresh();
    setAccessToken(accessToken);
    return true;
  } catch {
    setAccessToken(null);
    return false;
  }
}
