import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthToken() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login"); // redireciona se não estiver logado
  }

  return useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);
}
