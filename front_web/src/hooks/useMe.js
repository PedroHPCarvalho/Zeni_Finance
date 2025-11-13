import { useState, useEffect } from "react";
import { useAuthToken } from "../hooks/useUser"
import api, { API_ENDPOINTS } from "../../config/api";

export function useMe() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headers = useAuthToken();

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setError("Token não encontrado");
        return;
      }

      try {
        const response = await api.get(API_ENDPOINTS.me, { headers });
        console.log("✅ Resposta da API:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("❌ Erro ao buscar usuário:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}
