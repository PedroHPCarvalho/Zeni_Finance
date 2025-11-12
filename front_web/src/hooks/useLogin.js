import { useState } from "react";
import api, { API_ENDPOINTS } from "../../config/api";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(API_ENDPOINTS.login, credentials);

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        return { ok: true, result: { token, user } };
      }

      return { ok: false, result: { error: "Token não retornado" } };
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao fazer login";
      setError(msg);
      return { ok: false, result: { error: msg } };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
