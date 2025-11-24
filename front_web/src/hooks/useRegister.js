import { useState } from "react";
import api, { API_ENDPOINTS } from "../../config/api";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(API_ENDPOINTS.register, data);

      return { ok: true, result: response.data };

    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao cadastrar usuário.";
      setError(msg);

      return { ok: false, result: { error: msg } };

    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
