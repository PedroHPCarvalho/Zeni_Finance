// useAuthToken.js
import { useMemo } from "react";

export function useAuthToken() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);
}
