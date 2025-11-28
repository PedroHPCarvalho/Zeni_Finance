import { useMemo } from "react";

export function useAuthToken() {
  const token = localStorage.getItem("token");

  // SEM hooks condicionais — sempre executa o hook
  return useMemo(() => {
    return {
      Authorization: token ? `Bearer ${token}` : "",
    };
  }, [token]);
}
