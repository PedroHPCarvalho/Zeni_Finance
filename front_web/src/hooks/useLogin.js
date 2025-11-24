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
      const { token } = response.data;

      localStorage.setItem("token", token);

      return { ok: true, result: { token } };
    } catch (err) {
      let msg = "Ocorreu um erro ao tentar fazer login.";

      if (err.response?.status === 401) {
        msg = "Email ou senha incorretos.";
      } else if (err.response?.data?.error) {
        msg = err.response.data.error;
      } else if (err.request) {
        msg = "Não foi possível conectar ao servidor.";
      }

      setError(msg);
      return { ok: false, result: { error: msg } };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, setError };
}
